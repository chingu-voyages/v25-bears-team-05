import React from "react";
import "./Loading.css";

function Loading({ message }: { message: string }) {
  return (
    <div>
      <h1>Loading...</h1>
      {message && <p>{message}</p>}
    </div>
  );
}

export default Loading;
