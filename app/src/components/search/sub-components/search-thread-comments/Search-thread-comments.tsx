import React from "react";
import Avatar from "../../../avatar";
import "./Search-thread-comments.css";

function SearchThreadComment ({ className, queryString }: 
  { queryString: string, className?: string}) {
  return (
    <div className={`${className || ""} SearchThreadComment__main`}>
      <Avatar />
    </div>
  )
}

export default SearchThreadComment;
