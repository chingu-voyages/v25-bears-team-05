import { ThreadReactionTypeTitle } from "../thread/thread.type";

export interface IUserConnection {
  userId: string;
  dateTimeConnected: string;
  isTeamMate: boolean;
}

export interface IUserThreadsReference {
  threadId: string;
  createdAt: string;
  updatedAt: string;
  contentSnippet: string;
  postedByUserId: string;
}

export interface IUserThreadsCommentReference {
  threadData: IUserThreadsReference;
  commentData: {
    commentId: string;
    createdAt: string;
    updatedAt: string;
    contentSnippet: string;
    postedByUserId: string;
  };
}

export interface IUserThreadsReactionReference {
  threadData: IUserThreadsReference;
  reactionData: {
    reactionId: string;
    postedByUserId: string;
    title: ThreadReactionTypeTitle;
    createdAt: string;
    updatedAt: string;
  };
}

export interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  jobTitle: string;
  avatarUrls: Array<{ url: string }>;
  nOfConnections: number;
  isAConnection: boolean;
  connections: { [userId: string]: IUserConnection };
  connectionOf: { [userId: string]: IUserConnection };
  threads: {
    started: { [threadId: string]: IUserThreadsReference };
    commented: {
      [threadId: string]: { [commentId: string]: IUserThreadsCommentReference };
    };
    reacted: {
      [threadId: string]: {
        [reactionId: string]: IUserThreadsReactionReference;
      };
    };
  };
  isCurrentUser: boolean;
}

export interface IUserPatch {
  firstName?: string;
  lastName?: string;
  jobTitle?: string;
  avatarUrls?: Array<{ url: string }>;
  [keyof: string]: any;
}
