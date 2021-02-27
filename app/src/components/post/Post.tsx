import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
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
import {
  addThreadReaction,
  removeThreadReaction,
  addComment,
  deleteComment,
} from "../../services/thread";
import Comment from "../comment";
import PostMaker from "../postMaker";
import Spinner from "../spinner";
import { getStringExcerpt } from "../search/search.helpers";
const md = require("markdown-it")();

function Post({
  threadData,
  referral,
  className = "",
  queryString,
  visibleExpanded
}: {
  threadData: IThreadDataProcessed;
  referral?: IThreadReferral;
  className?: string;
  showComments?: boolean;
  queryString?: string;
  visibleExpanded?: boolean
}) {
  const [inProgress, setInProgress] = useState(false);
  const [comments, setComments] = useState(threadData.comments);
  const [nOfComments, setNOfComments] = useState(
    comments && Object.keys(comments).length
  );

  useEffect(() => {
    setNOfComments(comments && Object.keys(comments).length);
  }, [comments]);

  const [threadReactionsCounts, setThreadReactionsCounts] = useState(
    threadData.reactionsCount
  );
  const [currentUserReactions, setCurrentUserReactions] = useState(
    threadData.currentUserReactions
  );
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
  const [showComments, setShowComments] = useState(false);
  const [commentEditorOpen, setCommentEditorOpen] = useState(false);
  const articleRef = useRef<any>();
  const commentMakerRef = useRef<any>();
  const handleToggleCommentMaker = () => {
    if (commentEditorOpen) {
      setCommentEditorOpen(false);
    } else {
      setShowComments(true);
      setCommentEditorOpen(true);
      setTimeout(
        () =>
          commentMakerRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "center",
          }),
        0
      );
    }
  };
  const postArticle = (
    <article ref={articleRef} className={`Post ${className}`}>
      <header className="Post__relational-info">
        {referral?.userId && referral.userName && (
          <Link to={`/${referral.userId}/profile`}>{referral.userName}</Link>
        )}
        {referral?.reason}
        {queryString && (
          <p>
            {"«"}
            <b>{queryString}</b>{"»"}
            <i>
              {" "}
              {getStringExcerpt({
                queryString: queryString,
                threadContent: threadData.content.html!,
              })}{" "}
            </i>{" "}
          </p>
        )}
      </header>
      <ProfileCard
        className="Post__profile-card"
        type="thread"
        userId={threadData.postedByUserId}
        threadData={threadData}
      />

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
      <div className="Post__bullet">•</div>
      <Button
        onClick={() => setShowComments((show) => !show)}
        className="Post__n-of-comments"
      >
        {!!nOfComments &&
          (nOfComments === 1 ? "1 Comment" : `${nOfComments} Comments`)}
      </Button>
      <footer className="Post__actions">
        <OptionsMenu buttons={ReactionOptions} className="above bar">
          <img src={reactButton} alt="React" />
        </OptionsMenu>
        <Button onClick={handleToggleCommentMaker}>
          <img src={commentButton} alt="Comment" />
        </Button>
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
    articleRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  const commentMakerOptions = {
    title: "Comment",
    placeholder: "Your comment",
    onSubmit: ({ content }: { content: string }) => {
      setInProgress(true);
      const onSuccess = (data: IThreadComment) => {
        setInProgress(false);
        setComments((comments) => [data, ...comments]);
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

  const [errorMessage, setErrorMessage] = useState("");
  const handleDeleteComment = ({ commentId }: { commentId: string }) => {
    setInProgress(true);
    deleteComment({
      threadId: threadData.id,
      commentId,
      onSuccess: () => {
        setComments((comments) =>
          comments.filter((comment) => comment._id !== commentId)
        );
        setInProgress(false);
      },
      onError: (msg) => {
        setErrorMessage(msg);
        setInProgress(false);
      },
    });
  };

  return (
    <>
      {showComments ? (
        <>
          {postArticle}
          {comments &&
            Object.values(comments).map((commentData) => (
              <Comment
                key={commentData._id}
                {...{ commentData }}
                handleDeleteComment={() =>
                  handleDeleteComment({ commentId: commentData._id! })
                }
              />
            ))}
          <div ref={commentMakerRef}></div>
          {commentEditorOpen && <PostMaker {...commentMakerOptions} />}
        </>
      ) : (
        postArticle
      )}
      {errorMessage && <p className="Post__error">{errorMessage}</p>}
      {inProgress && <Spinner />}
    </>
  );
}

export default Post;
