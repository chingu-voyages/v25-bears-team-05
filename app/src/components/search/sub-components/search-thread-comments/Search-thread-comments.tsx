import React, { useEffect, useState } from "react";
import { IThreadCommentWithParent } from "../../../../services/search/search.types";
import { getUser } from "../../../../services/user";
import { IUserProcessed } from "../../../../services/user/user.type";
import Comment from "../../../../components/comment"
import "./Search-thread-comments.css";

function SearchThreadComment ({ className, threadCommentData, queryString }: 
  { queryString: string, threadCommentData: IThreadCommentWithParent, className?: string}) {
    const [matchedThreadQueryUser, setMatchedThreadQueryUser] = useState<IUserProcessed>()
    useEffect(()=> {
      (async ()=> {
        console.log("ThreadCommentData 12", threadCommentData)
        await getUser({ userId: threadCommentData.postedByUserId,
        onSuccess: (data) => { setMatchedThreadQueryUser(data)}, 
        onError: (message)=> { console.log(message)}})
      })()
    }, [])
  
  const onDeleteComment = () => {
    // To be deleted
  }
  return (
    <div className={`${className || ""} SearchThreadComment__main`}>
      <div className="SearchThreadComment__Comment-section">
        <Comment commentData={{...threadCommentData, 
          _id: threadCommentData.id!,
          updatedAt: threadCommentData.updatedAt.toString(), 
          createdAt: threadCommentData.createdAt.toString() }} 
          handleDeleteComment={onDeleteComment} 
        />
      </div>
    </div>
  )
}

export default SearchThreadComment;
