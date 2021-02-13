import React, { useEffect, useState } from "react";
import { IThreadCommentDetails } from "../../../../services/search/search.types";
import { getUser } from "../../../../services/user";
import { IUserProcessed } from "../../../../services/user/user.type";
import Comment from "../../../../components/comment"
import "./Search-thread-comments.css";

function SearchThreadComment ({ className, threadCommentData, queryString }: 
  { queryString: string, threadCommentData: IThreadCommentDetails, className?: string}) {
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

  }
  return (
    <div className={`${className || ""} SearchThreadComment__main`}>
      <Comment commentData={{...threadCommentData, 
        _id: threadCommentData.id!,
        updatedAt: threadCommentData.updatedAt.toString(), 
        createdAt: threadCommentData.createdAt.toString() }} 
        handleDeleteComment={onDeleteComment} 
      />
    </div>
  )
}

export default SearchThreadComment;
