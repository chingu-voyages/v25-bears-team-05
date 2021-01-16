export interface IThreadComment {
  id: string;
  postedByUserId: string;
  content: string;
  updatedAt: string;
  createdAt: string;
}

export enum ThreadReactionTypeTitle {
  Star = "star",
  Heart = "heart",
  Processing = "Processing",
}

export interface IThreadReaction {
  postedByUserId: string;
  title: ThreadReactionTypeTitle;
}

export interface IThreadFork {
  threadId: string;
  visibility: ThreadVisibility;
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

export interface IRawResponseThread {
  id: string;
  postedByUserId: string;
  threadType: ThreadType;
  visibility: ThreadVisibility;
  content: {
    html: string;
    hashTags: Array<string>;
    attachments: Array<string>;
  };
  comments: Array<IThreadComment>;
  reactions: { [keyof: string]: IThreadReaction };
  forks: { [userId: string]: IThreadFork };
  isAFork: boolean;
  updatedAt: string;
  createdAt: string;
}

export interface INewThreadData {
  htmlContent: string;
  threadType: ThreadType;
  visibility: ThreadVisibility;
  hashTags: Array<string>;
}

export interface IThreadPatch {
  threadId?: string;
  htmlContent?: string;
  threadType?: ThreadType;
  visibility?: ThreadVisibility;
  hashTags?: Array<string>;
}
