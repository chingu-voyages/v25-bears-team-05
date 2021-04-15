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
    ? connectionSuggestions.map((suggestionData: IUserConnection) =>
        processSuggestion(suggestionData)
      )
    : [];
  const processedData = {
    connectionThreads:
      ((processedConnectionThreads.map((data) => ({
        thread: { threadData: data },
      })) as unknown) as Array<{ thread: IProcessedThreadFeed }>) || [],
    connectionSuggestions:
      ((processedConnectionSuggestions.map((data) => ({
        suggestion: data,
      })) as unknown) as Array<{ suggestion: IProcessedSuggestionFeed }>) || [],
    publicThreads:
      ((processedPublicThreads.map((data) => ({
        thread: { threadData: data },
      })) as unknown) as Array<{ thread: IProcessedThreadFeed }>) || [],
  };
  return processedData;
};

function processSuggestion(userData: IUserConnection) {
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
