import { INewThreadData, IThreadComment } from "./thread.type";
import axios from "axios";
import { processThread } from "../feed/feed";
import { IProcessedThreadFeed } from "../feed/feed.type";

const addThread = async ({
  data,
  onSuccess,
  onError,
}: {
  data: INewThreadData;
  onSuccess: (data: IProcessedThreadFeed) => void;
  onError: (message: string) => void;
}) => {
  try {
    const req = await axios({
      method: "post",
      url: `/api/threads`,
      data,
    });
    if (req.status === 200) {
      const processedThreadData = await processThread(req.data);
      onSuccess(processedThreadData);
    } else {
      onError(req.statusText);
    }
  } catch (error) {
    console.error(error);
    typeof error?.message === "string" &&
      onError(
        "Sorry, we're unable to add your post at this time, please try again later"
      );
  }
};

const addThreadReaction = async ({
  threadId,
  title,
  onSuccess,
  onError,
}: {
  threadId: string;
  title: string;
  onSuccess: (data: string | false) => void;
  onError: (message: string) => void;
}) => {
  try {
    const req = await axios({
      method: "post",
      url: `/api/threads/${threadId}/likes`,
      data: { title },
    });
    if (req.status && req.data.threadLikeDocument._id) {
      onSuccess(req.data.threadLikeDocument._id);
    } else {
      throw Error(
        `Unable to get _id from req.data.threadLikeDocument: ${JSON.stringify(
          req.data.threadLikeDocument
        )}`
      );
    }
  } catch (error) {
    console.error(error);
    typeof error?.message === "string" &&
      onError(
        "Sorry, we're unable to add your reaction at this time, please try again later"
      );
  }
};

const removeThreadReaction = async ({
  threadId,
  threadLikeId,
  onSuccess,
  onError,
}: {
  threadId: string;
  threadLikeId: string;
  onSuccess: (clearReaction: string | false) => void;
  onError: (message: string) => void;
}) => {
  try {
    const req = await axios({
      method: "delete",
      url: `/api/threads/${threadId}/likes`,
      data: { threadLikeId },
    });
    if (req.status === 200) {
      onSuccess(false);
    } else {
      onError(req.statusText);
    }
  } catch (error) {
    console.error(error);
    typeof error?.message === "string" &&
      onError(
        "Sorry, we're unable to remove your reaction at this time, please try again later"
      );
  }
};

const addComment = async ({
  threadId,
  data,
  onSuccess,
  onError,
}: {
  threadId: string
  data: {content: string};
  onSuccess: (data: IThreadComment) => void;
  onError: (message: string) => void;
}) => {
  try {
    const req = await axios({
      method: "post",
      url: `/api/threads/${threadId}/comments`,
      data,
    });
    if (req.status === 200) {
      onSuccess(req.data.newComment);
    } else {
      onError(req.statusText);
    }
  } catch (error) {
    console.error(error);
    typeof error?.message === "string" &&
      onError(
        "Sorry, we're unable to add your post at this time, please try again later"
      );
  }
};

const getComments = async ({
  threadId,
  onSuccess,
  onError,
}: {
  threadId: string
  onSuccess?: (data: IThreadComment) => void;
  onError?: (message: string) => void;
}) => {
  try {
    const res = await axios(`/api/threads/${threadId}/comments`);
    onSuccess?.(res.data);
    return res.data;
  } catch (error) {
    console.error(error);
    typeof error?.message === "string" &&
      onError?.("Unable to get comments from server, please try again later");
  }
};

export { addThread, addThreadReaction, removeThreadReaction, addComment, getComments };
