import axios from "axios";
import { IThread, IThreadDataProcessed } from "../thread/thread.type";
import { getUser } from "../user";
import { IFeedProcessedResponse, IFeedRawResponse, IProcessedThreadFeed } from "./feed.type";
const currentUserId = sessionStorage.getItem("currentUserId");

const getFeed = async ({
  query,
  onSuccess,
  onError,
}: {
  query: string;
  onSuccess: ({
    connectionThreads,
    connectionSuggestions,
    publicThreads,
  }: IFeedProcessedResponse) => void;
  onError: (message: string) => void;
}) => {
  try {
    const res = await axios(`/api/feed?${query}`);
    const {
      connectionThreads,
      connectionSuggestions,
      publicThreads,
    }: IFeedRawResponse = res.data;
    const processThread = async (threadData: IThread) => {
      const processedThreadData: IThreadDataProcessed = {
        id: threadData._id,
        content: threadData.content,
        postedByUserId: threadData.postedByUserId,
        threadType: threadData.threadType,
        visibility: threadData.visibility,
        reactionsCount: {},
        currentUserReactions: {},
        comments: threadData.comments,
      }
      threadData.likes && Object.values(threadData.likes)?.forEach(reaction => {
        const type = reaction.threadLikeType.title;
        processedThreadData.reactionsCount[type] = (processedThreadData.reactionsCount[type] || 0) + 1;
        if (currentUserId === reaction.postedByUserId) {
          processedThreadData.currentUserReactions[type] = true;
        }
      });
      const userData = await getUser({ userId: threadData.postedByUserId, onError: (msg) => {throw Error(msg)} });
      if (!userData) {
        throw Error("Unable to get user info");
      }
      const {
        firstName,
        lastName,
        jobTitle,
        avatar,
        id
      } = userData;
        const data = {
          threadData: processedThreadData,
          profileData: {
            firstName,
            lastName,
            jobTitle,
            dateTimePosted: threadData.updatedAt,
            visibility: threadData.visibility,
            avatar,
            id
          }
        };
        return data; 
    };
    const processedConnectionThreads = await Promise.all(connectionThreads.map(
      (threadData: IThread) => processThread(threadData)
    ));
    const processedPublicThreads = publicThreads.map((threadData: IThread) =>
      processThread(threadData)
    );
    const processedData = {
      connectionThreads: (processedConnectionThreads as unknown as IProcessedThreadFeed[]),
      connectionSuggestions,
      publicThreads: (processedPublicThreads as unknown as IProcessedThreadFeed[]),
    }
    onSuccess(processedData);
  } catch (error) {
    console.error(error);
    typeof error?.message === "string" &&
      onError("Unable to get info from server, please try again later");
  }
};

export { getFeed };
