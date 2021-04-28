import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteThreadCommentAsync,
  selectCommentById,
} from "../../pages/home/homeSlice";
import { selectCurrentUserId } from "../../pages/profile/profileSlice";
import ContentClipper from "../contentClipper";
import OptionsMenu from "../optionsMenu";
import ProfileCard from "../profileCard";
import "./Comment.css";
const md = require("markdown-it")();

function Comment({
  commentId,
  className,
}: {
  commentId: string;
  className?: string;
}) {
  const commentData = useSelector(selectCommentById(commentId));
  const currentUserId = useSelector(selectCurrentUserId);
  const isMe = commentData?.postedByUserId === currentUserId;
  const dispatch = useDispatch();

  return commentData ? (
    <div className={`${className || ""} Comment`}>
      <div className="Comment__header">
        <ProfileCard
          type="comment"
          userId={commentData.postedByUserId}
          threadData={commentData}
        />
        {isMe && (
          <OptionsMenu
            buttons={{
              "delete comment": {
                action: () =>
                  dispatch(
                    deleteThreadCommentAsync({
                      threadId: commentData.parentThreadId,
                      commentId,
                    })
                  ),
                confirm: true,
              },
            }}
          ></OptionsMenu>
        )}
      </div>
      <ContentClipper clippedHeight="80px">
        <div
          className="Post__content"
          dangerouslySetInnerHTML={{ __html: md.render(commentData.content) }}
        ></div>
      </ContentClipper>
    </div>
  ) : null;
}

export default Comment;
