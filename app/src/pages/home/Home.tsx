import React, { useEffect, useState } from "react";
import Button from "../../components/button";
import PostMaker from "../../components/postMaker";
import logout from "../../services/logout";
import "./Home.css";
import editIcon from "../../images/editicon.svg";
import { IPostMakerProps } from "../../components/postMaker/PostMaker.type";
import {
  IThread,
  IThreadDataProcessed,
  IThreadReferral,
} from "../../services/thread/thread.type";
import { addThread } from "../../services/thread";
import Spinner from "../../components/spinner";
import Post from "../../components/post";
import {
  IConnectionCardInfo,
  IThreadCardInfo,
} from "../../components/profileCard/profileCard.type";
import ProfileCard from "../../components/profileCard";
import { getFeed } from "../../services/feed/feed";
import {
  IFeedItemsProps,
  IFeedProcessedResponse,
} from "../../services/feed/feed.type";

function Home() {
  const [feed, setFeed] = useState<any[]>([]);
  const [isPostMakerOpen, setIsPostMakerOpen] = useState(false);
  const [makePostError, setMakePostError] = useState("");
  const [inProgress, setInProgress] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const resetPostMaker = () => {
    setIsPostMakerOpen(false);
    setMakePostError("");
  };
  const postMakerOptions: IPostMakerProps = {
    title: "Share",
    placeholder: "Share your thoughts. Add photos or hashtags.",
    onSubmit: ({ content, threadVisibility }) => {
      setInProgress(true);
      const onSuccess = (data: IThread) => {
        console.log(data);
        setInProgress(false);
        resetPostMaker();
      };
      addThread({
        data: {
          htmlContent: content,
          threadType: 0,
          visibility: threadVisibility,
          hashTags: [],
        },
        onSuccess,
        onError: (msg) => {
          setMakePostError(msg);
        },
      });
    },
    handleCancel: () => {
      resetPostMaker();
    },
    errorMessage: makePostError,
    className: "Home__post-maker",
    fullView: true,
  };

  useEffect(() => {
    const onSuccess = ({
      connectionThreads,
      connectionSuggestions,
      publicThreads,
    }: IFeedProcessedResponse) => {
      console.log({
        connectionThreads,
        connectionSuggestions,
        publicThreads,
      });
      setFeed(connectionThreads.map((thread) => ({ thread })));
    };
    getFeed({
      query: "",
      onSuccess,
      onError: (msg) => {
        setErrorMessage(msg);
      },
    });
  }, []);

  const FeedItem = ({ thread, suggestion }: IFeedItemsProps) => (
    <li className="Home-page__feed__list__item">
      {thread && <Post {...thread} />}
      {suggestion && <ProfileCard threadInfo={suggestion} />}
    </li>
  );

  return (
    <div className="Home-page">
      <div>
        <h1>Home page - TODO</h1>
        <Button onClick={logout} className="square">
          Temporary logout button
        </Button>
      </div>
      <div>
        {!isPostMakerOpen ? (
          <Button
            onClick={() => setIsPostMakerOpen(true)}
            className="Post-maker__start"
          >
            <img src={editIcon} alt="" />
            <h1>Share your thoughts or photos</h1>
          </Button>
        ) : (
          <PostMaker {...postMakerOptions} />
        )}
      </div>
      <div className="Home-page__feed">
        <ul className="Home-page__feed__list">
          {feed.map(({ suggestion, thread }: IFeedItemsProps, index) => (
            <FeedItem
              {...{ suggestion, thread }}
              key={
                "feedItem" + (thread?.threadData?.id || suggestion?.id || index)
              }
            />
          ))}
        </ul>
        {/* <Pagenator {...{ page, nextPage, active: isEndPage || connections.length > 0 }} />  */}
      </div>
      <nav>
        <Button>Home</Button>
        <Button>Post</Button>
        <Button>My Network</Button>
      </nav>
      {inProgress && <Spinner className="Home__spinner" />}
    </div>
  );
}

export default Home;
