import axios from "axios";
import { IThread, IThreadDataProcessed } from "../thread/thread.type";
import { getUser } from "../user";
import {
  IFeedProcessedResponse,
  IFeedRawResponse,
  IProcessedSuggestionFeed,
  IProcessedThreadFeed,
} from "./feed.type";
import { IUserConnection } from "../user/user.type";
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
    const processedConnectionThreads = await Promise.all(
      connectionThreads.map((threadData: IThread) => processThread(threadData))
    );
    const processedPublicThreads = await Promise.all(
      publicThreads.map((threadData: IThread) => processThread(threadData))
    );
    const processedConnectionSuggestions = connectionSuggestions.map(
      (suggestionData: IUserConnection) => processSuggestion(suggestionData)
    );
    const processedData = {
      connectionThreads: (processedConnectionThreads.map((data) => ({
        thread: data,
      })) as unknown) as Array<{ thread: IProcessedThreadFeed }>,
      connectionSuggestions: (processedConnectionSuggestions.map((data) => ({
        suggestion: data,
      })) as unknown) as Array<{ suggestion: IProcessedSuggestionFeed }>,
      publicThreads: (processedPublicThreads.map((data) => ({
        thread: data,
      })) as unknown) as Array<{ thread: IProcessedThreadFeed }>,
    };
    onSuccess(processedData);
  } catch (error) {
    console.error(error);
    typeof error?.message === "string" &&
      onError("Unable to get info from server, please try again later");
  }
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

async function processThread(
  threadData: IThread
): Promise<IProcessedThreadFeed> {
  const processedThreadData: IThreadDataProcessed = {
    id: threadData._id,
    content: threadData.content,
    postedByUserId: threadData.postedByUserId,
    threadType: threadData.threadType,
    visibility: threadData.visibility,
    reactionsCount: {},
    currentUserReactions: {},
    comments: threadData.comments,
  };
  threadData.likes &&
    Object.values(threadData.likes)?.forEach((reaction) => {
      const type = reaction.threadLikeType.title;
      processedThreadData.reactionsCount[type] =
        (processedThreadData.reactionsCount[type] || 0) + 1;
      if (currentUserId === reaction.postedByUserId) {
        processedThreadData.currentUserReactions[type] = true;
      }
    });
  const userData = await getUser({
    userId: threadData.postedByUserId,
    onError: (msg) => {
      throw Error(msg);
    },
  });
  if (!userData) {
    throw Error("Unable to get user info");
  }
  const { firstName, lastName, jobTitle, avatar, id, isAConnection } = userData;
  const data = {
    threadData: processedThreadData,
    profileData: {
      firstName,
      lastName,
      jobTitle,
      dateTimePosted: threadData.updatedAt,
      visibility: threadData.visibility,
      avatar,
      id,
      isAConnection: isAConnection || false,
    },
  };
  return data;
}

export { getFeed };
