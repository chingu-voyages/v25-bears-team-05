import React, { useEffect, useState } from "react";
import Button from "../../components/button";
import PostMaker from "../../components/postMaker";
import "./Home.css";
import editIcon from "../../images/editicon.svg";
import { IPostMakerProps } from "../../components/postMaker/PostMaker.type";
import Spinner from "../../components/spinner";
import Post from "../../components/post";
import ProfileCard from "../../components/profileCard";
import TopBar from "../../components/topBar";
import Nav from "../../components/nav";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { getCurrentUser } from "../../redux/selectors";
import { IUser } from "../../services/user/user.type";
import { IStoreStateFeedBucket } from "../../redux/store.type";

function Home({ currentUserData }: { currentUserData: IUser }) {
  // const history = useHistory();
  // const [inProgress, setInProgress] = useState(false);
  // const [feed, setFeed] = useState<any[]>([]);

  // useEffect(() => {

  // }, users)

  // const [makePostError, setMakePostError] = useState("");
  // const resetPostMaker = () => {
  //   setIsPostMakerOpen(false);
  //   setMakePostError("");
  //   history.location.hash.match("#newpost") && history.push("/home");
  // };
  // const postMakerOptions: IPostMakerProps = {
  //   title: "Share",
  //   placeholder: "Share your thoughts. Add photos or hashtags.",
  //   onSubmit: ({ content, threadVisibility }) => {
  //     setInProgress(true);
  //     // addThread
  //   },
  //   handleCancel: () => {
  //     resetPostMaker();
  //   },
  //   errorMessage: makePostError,
  //   className: "Home__post-maker",
  //   fullView: true,
  // };
  // const [isPostMakerOpen, setIsPostMakerOpen] = useState(false);
  // useEffect(() => {
  //   if (history.location.hash.match("#newpost")) {
  //     setIsPostMakerOpen(true);
  //   } else {
  //     setIsPostMakerOpen(false);
  //   }
  // }, [history.location.hash]);

  // const FeedItem = ({ thread, suggestion }: IStoreStateFeedBucket) => {
  //   return (
  //     <li className="Home-page__feed__list__item">
  //       {thread && <Post {...thread} />}
  //       {suggestion && <ProfileCard type="thread" userData={suggestion} />}
  //     </li>
  //   );
  // };

  return (
    <div className="Home-page">
      <TopBar className="Home-page__top-bar" />
    </div>
  );
}

const mapStateToProps = (state: any) => {
  const currentUserData = getCurrentUser(state);
  return { currentUserData };
};

export default connect(mapStateToProps)(Home);
