export interface IStoreFeedReferral {
  type: string;
  reason: string;
}
export interface IStoreUserConnection {
  userId: string;
  dateTimeConnected?: string;
  isTeamMate?: boolean;
}
export interface IStoreUserData {
  firstName: string;
  lastName: string;
  jobTitle: string;
  avatarUrls: Array<String>;
  id: string;
  nOfConnections?: number | null;
  isAConnection?: boolean;
  connections?: { [userId: string]: IStoreUserConnection };
  connectionOf?: { [userId: string]: IStoreUserConnection };
  isMe?: boolean;
}
export interface IStoreThreadData {
  _id: string;
  postedByUserId: string;
  visibility: "anyone" | "connections";
  content: {
    html: string;
  };
  comments: {
    [commentId: string]: {
      _id: string;
      content: {
        html: string;
      };
      updatedAt: string;
      createdAt: string;
      postedByUserId: string;
    };
  };
  likes: {
    [likeId: string]: {
      _id: string;
      title: string;
      updatedAt: string;
      createdAt: string;
      postedByUserId: string;
    };
  };
  forks: {
    [threadId: string]: {
      postedByUserId: string;
    };
  };
  isAFork: boolean;
  updatedAt: string;
  createdAt: string;
}

export interface IStore {
  dialog: {
    loading: boolean;
    log: Array<{ type: "error" | "success" | "info"; message: string }>;
  };
  feed: {
    buckets: {
      [dateTime: string]: {
        threads?: {
          [threadId: string]: {
            threadData: {};
            refferal: IStoreFeedReferral;
          };
        };
        users?: {
          [userId: string]: {
            userData: IStoreUserData;
            refferal: IStoreFeedReferral;
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
    [threadId: string]: IStoreThreadData;
  };
  users: {
    [userId: string]: IStoreUserData;
  };
}
