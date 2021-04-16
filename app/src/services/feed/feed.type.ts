import { IThread } from "../thread/thread.type";
import { IUserConnection } from "../user/user.type";

export type TFeedDocumentType =
  | "thread"
  | "user"
  | "comment"
  | "connection"
  | "reaction";
export interface IFeedItem {
  documentId: string;
  documentType: TFeedDocumentType;
  documentUpdatedAt: Date;
}

export interface IFeedRawResponse {
  connectionThreads: Array<IThread>;
  connectionSuggestions: Array<IUserConnection>;
  publicThreads: Array<IThread>;
}

export interface IBucket {
  collection: {
    [priorty: number]: Array<IFeedItem>;
  };
  latestUpdate: Date;
  next: () => string;
}

export interface IFeed {
  [latestThreadTimeAndUUID: string]: IBucket;
}

export interface IFeedProcessedResponse {
  documents: IThread | {};
  bucket: IFeed;
}
