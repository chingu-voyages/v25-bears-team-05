import store from "../../redux/store";
import { IStoreStateThreadData } from "../../redux/store.type";
import { getComments } from "./thread";
import { IThreadComment, IRawResponseThread } from "./thread.type";

export default async function processThread(
  threadData: IRawResponseThread
): Promise<IStoreStateThreadData> {
  const comments = await getComments({ threadId: threadData._id });
  const { users } = store.getState();
  const currentUserInfo = users.me;
  const currentUserId = currentUserInfo?.id;
  const sortCommentsByDate = (arr: IThreadComment[]) =>
    arr.sort(
      (a, b) =>
        parseInt(b.updatedAt.replace(/[-.:\D]/g, "")) -
        parseInt(a.updatedAt.replace(/[-.:\D]/g, ""))
    );
  const processedThreadData: IStoreStateThreadData = {
    _id: threadData._id,
    content: threadData.content,
    postedByUserId: threadData.postedByUserId,
    visibility: threadData.visibility,
    reactionsCount: {},
    currentUserReactions: {},
    comments:
      comments?.threadComments &&
      sortCommentsByDate(Object.values(comments.threadComments)),
    updatedAt: threadData.updatedAt,
    createdAt: threadData.createdAt,
    forks: threadData.forks,
    isAFork: threadData.isAFork,
  };
  threadData.reactions &&
    Object.entries(threadData.reactions)?.forEach(([id, reaction]) => {
      const type = reaction.title;
      processedThreadData.reactionsCount[type] =
        (processedThreadData.reactionsCount[type] || 0) + 1;
      if (currentUserId === reaction.postedByUserId) {
        processedThreadData.currentUserReactions[type] = id;
      }
    });
  return processedThreadData;
}
