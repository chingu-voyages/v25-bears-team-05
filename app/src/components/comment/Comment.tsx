import React, { useEffect } from "react";
import { connect } from "react-redux";
import { IThreadComment } from "../../services/thread/thread.type";
import { getCurrentUserInfo } from "../../services/user/currentUserInfo";
import { IUsersStore } from "../../services/user/user.type";
import ContentClipper from "../contentClipper";
import OptionsMenu from "../optionsMenu";
import ProfileCard from "../profileCard";
import "./Comment.css";
const md = require("markdown-it")();

function Comment({
  users,
  commentData,
  handleDeleteComment,
}: {
  users: IUsersStore;
  commentData: IThreadComment;
  handleDeleteComment: () => void;
}) {
  const currentUserId = users.me.id;
  const isMe = currentUserId === commentData.postedByUserId;

  useEffect(() => {
    if (!currentUserId) {
      getCurrentUserInfo();
    }
  }, [currentUserId]);

  return commentData ? (
    <div className="Comment">
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
                action: handleDeleteComment,
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

const mapStateToProps = (state: any) => {
  const { users } = state;
  return { users };
};

export default connect(mapStateToProps)(Comment);
