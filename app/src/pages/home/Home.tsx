import React, {useState} from "react";
import Button from "../../components/button";
import PostMaker from "../../components/postMaker";
import logout from "../../services/logout";
import "./Home.css";
import editIcon from "../../images/editicon.svg";
import { IPostMakerProps } from "../../components/postMaker/PostMaker.type";
import { IThread, ThreadVisibility } from "../../services/thread/thread.type";
import { addThread } from "../../services/thread";
import Spinner from "../../components/spinner";

function Home() {
  const [feed, setFeed] = useState([]);
  const [isPostMakerOpen, setIsPostMakerOpen] = useState(false);
  const [makePostError, setMakePostError] = useState("");
  const [inProgress, setInProgress] = useState(false);

  const resetPostMaker = () => {
    setIsPostMakerOpen(false);
    setMakePostError("");
  }
  const postMakerOptions: IPostMakerProps = {
    title: "Share",
    placeholder: "Share your thoughts. Add photos or hashtags.",
    onSubmit: ({content}) => {
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
          visibility: 0,
          hashTags: []
        },
        onSuccess,
        onError: (msg) => { setMakePostError(msg) }
      })
    },
    handleCancel: () => { resetPostMaker(); },
    errorMessage: makePostError,
    className: "Home__post-maker",
    fullView: true
  }
  return (
    <div className="Home-page">
      <h1>Home page - TODO</h1>
      <Button onClick={logout} className="square">
        Temporary logout button
      </Button>
      { !isPostMakerOpen ?
          <Button onClick={() => setIsPostMakerOpen(true)} className="Post-maker__start">
              <img src={editIcon} alt="" />
              <h1>Share your thoughts or photos</h1>
          </Button>
        :
          <PostMaker {...postMakerOptions} />
      }
      { inProgress && <Spinner className="Home__spinner" /> }
    </div>
  );
}

export default Home;

