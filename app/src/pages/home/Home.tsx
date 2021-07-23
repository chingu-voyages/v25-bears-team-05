import React, { useEffect, useState } from "react";
import Button from "../../components/button";
import PostMaker from "../../components/postMaker";
import "./Home.css";
import editIcon from "../../images/editicon.svg";
import { IPostMakerProps } from "../../components/postMaker/PostMaker.type";
import Post from "../thread/components/post";
import ProfileCard from "../../components/profileCard";
import { useHistory } from "react-router-dom";
import {
  readHomeFeedLatestAsync,
  selectHomeFeed,
  selectHomeStatus,
  selectLatestBucketDate,
} from "./homeSlice";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { IFeedItem } from "../../services/feed/feed.type";
import Status from "../../components/status";
import Page from "../../components/page";
import { createThreadAsync } from "../thread/threadSlice";

function Home() {
  const history = useHistory();
  const dispatch = useDispatch();
  // const status = useSelector(selectHomeStatus, shallowEqual);
  const feed = useSelector(selectHomeFeed, shallowEqual);
  const lastestFeedItem = useSelector(selectLatestBucketDate, shallowEqual);

  // fetch homefeed on first load
  useEffect(() => {
    dispatch(
      readHomeFeedLatestAsync({
        query: lastestFeedItem ? `newerThanDate=${lastestFeedItem}` : "",
      })
    );
  }, [dispatch, lastestFeedItem]);

  const resetPostMaker = () => {
    setIsPostMakerOpen(false);
    history.location.hash.match("#newpost") && history.push("/home");
  };
  const postMakerOptions: IPostMakerProps = {
    title: "Share",
    placeholder: "Share your thoughts. Add photos or hashtags.",
    onSubmit: ({ content, threadVisibility }) => {
      const data = {
        htmlContent: content,
        threadType: 0,
        visibility: threadVisibility,
        hashTags: [],
      };
      dispatch(createThreadAsync(data));
      resetPostMaker();
    },
    handleCancel: () => {
      resetPostMaker();
    },
    className: "Home__post-maker",
    fullView: true,
  };
  const [isPostMakerOpen, setIsPostMakerOpen] = useState(false);
  useEffect(() => {
    if (history.location.hash.match("#newpost")) {
      setIsPostMakerOpen(true);
    } else {
      setIsPostMakerOpen(false);
    }
  }, [history.location.hash]);

  const FeedItem = ({
    documentId,
    documentType,
    documentUpdatedAt,
  }: IFeedItem) => {
    switch (documentType) {
      case "thread":
        return (
          <li className="Home-page__feed__list__item">
            <Post threadId={documentId} />
          </li>
        );
      default:
        return <li className="Home-page__invisible-item"></li>;
    }
  };

  return (
    <Page className="Home-page">
      {/* {<Status status={status} />} */}
      <ProfileCard
        type="home-page"
        userId="me"
        className="Home-page__profile"
      />
      <div className="Home-page__post-maker-start">
        {!isPostMakerOpen ? (
          <Button
            onClick={() => setIsPostMakerOpen(true)}
            className="Home-page__post-maker-start__button"
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
          {feed.map((item) =>
            item?.documentId ? (
              <FeedItem {...item} key={"feedItem" + item?.documentId} />
            ) : null
          )}
        </ul>
      </div>
    </Page>
  );
}

export default Home;
