export default interface IUser {
  firstName: string;
  lastName: string;
  jobTitle: string;
  avatar: string | undefined;
  nOfConnections: number | null;
}

export interface IUserPatch {
  firstName?: string;
  lastName?: string;
  jobTitle?: string;
  avatar?: string | undefined;
}

export interface IUserConnection {
  firstName: string;
  lastName: string;
  jobTitle: string;
  dateTimeConnected: string;
}

export interface IUserThread {
  firstName: string;
  lastName: string;
  jobTitle: string;
  dateTimePosted: string;
  visibility: "anyone" | "connections";
}
