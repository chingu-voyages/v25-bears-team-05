import axios from "axios";
import { IThread } from "../thread/thread.type";
import {
  IFeedRawResponse,
  IProcessedSuggestionFeed,
  IProcessedThreadFeed,
} from "./feed.type";
import { IUserProcessed } from "../user/user.type";
import processThread from "../thread/processThread";

const getFeed = async ({ query }: { query: string }) => {
  const res = await axios(`/api/feed?${query}`);
  if (res.data) {
    const {
      connectionThreads,
      connectionSuggestions,
      publicThreads,
    }: IFeedRawResponse = res.data;
    const processedConnectionThreads = connectionThreads
      ? await Promise.all(
          connectionThreads.map((threadData: IThread) =>
            processThread(threadData)
          )
        )
      : [];
    const processedPublicThreads = publicThreads
      ? await Promise.all(
          publicThreads.map((threadData: IThread) => processThread(threadData))
        )
      : [];
    const processedConnectionSuggestions = connectionSuggestions
      ? connectionSuggestions.map((suggestionData: IUserProcessed) =>
          processSuggestion(suggestionData)
        )
      : [];
    const processedData = {
      connectionThreads:
        ((processedConnectionThreads.map((data) => ({
          thread: data,
        })) as unknown) as Array<{ thread: IProcessedThreadFeed }>) || [],
      connectionSuggestions:
        ((processedConnectionSuggestions.map((data) => ({
          suggestion: data,
        })) as unknown) as Array<{ suggestion: IProcessedSuggestionFeed }>) ||
        [],
      publicThreads:
        ((processedPublicThreads.map((data) => ({
          thread: data,
        })) as unknown) as Array<{ thread: IProcessedThreadFeed }>) || [],
    };
    return processedData;
  } else {
    throw "Unable to get info from server, please try again later";
  }
};

function processSuggestion(userData: IUserProcessed) {
  const { firstName, lastName, jobTitle, avatar, id, isAConnection } = userData;
  const data = {
    profileData: {
      firstName,
      lastName,
      jobTitle,
      avatar,
      id,
      isAConnection: isAConnection || false,
    },
    referral: {
      reason: `Want to add ${firstName} ${lastName} as a connection?`,
    },
  };
  return data;
}

export { getFeed };
