import { Avatar } from "../../components/avatar/Avatar.type";
import {
  IThread,
  IThreadComment,
  IThreadLike,
  IThreadShare,
} from "../thread/thread.type";

export interface IUserInfo {
  firstName: string;
  lastName: string;
  jobTitle: string;
  avatar: Array<Avatar>;
  id: string;
}

export interface IUserRawResponse extends IUserInfo {
  connections: { [userId: string]: IUserConnection };
  connectionOf: { [userId: string]: IUserConnection };
  threads: {
    started?: { [threadId: string]: IThread };
    commented?: { [threadId: string]: { [commentId: string]: IThreadComment } };
    liked?: { [threadId: string]: { [likeId: string]: IThreadLike } };
    shared?: { [keyof: string]: IThreadShare };
  };
}

export interface IUserPatchRequest {
  firstName?: string;
  lastName?: string;
  jobTitle?: string;
  avatar?: string | undefined;
}

export interface IUserProcessed extends IUserRawResponse {
  nOfConnections?: number | null;
  isAConnection?: boolean;
}

export interface IUserProfile {
  firstName: string;
  lastName: string;
  jobTitle: string;
  avatar: string | undefined;
  nOfConnections: number | null;
  isAConnection: boolean;
}
export interface IUserConnection {
  dateTimeConnected: string;
  isTeamMate: boolean;
  firstName: string;
  lastName: string;
  jobTitle: string;
  avatar: Array<Avatar>;
  userId: string;
}
export interface IUserThread extends IUserProcessed {
  dateTimePosted: string;
  visibility: "anyone" | "connections";
}
