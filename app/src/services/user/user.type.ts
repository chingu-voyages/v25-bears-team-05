export interface IUserNameAndJob {
  firstName: string;
  lastName: string;
  jobTitle: string;
}
export default interface IUser extends IUserNameAndJob {
  avatar: string | undefined;
  nOfConnections: number | null;
}

export interface IUserPatch {
  firstName?: string;
  lastName?: string;
  jobTitle?: string;
  avatar?: string | undefined;
}

export interface IUserConnection extends IUser {
  dateTimeConnected: string;
  id: string;
}

export interface IUserThread extends IUser {
  dateTimePosted: string;
  visibility: "anyone" | "connections";
  id: string;
}

export interface IUserAPI extends IUserNameAndJob {
  connections: { [keyof: string]: any };
  avatar: { url: string; _id: string }[];
  connectionOf: { [keyof: string]: any };
  threads: { [keyof: string]: any };
  id: string;
}
