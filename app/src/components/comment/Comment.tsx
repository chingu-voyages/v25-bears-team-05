import React, { useEffect, useState } from "react";
import { deleteComment } from "../../services/thread";
import { IThreadComment } from "../../services/thread/thread.type";
import { getCurrentUserInfo } from "../../services/user/currentUserInfo";
import ContentClipper from "../contentClipper";
import OptionsMenu from "../optionsMenu";
import ProfileCard from "../profileCard";
import "./Comment.css";
const md = require("markdown-it")();

function Comment({commentData, handleDeleteComment}: {commentData: IThreadComment, handleDeleteComment: () => void }) {
    const [isMe, setIsMe] = useState(false);
    useEffect(() => {
        (async () => {
            const currentUserInfo = await getCurrentUserInfo();
            setIsMe(currentUserInfo.id === commentData.postedByUserId);
        })();
    }, []);

    return ( commentData ?
        <div className="Comment">
            <div className="Comment__header">
                <ProfileCard type="comment" userId={commentData.postedByUserId} threadData={commentData} />
                {isMe && <OptionsMenu buttons={
                    {
                        "delete comment": {
                            action: handleDeleteComment,
                            confirm: true
                        }
                    }
                }></OptionsMenu>}
            </div>
            <ContentClipper clippedHeight="80px">
            <div
        className="Post__content"
        dangerouslySetInnerHTML={{ __html: md.render(commentData.content) }}
      ></div>
            </ContentClipper>
        </div>
        : 
        null
    )
}

export default Comment;