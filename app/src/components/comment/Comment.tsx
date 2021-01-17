import React from "react";
import { connect } from "react-redux";
import { getUsers } from "../../redux/selectors";
import { IStoreState } from "../../redux/store.type";
import { IThreadComment } from "../../services/thread/thread.type";
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
  users: IStoreState["users"];
  commentData: IThreadComment;
  handleDeleteComment: () => void;
}) {
  const currentUserId = users.me.id;
  const isCurrentUser = currentUserId === commentData.postedByUserId;

  return commentData ? (
    <div className="Comment">
      <div className="Comment__header">
        <ProfileCard
          type="comment"
          userData={users[commentData.postedByUserId]}
          commentData={commentData}
        />
        {isCurrentUser && (
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
  const users = getUsers(state);
  return { users };
};

export default connect(mapStateToProps)(Comment);
