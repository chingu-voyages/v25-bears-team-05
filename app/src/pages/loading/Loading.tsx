import React from "react";
import Spinner from "../../components/spinner";
import "./Loading.css";

function Loading({ message }: { message: string }) {
  return (
    <div className="Loading-page">
      <Spinner className="Loading-page__spinner" message={message} />
    </div>
  );
}

export default Loading;
