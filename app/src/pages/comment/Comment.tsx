import React from "react";
import { useRouteMatch } from "react-router-dom";
import Page from "../../components/page";
import CommentComponent from "./components/comment";
import "./Comment.css";

function Comment() {
  const match: any = useRouteMatch("/comment/:commentId");
  const commentId = match.params.commentId.toLowerCase();
  return (
    <Page className="Comment-page">
      <div className="Comment-page__content">
        <CommentComponent commentId={commentId} />
      </div>
    </Page>
  );
}

export default Comment;
