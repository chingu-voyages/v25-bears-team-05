import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import {
  IThreadReferral,
  IThreadDataProcessed,
  IThreadComment,
} from "../../services/thread/thread.type";
import Button from "../button";
import OptionsMenu from "../optionsMenu";
import ProfileCard from "../profileCard";
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
import { getCurrentUserInfo } from "../../services/user/currentUserInfo";
import {
  addThreadReaction,
  removeThreadReaction,
  addComment
} from "../../services/thread";
import { HashLink } from "react-router-hash-link";
import Comment from "../comment";
import PostMaker from "../postMaker";
import Spinner from "../spinner";
const md = require("markdown-it")();

function Post({
  threadData,
  referral,
  className = "",
  showComments,
}: {
  threadData: IThreadDataProcessed;
  referral?: IThreadReferral;
  className?: string;
  showComments?: boolean;
}) {
  const history = useHistory();
  const [inProgress, setInProgress] = useState(false);
  const [comments, setComments] = useState(threadData.comments);
  const [threadReactionsCounts, setThreadReactionsCounts] = useState(
    threadData.reactionsCount
  );
  const [currentUserReactions, setCurrentUserReactions] = useState(
    threadData.currentUserReactions
  );
  const [isMe, setIsMe] = useState(true);
  useEffect(() => {
    getCurrentUserInfo().then(({ id }) => setIsMe(id === threadData.postedByUserId));
  }, [threadData.postedByUserId]);

  const [nOfComments, setNOfComments] = useState(
    comments && Object.keys(comments).length
  );
  useEffect(() => {
    setNOfComments(comments && Object.keys(comments).length);
  }, [comments]);
  const handleThreadReaction = (title: string) => {
    let countValue = 0;
    const onSuccess = (threadLikeId: string | false) => {
      setCurrentUserReactions((reactions) => ({
        ...reactions,
        [title]: threadLikeId,
      }));
      setThreadReactionsCounts((counts) => {
        const newCount = (counts[title] || 0) + countValue;
        return { ...counts, [title]: newCount > 0 ? newCount : 0 };
      });
    };
    const onError = (msg: string) => {
      console.error(msg);
    };
    if (currentUserReactions[title]) {
      countValue = -1;
      removeThreadReaction({
        threadId: threadData.id,
        threadLikeId: currentUserReactions[title] || "",
        onSuccess,
        onError,
      });
    } else {
      countValue = 1;
      addThreadReaction({ threadId: threadData.id, title, onSuccess, onError });
    }
  };

  const ReactionOptions = {
    Star: {
      action: () => {
        handleThreadReaction("star");
      },
      children: <img src={starIcon} alt="Star" />,
    },
    Heart: {
      action: () => {
        handleThreadReaction("heart");
      },
      children: <img src={heartIcon} alt="Heart" />,
    },
    Process: {
      action: () => {
        handleThreadReaction("process");
      },
      children: <img src={processingIcon} alt="Process" />,
    },
  };
  const reactionIcons = {
    star: smallStarIcon,
    heart: smallHeartIcon,
    process: smallProcessingIcon,
  };
  const [commentEditorOpen, setCommentEditorOpen] = useState(false);

  const postArticle = (
    <article id={`thread-${threadData.id}`} className={`Post ${className}`}>
      <header className="Post__relational-info">
        {referral?.userId && referral.userName && (
          <Link to={`/${referral.userId}/profile`}>{referral.userName}</Link>
        )}
        {referral?.reason}
      </header>
      <ProfileCard className="Post__profile-card" type="thread" userId={threadData.postedByUserId} threadData={threadData} />

      <main
        className="Post__content"
        dangerouslySetInnerHTML={{ __html: md.render(threadData.content.html) }}
      ></main>
      <ul className="Post__reactions">
        {Object.entries(threadReactionsCounts).map(
          ([type, amount]) =>
            !!amount && (
              <li key={threadData.id + type + amount}>
                <img src={(reactionIcons as any)[type] || ""} alt="type" />
                {amount}
              </li>
            )
        )}
      </ul>
      <Button className="Post__n-of-comments">
        {nOfComments && (
          <HashLink to={showComments ? "" : `#thread-${threadData.id}`}>
            {nOfComments === 1 ? "1 Comment" : `${nOfComments} Comments`}
          </HashLink>
        )}
      </Button>
      <footer className="Post__actions">
        <OptionsMenu buttons={ReactionOptions} className="above bar">
          <img src={reactButton} alt="React" />
        </OptionsMenu>
        <HashLink to={commentEditorOpen ? `#thread-${threadData.id}` : `?commenting=true#thread-${threadData.id}`}>
          <img src={commentButton} alt="Comment" />
        </HashLink>
        <Button onClick={() => {}}>
          <img src={folkButton} alt="Fork" />
        </Button>
      </footer>
    </article>
  );

  const [makeCommentError, setMakeCommentError] = useState("");
  const resetCommentMaker = () => {
    setCommentEditorOpen(false);
    setMakeCommentError("");
    history.location.hash.match(/^#thread\S*/) && history.push("/home"+history.location.hash);
  };
  const commentMakerOptions = {
    title: "Comment",
    placeholder: "Your comment",
    onSubmit: ({content}: {content: string}) => {
      setInProgress(true);
      const onSuccess = (data: IThreadComment) => {
        setInProgress(false);
        setComments((comments) => ({[data.id]: data, ...comments}));
        resetCommentMaker();
      };
      addComment({
        threadId: threadData.id,
        data: { 
          content,
        },
        onSuccess,
        onError: (msg: string) => {
          setMakeCommentError(msg);
        },
      }); 
    },
    handleCancel: () => {
      resetCommentMaker();
    },
    errorMessage: makeCommentError,
    className: "Home__comment-maker",
    fullView: false,
  };

  useEffect(() => {
    setCommentEditorOpen(!!history.location.search.match("commenting=true"));
  }, [history.location.search]);

  return (<>
    {showComments ? <main>
      {postArticle}
      {comments && Object.values(comments).map(commentData => <Comment key={commentData.id} {...{commentData}} />)}
      {commentEditorOpen && (
            <PostMaker {...commentMakerOptions} />
        )
      }
    </main> : postArticle}
    {inProgress && <Spinner />}
  </>);
}

export default Post;
