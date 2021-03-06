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
  if (res.status === 200) {
    const processedThreadData = await processThread(res.data);
    return processedThreadData;
  } else {
    throw Error(res.statusText);
  }
};

// TODO make more efficient route for getting multiple threads
const getThreads = async ({ threadIds }: { threadIds: string[] }) => {
  const res = await Promise.all(
    threadIds.map((threadId) => getThread({ threadId }))
  );
  const threads: { [threadId: string]: IThreadDataProcessed } = {};
  res.forEach((thread: IThreadDataProcessed) => (threads[thread.id] = thread));
  return threads;
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

const currentUserId = sessionStorage.getItem("currentUserId");

async function processThread(
  threadData: IThread
): Promise<IThreadDataProcessed> {
  const threadId = threadData._id || threadData.id!;
  const sortCommentsByDate = (arr: IThreadComment[]) =>
    arr.sort(
      (a, b) =>
        parseInt(b.updatedAt.replace(/[-.:\D]/g, "")) -
        parseInt(a.updatedAt.replace(/[-.:\D]/g, ""))
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
      threadData.comments &&
      sortCommentsByDate(Object.values(threadData.comments)),
    updatedAt: threadData.updatedAt,
    createdAt: threadData.createdAt,
  };
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
  getThreads,
  addThread,
  addThreadReaction,
  removeThreadReaction,
  processThread,
};
