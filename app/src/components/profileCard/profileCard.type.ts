import { ThreadVisibility } from "../../services/thread/thread.type";
import { IUsersStore } from "../../services/user/user.type";
import { Avatar } from "../avatar/Avatar.type";

export interface IBasicCardInfo {
  firstName: string;
  lastName: string;
  jobTitle: string;
}
export interface ICardInfo extends IBasicCardInfo {
  id: string;
  nOfConnections?: number | null;
  avatar?: Array<Avatar>;
  dateTimePosted?: string;
  visibility?: ThreadVisibility;
  isAConnection?: boolean;
  dateTimeConnected?: string;
  isTeamMate?: boolean;
}

export default interface IProfileCard {
  type: "profile" | "connection" | "thread" | "comment" | "home-page";
  users?: IUsersStore;
  userId: string;
  className?: string;
  threadData?: any;
}
