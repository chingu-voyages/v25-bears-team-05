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
  connections: { [keyof: string]: IUserConnection };
  connectionOf: { [keyof: string]: IUserConnection };
  threads: {
    started?: { [keyof: string]: IThread };
    commented?: { [keyof: string]: IThreadComment };
    liked?: { [keyof: string]: IThreadLike };
    shared?: { [keyof: string]: IThreadShare };
  };
}

export interface IUserConnection {
  firstName: string;
  lastName: string;
  jobTitle: string;
  avatar: Array<Avatar>;
  dateTimeConnected: string;
  isTeamMate: boolean;
  userId: string;
}

export interface IUserPatchRequest {
  firstName?: string;
  lastName?: string;
  jobTitle?: string;
  avatar?: string | Array<Avatar> | undefined;
  [keyof: string]: any;
}

export interface IUserProcessed extends IUserInfo {
  nOfConnections?: number | null;
  isAConnection?: boolean;
  dateTimeConnected?: string;
  isTeamMate?: boolean;
  connections?: { [keyof: string]: IUserConnection };
  connectionOf?: { [keyof: string]: IUserConnection };
  isMe?: boolean;
}

export interface IUserProfile {
  firstName: string;
  lastName: string;
  jobTitle: string;
  avatar: string | undefined;
  nOfConnections: number | null;
  isAConnection: boolean;
}

export interface IUserThread extends IUserProcessed {
  dateTimePosted: string;
  visibility: "anyone" | "connections";
}

export interface IUsersStore {
  [keyof: string]: IUserProcessed;
}
