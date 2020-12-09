import { IThreadCardInfo } from "../../components/profileCard/profileCard.type";
import { IThreadReferral, IThreadDataProcessed, IThread } from "../thread/thread.type";
import { IUserConnection } from "../user/user.type";

export interface IProcessedThreadFeed {
  threadData: IThreadDataProcessed;
  profileData: IThreadCardInfo;
  referral?: IThreadReferral;
  className?: string;
}

export interface IFeedRawResponse {
    connectionThreads: Array<IThread>;
    connectionSuggestions: Array<IUserConnection>;
    publicThreads: Array<IThread>;
}

export interface IFeedProcessedResponse {
  connectionThreads: Array<IProcessedThreadFeed>;
  connectionSuggestions: Array<IUserConnection>;
  publicThreads: Array<IProcessedThreadFeed>;
}

export interface IThreadProps {
  threadData: IThreadDataProcessed;
  profileData: IThreadCardInfo;
  referral?: IThreadReferral; 
  className?: string;
}

export interface IFeedItemsProps {
  suggestion?: IThreadCardInfo; 
  thread?: IThreadProps
}