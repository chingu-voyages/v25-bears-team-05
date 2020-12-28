import React, { useEffect, useState } from "react";
import Button from "../../components/button";
import PostMaker from "../../components/postMaker";
import "./Home.css";
import editIcon from "../../images/editicon.svg";
import { IPostMakerProps } from "../../components/postMaker/PostMaker.type";
import { addThread } from "../../services/thread";
import Spinner from "../../components/spinner";
import Post from "../../components/post";
import ProfileCard from "../../components/profileCard";
import { getFeed } from "../../services/feed/feed";
import {
  IFeedItemsProps,
  IFeedProcessedResponse,
  IProcessedThreadFeed,
} from "../../services/feed/feed.type";
import TopBar from "../../components/topBar";
import Nav from "../../components/nav";
import { useHistory } from "react-router-dom";

function Home() {
  const [feed, setFeed] = useState<any[]>([]);
  const [isPostMakerOpen, setIsPostMakerOpen] = useState(false);
  const [makePostError, setMakePostError] = useState("");
  const [inProgress, setInProgress] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const history = useHistory();
  const [expandedThreadId, setExpandedThreadId] = useState<null | string>(null);

  const resetPostMaker = () => {
    setIsPostMakerOpen(false);
    setMakePostError("");
    history.location.hash.match("#newpost") && history.push("/home");
  };
  const postMakerOptions: IPostMakerProps = {
    title: "Share",
    placeholder: "Share your thoughts. Add photos or hashtags.",
    onSubmit: ({ content, threadVisibility }) => {
      setInProgress(true);
      const onSuccess = (data: IProcessedThreadFeed) => {
        setInProgress(false);
        setFeed((feed) => [{ thread: data }, ...feed]);
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
      const threads = [...connectionThreads, ...publicThreads];
      const putNSuggestions = Math.ceil(
        connectionSuggestions.length / threads.length
      );
      const everyNThreads = Math.ceil(
        threads.length / connectionSuggestions.length
      );
      let suggestionsQueue = connectionSuggestions.slice();
      const feed = threads
        .map((thread, index) => {
          if (!(index % everyNThreads)) {
            return [thread, ...suggestionsQueue.splice(0, putNSuggestions)];
          }
          return thread;
        })
        .flat();
      setFeed(feed);
      setInProgress(false);
    };
    setInProgress(true);
    getFeed({
      query: "",
      onSuccess,
      onError: (msg) => {
        setErrorMessage(msg);
      },
    });
  }, []);

  useEffect(() => {
    if (history.location.hash.match("#newpost")) {
      setIsPostMakerOpen(true);
    } else {
      setIsPostMakerOpen(false);
    }
  }, [history.location.hash]);

  useEffect(() => {
    if (history.location.hash.match(/^#thread\S*/)) {
      const threadId = history.location.hash.split("#thread-")[1];
      setExpandedThreadId(threadId);
      if (!feed.some((item) => item?.thread.threadData?.id === threadId)) {
        setInProgress(true);
        // get thread
        // append to feed
        // scroll to/open comments view
      }
    } else {
      setExpandedThreadId(null);
    }
  }, [history.location.hash]);

  const FeedItem = ({ thread, suggestion }: IFeedItemsProps) => (
    <li className="Home-page__feed__list__item">
      {thread && <Post {...thread} />}
      {suggestion && <ProfileCard threadInfo={suggestion} />}
    </li>
  );

  return (
    <div className="Home-page">
      <TopBar />
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
        {errorMessage && <div className="Home-page__error">{errorMessage}</div>}
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
      <Nav />
      {inProgress && <Spinner className="Home-page__spinner" />}
    </div>
  );
}

export default Home;
