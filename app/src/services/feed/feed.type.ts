import { ICardInfo } from "../../components/profileCard/profileCard.type";
import {
  IThreadReferral,
  IThreadDataProcessed,
  IThread,
} from "../thread/thread.type";
import { IUserConnection } from "../user/user.type";

export interface IProcessedThreadFeed {
  threadData?: IThreadDataProcessed;
  referral?: IThreadReferral;
  className?: string;
}

export interface IProcessedSuggestionFeed {
  profileData: ICardInfo;
  referral?: IThreadReferral;
}

export interface IFeedRawResponse {
  connectionThreads: Array<IThread>;
  connectionSuggestions: Array<IUserConnection>;
  publicThreads: Array<IThread>;
}

export interface IFeedProcessedResponse {
  connectionThreads: Array<{ thread: IProcessedThreadFeed }>;
  connectionSuggestions: Array<{ suggestion: IProcessedSuggestionFeed }>;
  publicThreads: Array<{ thread: IProcessedThreadFeed }>;
}

export interface IThreadProps {
  threadData: IThreadDataProcessed;
  referral?: IThreadReferral;
  className?: string;
}

export interface IFeedItemsProps {
  suggestion?: ICardInfo;
  thread?: IThreadProps;
}
