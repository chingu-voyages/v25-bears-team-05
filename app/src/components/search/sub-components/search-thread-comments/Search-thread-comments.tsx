import React, { useEffect, useState } from "react";
import { IThreadCommentDetails } from "../../../../services/search/search.types";
import { getUser } from "../../../../services/user";
import { IUserProcessed } from "../../../../services/user/user.type";
import Avatar from "../../../avatar";
import ProfileCard from "../../../profileCard";
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
  return (
    <div className={`${className || ""} SearchThreadComment__main`}>
      <ProfileCard type="comment" 
        userId={matchedThreadQueryUser?.id} 
        threadData={threadCommentData} 
      />
      
    </div>
  )
}

export default SearchThreadComment;
