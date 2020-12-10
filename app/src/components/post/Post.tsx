import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  IThreadReferral,
  IThreadDataProcessed,
} from "../../services/thread/thread.type";
import Button from "../button";
import FollowButton from "../followButton";
import OptionsMenu from "../optionsMenu";
import ProfileCard from "../profileCard";
import { IThreadCardInfo } from "../profileCard/profileCard.type";
import "./Post.css";
import starIcon from "../../images/staricon.svg";
import heartIcon from "../../images/hearticon.svg";
import processingIcon from "../../images/processingicon.svg";
import smallStarIcon from "../../images/smallstaricon.svg";
import smallHeartIcon from "../../images/smallhearticon.svg";
import smallProcessingIcon from "../../images/smallprocessingicon.svg";
import reactButton from "../../images/reactbutton.svg";
import commentButton from "../../images/commentbutton.svg";
import folkButton from "../../images/folkbutton.svg";
import { getCurrentUserId } from "../../services/user/currentUserId";
import { addThreadReaction, removeThreadReaction } from "../../services/thread/thread";
const md = require("markdown-it")();

function Post({
  threadData,
  profileData,
  referral,
  className = "",
}: {
  threadData: IThreadDataProcessed;
  profileData: IThreadCardInfo;
  referral?: IThreadReferral;
  className?: string;
}) {
  const [isAConnection, setIsAConnection] = useState(profileData.isAConnection);
  const [threadReactionsCounts, setThreadReactionsCounts] = useState(
    threadData.reactionsCount
  );
  const [currentUserReactions, setCurrentUserReactions] = useState(
    threadData.currentUserReactions
  );
  const [isMe, setIsMe] = useState(true);
  useEffect(() => {
    getCurrentUserId().then((id) => setIsMe(id === profileData.id));
  }, [profileData.id]);
  const [nOfComments, setNOfComments] = useState(
    threadData.comments && Object.keys(threadData.comments).length
  );
  const handleThreadReaction = (title: string) => {
    let countValue = 0;
    const onSuccess = () => {
      setCurrentUserReactions(reactions => ({...reactions, [title]: countValue > 0}))
      setThreadReactionsCounts(counts => {
        const newCount = (counts[title] || 0) + countValue;
        return {...counts, [title]: newCount > 0 ? newCount : 0};
      })
    };
    const onError = (msg: string) => {console.error(msg)};
    if (currentUserReactions[title]) {
      countValue = -1;
      removeThreadReaction({threadId: threadData.id, title, onSuccess, onError });
    }
    else {
      countValue = 1;
      addThreadReaction({threadId: threadData.id, title, onSuccess, onError });
    }
  }

  const ReactionOptions = {
    Star: {
      action: () => {handleThreadReaction("star")},
      children: <img src={starIcon} alt="Star" />,
    },
    Heart: {
      action: () => {handleThreadReaction("heart")},
      children: <img src={heartIcon} alt="Heart" />,
    },
    Process: {
      action: () => {handleThreadReaction("process")},
      children: <img src={processingIcon} alt="Process" />,
    },
  };
  const reactionIcons = {
    star: smallStarIcon,
    heart: smallHeartIcon,
    processing: smallProcessingIcon,
  };

  return (
    <article className={`Post ${className}`}>
      <header className="Post__relational-info">
        {referral?.userId && referral.userName && <Link to={`/${referral.userId}/profile`}>{referral.userName}</Link>}
        {referral?.reason}
      </header>
      <Link className="Post__profile-card" to={`/${profileData.id}/profile`}>
        <ProfileCard threadInfo={profileData} />
      </Link>
      {!isMe && !isAConnection && (
        <FollowButton
          className="Post__follow"
          connectionName={profileData.firstName + " " + profileData.lastName}
          connectionId={profileData.id}
          onFollow={() => {
            setIsAConnection(true);
          }}
        />
      )}
      <main
        className="Post__content"
        dangerouslySetInnerHTML={{ __html: md.render(threadData.content.html) }}
      ></main>
      <ul className="Post__reactions">
        {Object.entries(threadReactionsCounts).map(([type, amount]) => (
          <li key={threadData.id + type + amount}>
            <img src={(reactionIcons as any)[type] || ""} alt="type" />
            {amount}
          </li>
        ))}
      </ul>
      <Button className="Post__n-of-comments">
        {nOfComments === 1
          ? "1 Comment"
          : nOfComments && `${nOfComments} Comments`}
      </Button>
      <footer className="Post__actions">
        <OptionsMenu buttons={ReactionOptions} className="above bar">
          <img src={reactButton} alt="React" />
        </OptionsMenu>
        <Button onClick={() => {}}>
          <img src={commentButton} alt="Comment" />
        </Button>
        <Button onClick={() => {}}>
          <img src={folkButton} alt="Fork" />
        </Button>
      </footer>
    </article>
  );
}

export default Post;
