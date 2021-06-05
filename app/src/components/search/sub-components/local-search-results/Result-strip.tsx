import React, { useEffect, useState } from "react";
import "./local-search-results.css";
import MiniProfileIcon from "../../../../images/miniprofile.svg";
import {
  IConnectionsSearchMatch,
  IThreadsCommentSearchMatch,
  IThreadsSearchMatch,
} from "../../../../services/search/local";
import { shallowEqual, useSelector } from "react-redux";
import { selectUserById } from "../../../../pages/profile/profileSlice";
import ProfileResultStrip from "./Profile-result-strip";
import ThreadResultStrip from "./Thread-result-strip";
import ThreadCommentResultStrip from "./Thread-comment-result-strip";
import DefaultResultStrip from "./Default-result-strip";

export enum StripType {
  Profile = "profile",
  Thread = "thread",
  ThreadComment = "thread_comment",
}

function ResultStrip({
  classNameInfo,
  stripType,
  data,
  queryString,
}: {
  classNameInfo?: string;
  stripType: StripType;
  data:
    | IConnectionsSearchMatch
    | IThreadsSearchMatch
    | IThreadsCommentSearchMatch;
  queryString: string;
}) {
  const [threadPosterAvatar, setThreadPosterAvatar] = useState<string>(
    MiniProfileIcon
  );

  let constId;
  if (stripType === StripType.Thread) {
    constId = (data as IThreadsSearchMatch).postedByUserId;
  } else if (stripType === StripType.ThreadComment) {
    constId = (data as IThreadsCommentSearchMatch).postedByUserId;
  }

  const user = useSelector(
    selectUserById(constId || MiniProfileIcon),
    shallowEqual
  );

  useEffect(() => {
    if (user && user.avatar[0]) {
      setThreadPosterAvatar(user.avatar[0].url || MiniProfileIcon);
    }
  }, [user]);

  switch (stripType) {
    case StripType.Profile:
      return <ProfileResultStrip data={data as IConnectionsSearchMatch} />;
    case StripType.Thread:
      return (
        <ThreadResultStrip
          data={data as IThreadsSearchMatch}
          {...{ queryString, threadPosterAvatar }}
        />
      );
    case StripType.ThreadComment:
      return (
        <ThreadCommentResultStrip
          data={data as IThreadsCommentSearchMatch}
          {...{ queryString, threadPosterAvatar }}
        />
      );
    default:
      return <DefaultResultStrip />;
  }
}

export default ResultStrip;
