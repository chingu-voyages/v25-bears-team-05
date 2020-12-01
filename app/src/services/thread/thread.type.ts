export interface IAttachmentType {
  url: string;
}

export interface IThreadComment {
  postedByUserId: string;
  content: string;
  attachments?: Array<IAttachmentType>;
}

export enum ThreadLikeTypeTitle {
  Like = "like",
  Celebrate = "celebrate",
  Love = "love",
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
}
