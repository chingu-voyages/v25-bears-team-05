import React, { useEffect, useState } from "react";
import Button from "../../components/button";
import PostMaker from "../../components/postMaker";
import "./Home.css";
import editIcon from "../../images/editicon.svg";
import { IPostMakerProps } from "../../components/postMaker/PostMaker.type";
import Post from "../../components/post";
import ProfileCard from "../../components/profileCard";
import TopBar from "../../components/topBar";
import Nav from "../../components/nav";
import { useHistory } from "react-router-dom";
import Search from "../../pages/search";
import {
  createThreadAsync,
  readHomeFeedLatestAsync,
  selectHomeError,
  selectHomeFeed,
  selectHomeStatus,
} from "./homeSlice";
import { useSelector } from "react-redux";

function Home() {
  const history = useHistory();
  const [searchIsTriggered, setSearchIsTriggered] = useState<boolean>(false);
  const [searchQueryString, setSearchQueryString] = useState<string>("");

  const errorMessage = useSelector(selectHomeError);
  const status = useSelector(selectHomeStatus);
  const feed = useSelector(selectHomeFeed);

  useEffect(() => {
    readHomeFeedLatestAsync({ query: `` });
  }, []);

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
      createThreadAsync(data);
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

  const FeedItem = ({ thread }) => {
    if (!thread?.threadData.id) {
      return <li className="Home-page__invisible-item"></li>;
    }
    return (
      <li className="Home-page__feed__list__item">
        {thread && <Post {...thread} />}
      </li>
    );
  };

  const onSearchSubmit = (queryString: string) => {
    setSearchIsTriggered(!!queryString);
    setSearchQueryString(queryString);
  };

  return (
    <div className="Home-page">
      <TopBar className="Home-page__top-bar" onSearchSubmit={onSearchSubmit} />
      <ProfileCard
        type="home-page"
        userId="me"
        className="Home-page__profile"
      />
      <Search query={searchQueryString} triggered={searchIsTriggered}>
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
            {feed.map((item) => (
              <FeedItem
                {...{ thread }}
                key={"feedItem" + thread?.threadData?.id}
              />
            ))}
          </ul>
        </div>
      </Search>
      <Nav />
    </div>
  );
}

export default Home;
