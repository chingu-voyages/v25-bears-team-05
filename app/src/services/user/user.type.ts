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

export interface IUserPatchRequest {
  firstName?: string;
  lastName?: string;
  jobTitle?: string;
  avatar?: string | undefined;
}

export interface IUserProcessed extends IUserInfo {
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
export interface IUserConnection extends IUserProcessed {
  dateTimeConnected: string;
  isTeamMate: boolean;
}
export interface IUserThread extends IUserProcessed {
  dateTimePosted: string;
  visibility: "anyone" | "connections";
}
