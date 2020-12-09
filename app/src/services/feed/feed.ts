import axios from "axios";
import { IThread } from "../thread/thread.type";
import { IUserConnection } from "../user/user.type";
import { IThreadFeed } from "./feed.type";

const getFeed = async ({
  query,
  onSuccess,
  onError,
}: {
  query: string;
  onSuccess: (data: {
    connectionThreads: IThreadFeed;
    connectionSuggestions: IUserConnection;
    publicThreads: IThreadFeed;
  }) => void;
  onError: (message: string) => void;
}) => {
  try {
    const res = await axios(`/api/feed?${query}`);
    const {
      connectionThreads,
      connectionSuggestions,
      publicThreads,
    } = res.data;
    const processThread = (threadData: IThread) => {};
    const processedConnectionThreads = connectionThreads.map(
      (threadData: IThread) => processThread(threadData)
    );
    const processedPublicThreads = publicThreads.map((threadData: IThread) =>
      processThread(threadData)
    );
    onSuccess({
      connectionThreads: processedConnectionThreads,
      connectionSuggestions,
      publicThreads: processedPublicThreads,
    });
  } catch (error) {
    console.error(error);
    typeof error?.message === "string" &&
      onError("Unable to get info from server, please try again later");
  }
};

export { getFeed };
