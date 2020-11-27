import IUser, { IUserConnection, IUserThread } from "../../types/user.type";

export default interface IProfileCard {
  profileInfo?: IUser;
  connectionInfo?: IUserConnection;
  threadInfo?: IUserThread;
  className?: string;
}
