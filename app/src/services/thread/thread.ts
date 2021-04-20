import {
  INewThreadData,
  IThread,
  IThreadComment,
  IThreadDataProcessed,
} from "./thread.type";
import axios from "axios";

const getThread = async ({ threadId }: { threadId: string }) => {
  const res = await axios({
    method: "get",
    url: `/api/threads/${threadId}`,
  });
  return res.data;
};

const addThread = async ({ data }: { data: INewThreadData }) => {
  const res = await axios({
    method: "post",
    url: `/api/threads`,
    data,
  });
  if (res.status === 200) {
    const processedThreadData = await processThread(res.data);
    return processedThreadData;
  } else {
    throw Error(res.statusText);
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
  if (res?.data?.updatedThread) {
    const processedThreadData = await processThread(res.data.updatedThread);
    return processedThreadData;
  } else {
    throw Error(res.statusText);
  }
};

const removeThreadReaction = async ({
  threadId,
  threadLikeId,
}: {
  threadId: string;
  threadLikeId: string;
}) => {
  const res = await axios({
    method: "delete",
    url: `/api/threads/${threadId}/likes`,
    data: { threadLikeId },
  });
  if (res?.data?.updatedThread) {
    const processedThreadData = await processThread(res.data.updatedThread);
    return processedThreadData;
  } else {
    throw Error(res.statusText);
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
  if (res?.data?.updatedThread) {
    const processedThreadData = await processThread(res.data.updatedThread);
    return processedThreadData;
  } else {
    throw Error(res.statusText);
  }
};

const getComments = async ({ threadId }: { threadId: string }) => {
  const res = await axios(`/api/threads/${threadId}/comments`);
  return res.data.threadComments;
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
  if (res?.data?.updatedThread) {
    const processedThreadData = await processThread(res.data.updatedThread);
    return processedThreadData;
  } else {
    throw Error(res.statusText);
  }
};

const currentUserId = sessionStorage.getItem("currentUserId");

async function processThread(
  threadData: IThread
): Promise<IThreadDataProcessed> {
  const threadId = threadData._id || threadData.id!;

  const comments = await getComments({ threadId: threadId });
  const sortCommentsByDate = (arr: IThreadComment[]) =>
    arr.sort(
      (a, b) =>
        parseInt(b.updatedAt.replace(/[-\.\:\D]/g, "")) -
        parseInt(a.updatedAt.replace(/[-\.\:\D]/g, ""))
    );
  const processedThreadData: IThreadDataProcessed = {
    id: threadId,
    content: threadData.content,
    postedByUserId: threadData.postedByUserId,
    threadType: threadData.threadType,
    visibility: threadData.visibility,
    reactionsCount: {},
    currentUserReactions: {},
    comments:
      comments?.threadComments &&
      sortCommentsByDate(Object.values(comments.threadComments)),
    updatedAt: threadData.updatedAt,
    createdAt: threadData.createdAt,
  };
  console.log({ threadData });
  threadData.likes &&
    Object.entries(threadData.likes)?.forEach(([id, reaction]) => {
      const type = reaction.title;
      processedThreadData.reactionsCount[type] =
        (processedThreadData.reactionsCount[type] || 0) + 1;
      if (currentUserId === reaction.postedByUserId) {
        processedThreadData.currentUserReactions[type] = id;
      }
    });
  return processedThreadData;
}

export {
  getThread,
  addThread,
  addThreadReaction,
  removeThreadReaction,
  addComment,
  getComments,
  deleteComment,
  processThread,
};
