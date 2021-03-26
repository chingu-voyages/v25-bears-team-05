import { IFeedItem } from "../services/feed/feed.type";
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

export interface IBucketItem extends IFeedItem {
  documentData: any; // IThreadResponse | IProfile | IThreadCommentDocument | IThreadReactionDocument | IUserConnectionDocument;
  destination: "home" | "profile" | "notification";
}

export interface IBucket {
  collection: {
    [priority: number]: Array<IBucketItem>;
  };
  latestUpdate: Date;
  oldestUpdate: Date;
  next: (olderThanDate: string) => void;
}

export interface IStoreState {
  dialog: {
    loading: boolean;
    log: Array<{ type: "error" | "success" | "info"; message: string }>;
  };
  feed: {
    home: {
      [latestItemDate: string]: IBucket;
    };
    profile: {
      [latestItemDate: string]: IBucket;
    };
    notification: {
      [latestItemDate: string]: IBucket;
    };
  };
  session: {
    isLoggedIn: boolean | undefined;
    appStartUrlPath: string;
  };
  threads: {
    [threadId: string]: IStoreStateThreadData;
  };
  users: {
    [userId: string]: IUser;
  };
}
