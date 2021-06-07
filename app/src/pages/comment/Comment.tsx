import React from "react";
import { Link, useRouteMatch } from "react-router-dom";
import Page from "../../components/page";
import CommentComponent from "./components/comment";
import backIcon from "../../images/backicon.svg";
import "./Comment.css";

function Comment() {
  const match: any = useRouteMatch("/thread/:threadId/comment/:commentId");
  const threadId = match.params.threadId.toLowerCase();
  const commentId = match.params.commentId.toLowerCase();
  return (
    <Page className="Comment-page">
      <div className="Comment-page__content">
        <Link className="Comment-page__back-link" to={`/thread/${threadId}`}>
          <img src={backIcon} alt="Goto thread" />
          Goto thread
        </Link>
        <CommentComponent commentId={commentId} />
      </div>
    </Page>
  );
}

export default Comment;
