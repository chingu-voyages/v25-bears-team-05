import { INewThreadData, IThreadPatch } from "./thread.type";
import axios from "axios";
import pleaseTryLaterError from "../../utils/pleaseTryLaterError";

const addThread = async ({ threadData }: { threadData: INewThreadData }) => {
  const res = await axios({
    method: "post",
    url: `/api/threads`,
    data: threadData,
  });
  if (res.data) {
    return res.data;
  } else {
    throw pleaseTryLaterError("add your post");
  }
};

const editThread = async ({
  threadDataPatch,
  threadId,
}: {
  threadDataPatch: IThreadPatch;
  threadId: string;
}) => {
  const res = await axios({
    method: "patch",
    url: `/api/threads/${threadId}`,
    data: threadDataPatch,
  });
  if (res.data) {
    return res.data;
  } else {
    throw pleaseTryLaterError("edit your post");
  }
};

const getThread = async ({ threadId }: { threadId: string }) => {
  const res = await axios({
    method: "get",
    url: `/api/threads/${threadId}`,
  });
  if (res.data) {
    return res.data;
  } else {
    return false;
  }
};

const deleteThread = async ({ threadId }: { threadId: string }) => {
  const res = await axios({
    method: "delete",
    url: `/api/threads/${threadId}`,
  });
  if (res.status === 200) {
    return true;
  } else {
    throw pleaseTryLaterError("delete your thread");
  }
};

const addThreadReaction = async ({
  threadId,
  title,
}: {
  threadId: string;
  title: string;
}) => {
  const res = await axios({
    method: "post",
    url: `/api/threads/${threadId}/likes`,
    data: { title },
  });
  if (res.data?.threadLikeDocument) {
    return res.data.threadLikeDocument;
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
  const res = await axios({
    method: "delete",
    url: `/api/threads/${threadId}/likes`,
    data: { threadLikeId: reactionId },
  });
  if (res.status === 200) {
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
  const res = await axios({
    method: "post",
    url: `/api/threads/${threadId}/comments`,
    data,
  });
  if (res.status === 200) {
    return res.data.newComment;
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
  const res = await axios({
    method: "delete",
    url: `/api/threads/${threadId}/comments/${commentId}`,
  });
  if (res.status === 200) {
    return { successMessage: "Comment deleted" };
  } else {
    throw pleaseTryLaterError("delete your comment");
  }
};

export {
  addComment,
  addThread,
  addThreadReaction,
  deleteComment,
  deleteThread,
  editThread,
  getComments,
  getThread,
  removeThreadReaction,
};
