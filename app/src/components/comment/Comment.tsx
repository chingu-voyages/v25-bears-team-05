import React from "react";
import { IThreadComment } from "../../services/thread/thread.type";
import ContentClipper from "../contentClipper";
import ProfileCard from "../profileCard";
import "./Comment.css";
const md = require("markdown-it")();

function Comment({commentData}: {commentData: IThreadComment}) {
    return (
        <div className="Comment">
            <ProfileCard type="comment" userId={commentData.postedByUserId} threadData={commentData} />
            <ContentClipper clippedHeight="80px">
            <div
        className="Post__content"
        dangerouslySetInnerHTML={{ __html: md.render(commentData.content) }}
      ></div>
            </ContentClipper>
        </div>
    )
}

export default Comment;