import axios from "axios";
import { IThread, IThreadComment, IThreadDataProcessed } from "../thread/thread.type";
import {
  IFeedProcessedResponse,
  IFeedRawResponse,
  IProcessedSuggestionFeed,
  IProcessedThreadFeed,
} from "./feed.type";
import { IUserConnection } from "../user/user.type";
import { getComments } from "../thread";
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
    const processedConnectionThreads = connectionThreads ? await Promise.all(
      connectionThreads.map((threadData: IThread) => processThread(threadData))
    ) : [];
    const processedPublicThreads = publicThreads ? await Promise.all(
      publicThreads.map((threadData: IThread) => processThread(threadData))
    ) : [];
    const processedConnectionSuggestions = connectionSuggestions ? connectionSuggestions.map(
      (suggestionData: IUserConnection) => processSuggestion(suggestionData)
    ) : [];
    const processedData = {
      connectionThreads: (processedConnectionThreads.map((data) => ({
        thread: data,
      })) as unknown) as Array<{ thread: IProcessedThreadFeed }> || [],
      connectionSuggestions: (processedConnectionSuggestions.map((data) => ({
        suggestion: data,
      })) as unknown) as Array<{ suggestion: IProcessedSuggestionFeed }> || [],
      publicThreads: (processedPublicThreads.map((data) => ({
        thread: data,
      })) as unknown) as Array<{ thread: IProcessedThreadFeed }> || [],
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
  const comments = await getComments({threadId: threadData._id});
  const sortCommentsByDate = (arr: IThreadComment[]) => arr.sort((a, b) => parseInt(b.updatedAt.replace(/[-\.\:\D]/g, '')) - parseInt(a.updatedAt.replace(/[-\.\:\D]/g, '')));
  const processedThreadData: IThreadDataProcessed = {
    id: threadData._id,
    content: threadData.content,
    postedByUserId: threadData.postedByUserId,
    threadType: threadData.threadType,
    visibility: threadData.visibility,
    reactionsCount: {},
    currentUserReactions: {},
    comments: comments?.threadComments && sortCommentsByDate(Object.values(comments.threadComments)),
    updatedAt: threadData.updatedAt,
    createdAt: threadData.createdAt,
  };
  threadData.likes &&
    Object.entries(threadData.likes)?.forEach(([id, reaction]) => {
      const type = reaction.title;
      processedThreadData.reactionsCount[type] =
        (processedThreadData.reactionsCount[type] || 0) + 1;
      if (currentUserId === reaction.postedByUserId) {
        processedThreadData.currentUserReactions[type] = id;
      }
    });
  const data = {
    threadData: processedThreadData
  };
  return data;
}

export { getFeed, processThread };
