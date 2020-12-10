export interface IAttachmentType {
  url: string;
}

export interface IThreadComment {
  postedByUserId: string;
  content: string;
  attachments?: Array<IAttachmentType>;
}

export enum ThreadLikeTypeTitle {
  Star = "star",
  Heart = "heart",
  Processing = "Processing",
}

export interface IThreadLike {
  postedByUserId: string;
  threadLikeType: {
    emoji: string;
    title: ThreadLikeTypeTitle;
  };
}

export interface IThreadShare {
  postedByUserId: string;
  threadShareType: string;
  visibility: ThreadVisibility;
  content: {
    thread: IThread;
    html: string;
    hashTags: Array<string>;
    attachments: Array<string>;
  };
  comments: { [keyof: string]: IThreadComment };
  likes: { [keyof: string]: IThreadLike };
  shares: { [keyof: string]: IThreadShare };
}

export enum ThreadType {
  Post = 0,
  Photo = 1,
  Job = 2,
  Article = 3,
}

export enum ThreadVisibility {
  Anyone = 0,
  Connections = 1,
}

export interface IThread {
  _id: string;
  postedByUserId: string;
  threadType: ThreadType;
  visibility: ThreadVisibility;
  content: {
    html: string;
    hashTags: Array<string>;
    attachments: Array<string>;
  };
  comments: { [keyof: string]: IThreadComment };
  likes: { [keyof: string]: IThreadLike };
  shares: { [keyof: string]: IThreadShare };
  updatedAt: string;
}

export interface INewThreadData {
  htmlContent: string;
  threadType: ThreadType;
  visibility: ThreadVisibility;
  hashTags: Array<string>;
}

export interface IThreadReferral {
  userId?: string;
  userName?: string;
  reason: string;
}

export interface IThreadDataProcessed {
  id: string;
  content: {
    html: string;
    hashTags?: Array<string>;
    attachments?: Array<string>;
  };
  postedByUserId: string;
  threadType: ThreadType;
  visibility: ThreadVisibility;
  reactionsCount: {
    [reactionType: string]: number;
  };
  currentUserReactions: {
    [reactionType: string]: boolean;
  };
  comments: { [keyof: string]: IThreadComment };
}
