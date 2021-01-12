import { INewThreadData } from "./thread.type";
import axios from "axios";

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
    throw "Sorry, we're unable to add your post at this time, please try again later";
  }
};

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
  if (req.data?.threadLikeDocument?._id) {
    return req.data.threadLikeDocument._id;
  } else {
    throw "Sorry, we're unable to add your reaction at this time, please try again later";
  }
};

const removeThreadReaction = async ({
  threadId,
  threadLikeId,
}: {
  threadId: string;
  threadLikeId: string;
}) => {
  const req = await axios({
    method: "delete",
    url: `/api/threads/${threadId}/likes`,
    data: { threadLikeId },
  });
  if (req.status === 200) {
    return true;
  } else {
    throw "Sorry, we're unable to remove your reaction at this time, please try again later";
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
    throw "Sorry, we're unable to add your post at this time, please try again later";
  }
};

const getComments = async ({ threadId }: { threadId: string }) => {
  const res = await axios(`/api/threads/${threadId}/comments`);
  if (res.data) {
    return res.data;
  } else {
    throw "Unable to get comments from server, please try again later";
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
    return "Comment deleted";
  } else {
    throw "Sorry, we're unable to delete your comment at this time, please try again later";
  }
};

export {
  addThread,
  addThreadReaction,
  removeThreadReaction,
  addComment,
  getComments,
  deleteComment,
};
