import { getCurrentUserInfo } from "../user/currentUserInfo";
import { getComments } from "./thread";
import { IThread, IThreadDataProcessed, IThreadComment } from "./thread.type";

export default async function processThread(
  threadData: IThread
): Promise<IThreadDataProcessed> {
  const comments = await getComments({ threadId: threadData._id });
  const currentUserInfo = await getCurrentUserInfo();
  const currentUserId = currentUserInfo?.id;
  const sortCommentsByDate = (arr: IThreadComment[]) =>
    arr.sort(
      (a, b) =>
        parseInt(b.updatedAt.replace(/[-.:\D]/g, "")) -
        parseInt(a.updatedAt.replace(/[-.:\D]/g, ""))
    );
  const processedThreadData: IThreadDataProcessed = {
    id: threadData._id,
    content: threadData.content,
    postedByUserId: threadData.postedByUserId,
    threadType: threadData.threadType,
    visibility: threadData.visibility,
    reactionsCount: {},
    currentUserReactions: {},
    comments:
      comments?.threadComments &&
      sortCommentsByDate(Object.values(comments.threadComments)),
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
  return processedThreadData;
}
