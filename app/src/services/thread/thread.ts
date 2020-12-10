import { INewThreadData, IThread } from "./thread.type";
import axios from "axios";

const addThread = async ({
  data,
  onSuccess,
  onError,
}: {
  data: INewThreadData;
  onSuccess: (data: IThread) => void;
  onError: (message: string) => void;
}) => {
  try {
    const req = await axios({
      method: "post",
      url: `/api/threads`,
      data,
    });
    if (req.status === 200) {
      onSuccess(req.data);
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
  onSuccess: (data: IThread) => void;
  onError: (message: string) => void;
}) => {
  try {
    const req = await axios({
      method: "post",
      url: `/api/threads/${threadId}`,
      data: {title},
    });
    if (req.status === 200) {
      onSuccess(req.data);
    } else {
      onError(req.statusText);
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
  title,
  onSuccess,
  onError,
}: {
  threadId: string;
  title: string;
  onSuccess: (data: IThread) => void;
  onError: (message: string) => void;
}) => {
  try {
    const req = await axios({
      method: "delete",
      url: `/api/threads/${threadId}`,
      data: {title},
    });
    if (req.status === 200) {
      onSuccess(req.data);
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


export { addThread, addThreadReaction, removeThreadReaction };
