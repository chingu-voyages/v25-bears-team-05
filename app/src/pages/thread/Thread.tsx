import React from "react";
import { useRouteMatch } from "react-router-dom";
import Post from "./components/post";
import Page from "../../components/page";
import "./Thread.css";

function Thread() {
  const match: any = useRouteMatch("/thread/:threadId");
  const threadId = match.params.threadId.toLowerCase();
  return (
    <Page className="Thread-page">
      <div className="Thread-page__content">
        <Post threadId={threadId} />
      </div>
    </Page>
  );
}

export default Thread;
