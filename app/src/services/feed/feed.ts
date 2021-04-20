import axios from "axios";
import { IThread, IThreadDataProcessed } from "../thread/thread.type";
import { IFeedItem, IFeedRawResponse } from "./feed.type";
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
  const documents: {
    [documentId: string]: IThreadDataProcessed;
  } = {};
  [...processedConnectionThreads, ...processedPublicThreads].forEach(
    (doc) => (documents[doc.id] = doc)
  );
  const processedData = () => ({
    // should add uuid to end of key but this process will be moved to the backend later
    documents,
    bucket: {
      [latestUpdate.toISOString().replace(/\D/g, "") + "_uuid_"]: {
        collection: {
          [50]:
            ((processedConnectionThreads.map((data) => ({
              documentId: data.id,
              documentType: "thread",
              documentUpdatedAt: data.content.updatedAt,
            })) as unknown) as Array<IFeedItem>) || [],
          [10]:
            ((processedPublicThreads.map((data) => ({
              documentId: data.id,
              documentType: "thread",
              documentUpdatedAt: data.content.updatedAt,
            })) as unknown) as Array<IFeedItem>) || [],
        },
        latestUpdate: latestUpdate.toISOString(),
        oldestUpdate: oldestUpdate.toISOString(),
      },
    },
  });
  return processedData();
};

export { getFeed };
