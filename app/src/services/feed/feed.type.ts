import { IRawResponseThread } from "../thread/thread.type";
import { IUser } from "../user/user.type";

export interface IFeedReferral {
  type: string;
  reason: string;
}

export interface IRawResponseBucket {
  threads?: {
    [threadId: string]: {
      threadData: IRawResponseThread;
      refferal: IFeedReferral;
    };
  };
  users?: {
    [userId: string]: {
      userData: IUser;
      refferal: IFeedReferral;
    };
  };
}

export interface IRawResponseFeed {
  [dateTime: string]: IRawResponseBucket;
}
