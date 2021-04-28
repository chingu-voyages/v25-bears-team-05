export interface IAttachmentType {
  url: string;
}

export interface IThreadComment {
  id?: string;
  _id: string;
  postedByUserId: string;
  content: string;
  updatedAt: string;
  createdAt: string;
  parentThreadId: string;
  parentThreadVisibility: ThreadVisibility;
  parentThreadOriginatorId: string;
}

export enum ThreadLikeTypeTitle {
  Star = "star",
  Heart = "heart",
  Processing = "Processing",
}

export interface IThreadLike {
  postedByUserId: string;
  title: ThreadLikeTypeTitle;
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
  comments: Array<IThreadComment>;
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
  id?: string;
  _id: string;
  postedByUserId: string;
  threadType: ThreadType;
  visibility: ThreadVisibility;
  content: {
    html: string;
    hashTags: Array<string>;
    attachments: Array<string>;
    updatedAt: string;
    createdAt: string;
  };
  comments: Array<IThreadComment>;
  likes: { [keyof: string]: IThreadLike };
  shares: { [keyof: string]: IThreadShare };
  updatedAt: string;
  createdAt: string;
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
    updatedAt: string;
    createdAt: string;
  };
  postedByUserId: string;
  threadType: ThreadType;
  visibility: ThreadVisibility;
  reactionsCount: {
    [reactionType: string]: number;
  };
  currentUserReactions: {
    [reactionType: string]: string | false;
  };
  comments: Array<IThreadComment>;
  updatedAt: string;
  createdAt: string;
}
