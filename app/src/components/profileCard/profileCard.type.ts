import { IStoreStateThreadData } from "../../redux/store.type";
import { IThreadComment } from "../../services/thread/thread.type";
import { IUser, IUserConnection } from "../../services/user/user.type";

export default interface IProfileCard {
  type: "profile" | "connection" | "thread" | "comment" | "home-page";
  userData: IUser;
  className?: string;
  threadData?: IStoreStateThreadData;
  connectionData?: IUserConnection;
  commentData?: IThreadComment;
}
