import React, { useEffect, useState } from "react";
import { IThreadCommentWithParent } from "../../../../services/search/search.types";
import { getUser } from "../../../../services/user";
import { IUserProcessed } from "../../../../services/user/user.type";
import Comment from "../../../../components/comment"
import "./Search-thread-comments.css";
import Post from "../../../post";
import { processThread } from "../../../../services/feed/feed";
import { IProcessedThreadFeed } from "../../../../services/feed/feed.type";

function SearchThreadComment ({ className, threadCommentData, queryString }: 
  { queryString: string, 
      threadCommentData: IThreadCommentWithParent, 
      className?: string}) {
    const [matchedThreadQueryUser, 
      setMatchedThreadQueryUser] = useState<IUserProcessed>()
    
    const [parentThread, setParentThread] = useState<IProcessedThreadFeed>()
    useEffect(()=> {
      (async ()=> {
        await getUser({ userId: threadCommentData.postedByUserId,
          onSuccess: (data) => { setMatchedThreadQueryUser(data)}, 
          onError: (message)=> { console.log(message)}})

        const parentThreadComment = await processThread(threadCommentData.parentThread!)
        console.log("26, parentThreadComment", parentThreadComment)
        setParentThread(parentThreadComment)
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
        {parentThread && 
          <Post {...{threadData: parentThread?.threadData!, 
            queryString: queryString}}
          />
        }
      </div>
    </div>
  )
}

export default SearchThreadComment;
