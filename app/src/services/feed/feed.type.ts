import { IThreadCardInfo } from "../../components/profileCard/profileCard.type";
import { IThreadReferral, IThreadDataProcessed } from "../thread/thread.type";

export interface IThreadFeed {
  threadData: IThreadDataProcessed;
  profileData: IThreadCardInfo;
  referral?: IThreadReferral;
  className?: string;
}
