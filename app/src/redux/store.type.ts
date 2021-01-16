import { IFeedReferral } from "../services/feed/feed.type";
import { IThreadFork, ThreadVisibility } from "../services/thread/thread.type";
import { IUser } from "../services/user/user.type";

export interface IStoreStateThreadData {
  id: string;
  postedByUserId: string;
  visibility: ThreadVisibility;
  content: {
    html: string;
  };
  comments: Array<{
    id: string;
    content: {
      html: string;
    };
    updatedAt: string;
    createdAt: string;
    postedByUserId: string;
  }>;
  reactionsCount: {
    [title: string]: number;
  };
  currentUserReactions: {
    [title: string]: string | false;
  };
  forks: {
    [threadId: string]: IThreadFork;
  };
  isAFork: boolean;
  updatedAt: string;
  createdAt: string;
}

export interface IStoreState {
  dialog: {
    loading: boolean;
    log: Array<{ type: "error" | "success" | "info"; message: string }>;
  };
  feed: {
    buckets: {
      [dateTime: string]: {
        threads?: {
          [threadId: string]: {
            refferal: IFeedReferral;
          };
        };
        users?: {
          [userId: string]: {
            refferal: IFeedReferral;
          };
        };
      };
    };
    query: {
      filter: string;
      offset: number;
      limit: number;
    };
  };
  session: {
    isLoggedIn: boolean | undefined;
  };
  threads: {
    [threadId: string]: IStoreStateThreadData;
  };
  users: {
    [userId: string]: IUser;
  };
}
