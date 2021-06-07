import React, { useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { selectCurrentUserId } from "../../pages/profile/profileSlice";
import {
  selectCommentById,
  readThreadCommentsAsync,
  deleteThreadCommentAsync,
} from "../../pages/thread/threadSlice";
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
  const commentData = useSelector(selectCommentById(commentId), shallowEqual);
  const currentUserId = useSelector(selectCurrentUserId, shallowEqual);
  const isMe = commentData?.postedByUserId === currentUserId;
  const dispatch = useDispatch();

  useEffect(() => {
    if (!commentData) {
      dispatch(readThreadCommentsAsync([commentId]));
    }
  }, [dispatch, commentData, commentId]);

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
                action: () => dispatch(deleteThreadCommentAsync({ commentId })),
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
