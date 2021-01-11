import { ICardInfo } from "../../components/profileCard/profileCard.type";
import {
  IThreadReferral,
  IThreadDataProcessed,
  IThread,
} from "../thread/thread.type";
import { IUserProcessed } from "../user/user.type";

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
  connectionSuggestions: Array<IUserProcessed>;
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
  suggestion?: IUserProcessed;
  thread?: IThreadProps;
}
