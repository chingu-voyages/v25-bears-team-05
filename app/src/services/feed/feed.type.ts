export interface IFeedItem {
  documentId: string;
  documentType: "thread" | "user" | "comment" | "connection" | "reaction";
  documentUpdatedAt: Date;
  action:
    | "posted"
    | "updated"
    | "commented"
    | "updated their comment"
    | "reacted to"
    | "connected with"
    | "joined"
    | "no action defined";
  byUserId: string;
  propertiesChanged?: {
    [propertyName: string]: any;
  };
}
