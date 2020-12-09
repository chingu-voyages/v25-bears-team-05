import { ThreadVisibility } from "../../services/thread/thread.type";
import { Avatar } from "../avatar/Avatar.type";

export interface IBasicCardInfo {
  firstName: string;
  lastName: string;
  jobTitle: string;
}

export interface IProfileCardInfo extends IBasicCardInfo {
  nOfConnections: number | null;
}
export interface IConnectionCardInfo extends IBasicCardInfo {
  avatar: Array<Avatar>;
  dateTimeConnected: string;
  isTeamMate: boolean;
}
export interface IThreadCardInfo extends IBasicCardInfo {
  avatar: Array<Avatar>;
  dateTimePosted: string;
  visibility: ThreadVisibility;
  id: string;
  isAConnection: boolean;
}

export default interface IProfileCard {
  profileInfo?: IProfileCardInfo;
  connectionInfo?: IConnectionCardInfo;
  threadInfo?: IThreadCardInfo;
  className?: string;
}
