import { Avatar } from "../../components/avatar/Avatar.type";

export interface IUserConnection {
  userId: string;
  dateTimeConnected?: string;
  isTeamMate?: boolean;
}

export interface IUser {
  _id: string;
  firstName: string;
  lastName: string;
  jobTitle: string;
  avatarUrls: Array<String>;
  nOfConnections?: number | null;
  isAConnection?: boolean;
  connections?: { [userId: string]: IUserConnection };
  connectionOf?: { [userId: string]: IUserConnection };
  isMe?: boolean;
}

export interface IUserPatch {
  firstName?: string;
  lastName?: string;
  jobTitle?: string;
  avatar?: string | Array<Avatar> | undefined;
  [keyof: string]: any;
}
