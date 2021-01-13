import { INewThreadData } from "./thread.type";
import axios from "axios";
import pleaseTryLaterError from "../../utils/pleaseTryLaterError";
import processThread from "./processThread";

const addThread = async ({ data }: { data: INewThreadData }) => {
  const req = await axios({
    method: "post",
    url: `/api/threads`,
    data,
  });
  if (req.data) {
    const processedThreadData = await processThread(req.data);
    return processedThreadData;
  } else {
    throw pleaseTryLaterError("add your post");
  }
};

const deleteThread = async ({ threadId }: { threadId: string }) => {
  const req = await axios({
    method: "delete",
    url: `/api/threads/${threadId}`
  });
  if (req.status === 200) {
    return true;
  }
  else {
    throw pleaseTryLaterError("delete your thread");
  }
}

const addThreadReaction = async ({
  threadId,
  title,
}: {
  threadId: string;
  title: string;
}) => {
  const req = await axios({
    method: "post",
    url: `/api/threads/${threadId}/likes`,
    data: { title },
  });
  if (req.data?.threadLikeDocument) {
    return req.data.threadLikeDocument;
  } else {
    throw pleaseTryLaterError("add your reaction");
  }
};

const removeThreadReaction = async ({
  threadId,
  reactionId,
}: {
  threadId: string;
  reactionId: string;
}) => {
  const req = await axios({
    method: "delete",
    url: `/api/threads/${threadId}/likes`,
    data: { threadLikeId: reactionId },
  });
  if (req.status === 200) {
    return true;
  } else {
    throw pleaseTryLaterError("remove your reaction");
  }
};

const addComment = async ({
  threadId,
  data,
}: {
  threadId: string;
  data: { content: string };
}) => {
  const req = await axios({
    method: "post",
    url: `/api/threads/${threadId}/comments`,
    data,
  });
  if (req.status === 200) {
    return req.data.newComment;
  } else {
    throw pleaseTryLaterError("add your comment");
  }
};

const getComments = async ({ threadId }: { threadId: string }) => {
  const res = await axios(`/api/threads/${threadId}/comments`);
  if (res.data) {
    return res.data;
  } else {
    return false;
  }
};

const deleteComment = async ({
  threadId,
  commentId,
}: {
  threadId: string;
  commentId: string;
}) => {
  const req = await axios({
    method: "delete",
    url: `/api/threads/${threadId}/comments/${commentId}`,
  });
  if (req.status === 200) {
    return {successMessage: "Comment deleted"};
  } else {
    throw pleaseTryLaterError("delete your comment");
  }
};

export {
  addThread,
  addThreadReaction,
  removeThreadReaction,
  addComment,
  getComments,
  deleteComment,
  deleteThread,
};
