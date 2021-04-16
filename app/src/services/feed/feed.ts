import axios from "axios";
import { IThread } from "../thread/thread.type";
import {
  IFeedRawResponse,
  IProcessedSuggestionFeed,
  IProcessedThreadFeed,
} from "./feed.type";
import { IUserConnection } from "../user/user.type";
import { processThread } from "../thread/thread";

const getFeed = async ({ query }: { query: string }) => {
  const res = await axios(`/api/feed?${query}`);
  const { connectionThreads, publicThreads }: IFeedRawResponse = res.data;
  let latestUpdate: Date;
  let oldestUpdate: Date;
  const checkIfLatestThread = (threadData: IThread) => {
    const threadDate = new Date(threadData.updatedAt);
    // First time called
    if (!latestUpdate && !oldestUpdate) {
      latestUpdate = threadDate;
      oldestUpdate = threadDate;
    } else {
      if (threadDate.valueOf() > latestUpdate.valueOf()) {
        latestUpdate = threadDate;
      }
      if (threadDate.valueOf() < oldestUpdate.valueOf()) {
        oldestUpdate = threadDate;
      }
    }
  };
  const processedConnectionThreads = connectionThreads
    ? await Promise.all(
        connectionThreads.map((threadData: IThread) => {
          checkIfLatestThread(threadData);
          return processThread(threadData);
        })
      )
    : [];
  const processedPublicThreads = publicThreads
    ? await Promise.all(
        publicThreads.map((threadData: IThread) => {
          checkIfLatestThread(threadData);
          return processThread(threadData);
        })
      )
    : [];
  const processedData = () => ({
    // should add uuid to end of key but this process will be moved to the backend later
    [latestUpdate.valueOf() + ""]: {
      documents: {
        ...processedConnectionThreads,
        ...processedPublicThreads,
      },
      collection: {
        [50]:
          ((processedConnectionThreads.map((data) => ({
            documentId: data.id,
            documentType: "thread",
            documentUpdatedAt: data.content.updatedAt,
          })) as unknown) as Array<{ thread: IProcessedThreadFeed }>) || [],
        [10]:
          ((processedPublicThreads.map((data) => ({
            documentId: data.id,
            documentType: "thread",
            documentUpdatedAt: data.content.updatedAt,
          })) as unknown) as Array<{ thread: IProcessedThreadFeed }>) || [],
      },
      latestUpdate,
      next: (nextLatestUpdateInFeed: Date) => {
        const query = `olderThanDate=${oldestUpdate}&newerThanDate=${nextLatestUpdateInFeed}`;
        return query;
      },
    },
  });
  return processedData();
};

export { getFeed };
