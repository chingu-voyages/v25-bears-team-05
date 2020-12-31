import React from "react";
import { IThreadComment } from "../../services/thread/thread.type";
import ContentClipper from "../contentClipper";
import ProfileCard from "../profileCard";
import "./Comment.css";

function Comment({commentData}: {commentData: IThreadComment}) {
    return (
        <div className="Comment">
            <ProfileCard type="comment" userId={commentData.postedByUserId} />
            <ContentClipper clippedHeight="20px">
                {commentData.content}
            </ContentClipper>
        </div>
    )
}

export default Comment;