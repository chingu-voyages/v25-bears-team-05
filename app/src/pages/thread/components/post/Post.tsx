import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  IThreadReferral,
  IThreadDataProcessed,
} from "../../../../services/thread/thread.type";
import Button from "../../../../components/button";
import OptionsMenu from "../../../../components/optionsMenu";
import ProfileCard from "../../../../components/profileCard";
import "./Post.css";
import starIcon from "../../../../images/staricon.svg";
import heartIcon from "../../../../images/hearticon.svg";
import processingIcon from "../../../../images/processingicon.svg";
import smallStarIcon from "../../../../images/smallstaricon.svg";
import smallHeartIcon from "../../../../images/smallhearticon.svg";
import smallProcessingIcon from "../../../../images/smallprocessingicon.svg";
import reactButton from "../../../../images/reactbutton.svg";
import commentButton from "../../../../images/commentbutton.svg";
import folkButton from "../../../../images/folkbutton.svg";
import Comment from "../../../../components/comment";
import PostMaker from "../../../../components/postMaker";
import { getStringExcerpt } from "../../../../components/search/search.helpers";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import {
  selectThreadById,
  createThreadCommentAsync,
  deleteThreadReactionAsync,
  createThreadReactionAsync,
  readThreadsAsync,
} from "../../threadSlice";
const md = require("markdown-it")();

function Post({
  threadId,
  referral,
  className = "",
  queryString,
  visibleExpanded,
}: {
  threadId: string;
  referral?: IThreadReferral;
  className?: string;
  showComments?: boolean;
  queryString?: string;
  visibleExpanded?: boolean;
}) {
  const threadData: IThreadDataProcessed = useSelector(
    selectThreadById(threadId),
    shallowEqual
  );
  const dispatch = useDispatch();
  const nOfComments = threadData?.comments
    ? Object.keys(threadData.comments).length
    : 0;

  const articleRef = useRef<any>();

  const [showComments, setShowComments] = useState(false);
  const [commentEditorOpen, setCommentEditorOpen] = useState(false);
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
  const resetCommentMaker = () => {
    setCommentEditorOpen(false);
    articleRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  const commentMakerOptions = {
    title: "Comment",
    placeholder: "Your comment",
    onSubmit: ({ content }: { content: string }) => {
      const data = {
        content,
      };
      dispatch(
        createThreadCommentAsync({
          threadId,
          data,
        })
      );
      resetCommentMaker();
    },
    handleCancel: () => {
      resetCommentMaker();
    },
    className: "Home__comment-maker",
    fullView: false,
  };

  const handleThreadReaction = (title: string) => {
    if (threadData?.currentUserReactions[title]) {
      dispatch(
        deleteThreadReactionAsync({
          threadId,
          threadLikeId: threadData.currentUserReactions[title] as string,
        })
      );
    } else {
      dispatch(
        createThreadReactionAsync({
          threadId,
          title,
        })
      );
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

  const postArticle = threadData ? (
    <article ref={articleRef} className={`Post ${className}`}>
      <header className="Post__relational-info">
        {referral?.userId && referral.userName && (
          <Link to={`/${referral.userId}/profile`}>{referral.userName}</Link>
        )}
        {referral?.reason}
        {queryString && (
          <p>
            {"«"}
            <b>{queryString}</b>
            {"»"}
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
        {Object.entries(threadData.reactionsCount).map(
          ([type, amount]) =>
            !!amount && (
              <li key={threadData.id + type + amount}>
                <img src={(reactionIcons as any)[type] || ""} alt="type" />
                {amount}
              </li>
            )
        )}
      </ul>
      {!!nOfComments &&
        Object.values(threadData.reactionsCount).some((v) => v > 0) && (
          <div className="Post__bullet">•</div>
        )}
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
  ) : null;

  useEffect(() => {
    if (!threadData) {
      dispatch(readThreadsAsync([threadId]));
    }
  }, [dispatch, threadData, threadId]);

  return (
    <>
      {postArticle}
      {showComments && (
        <>
          {threadData?.comments &&
            Object.values(threadData.comments).map((commentData) => (
              <Comment key={commentData._id} commentId={commentData._id} />
            ))}
          <div ref={commentMakerRef}></div>
          {commentEditorOpen && <PostMaker {...commentMakerOptions} />}
        </>
      )}
    </>
  );
}

export default Post;
