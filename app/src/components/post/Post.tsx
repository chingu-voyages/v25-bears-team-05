import React, { useState } from "react";
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
const md = require("markdown-it")();
import starIcon from "../../images/staricon.svg";
import heartIcon from "../../images/hearticon.svg";
import processingIcon from "../../images/processingicon.svg";
import smallStarIcon from "../../images/staricon.svg";
import smallHeartIcon from "../../images/hearticon.svg";
import smallProcessingIcon from "../../images/processingicon.svg";
import starButton from "../../images/starbutton.svg";
import commentButton from "../../images/commentbutton.svg";
import folkButton from "../../images/folkbutton.svg";

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
  const nOfComments = Object.keys(threadData.comments).length;

  const ReactionOptions = {
    Star: {
      action: () => {},
      children: <img src={starIcon} alt="Star" />,
    },
    Heart: {
      action: () => {},
      children: <img src={heartIcon} alt="Heart" />,
    },
    Process: {
      action: () => {},
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
      <header className="Post__user-info">
        {referral && (
          <div className="Post__relational-info">
            <Link to={`/${referral.userId}/profile`}>{referral.userName}</Link>{" "}
            {referral.reason}
          </div>
        )}
        <ProfileCard threadInfo={profileData} />
        {!isAConnection && (
          <FollowButton
            connectionName={profileData.firstName + " " + profileData.lastName}
            connectionId={profileData.id}
            onFollow={() => {
              setIsAConnection(true);
            }}
          />
        )}
      </header>
      <main className="Post__content">
        {md.render(threadData.content.html)}
      </main>
      <footer className="Post__actions">
        <ul className="Post__reactions">
          {Object.entries(threadReactionsCounts).map(([type, amount]) => (
            <li key={threadData.id + type + amount}>
              <img src={(reactionIcons as any)[type] || ""} alt="type" />
              {amount}
            </li>
          ))}
        </ul>
        <Button className="Post__n-of-comments">{nOfComments}</Button>
        <div className="Post__actions">
          <OptionsMenu buttons={ReactionOptions}>
            <img src={starButton} alt="React" />
          </OptionsMenu>
          <Button onClick={() => {}}>
            <img src={commentButton} alt="Comment" />
          </Button>
          <Button onClick={() => {}}>
            <img src={folkButton} alt="Fork" />
          </Button>
        </div>
      </footer>
    </article>
  );
}

export default Post;
