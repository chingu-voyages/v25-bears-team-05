import IUser, {
  IUserConnection,
  IUserThread,
} from "../../services/user/user.type";

export default interface IProfileCard {
  profileInfo?: IUser;
  connectionInfo?: IUserConnection;
  threadInfo?: IUserThread;
  className?: string;
}
