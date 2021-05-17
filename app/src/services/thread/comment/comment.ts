import axios from "axios";
import { processThread } from "../thread";

const addComment = async ({
  threadId,
  data,
}: {
  threadId: string;
  data: { content: string };
}) => {
  const res = await axios({
    method: "post",
    url: `/api/comments`,
    data: {
      ...data,
      threadId,
    },
  });
  if (res?.data?.updatedThread) {
    const processedThreadData = await processThread(res.data.updatedThread);
    return {
      updatedThread: processedThreadData,
      newComment: res.data.newComment,
    };
  } else {
    throw Error(res.statusText);
  }
};

const getComments = async ({ commentIds }: { commentIds: string[] }) => {
  const res = await axios(
    `/api/comments?id=608abefb2f348f1d40eedca3&id=${commentIds.join("&id=")}`
  );
  if (res.data.threadComments) {
    return res.data.threadComments;
  } else {
    throw Error(res.statusText);
  }
};

const deleteComment = async ({ commentId }: { commentId: string }) => {
  const res = await axios({
    method: "delete",
    url: `/api/comments/${commentId}`,
  });
  if (res?.data?.updatedThread) {
    const processedThreadData = await processThread(res.data.updatedThread);
    return {
      updatedThread: processedThreadData,
      commentId,
    };
  } else {
    throw Error(res.statusText);
  }
};

export { addComment, getComments, deleteComment };
