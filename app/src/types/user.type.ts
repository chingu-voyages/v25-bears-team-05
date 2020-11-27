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

export interface IUserConnection extends IUserNameAndJob {
  dateTimeConnected: string;
}

export interface IUserThread extends IUserNameAndJob {
  dateTimePosted: string;
  visibility: "anyone" | "connections";
}

export interface IUserAPI extends IUserNameAndJob {
  connections: { [keyof: string]: any };
  avatar: { url: string; _id: string }[];
}
