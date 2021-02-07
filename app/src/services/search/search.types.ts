import { IThread, ThreadType, ThreadVisibility } from "../thread/thread.type";

export interface ISearchResults {
  query_string: string;
  users?: Array<IPublicUserDetails>;
  public_threads?: Array<IThread>;
  private_threads?: Array<IThread>;
  public_thread_comments?: Array<IThreadCommentDetails>;
  private_thread_comments?: Array<IThreadCommentDetails>;
}

export interface IPublicUserDetails {
  id: string;
  firstName: string;
  lastName: string;
  jobTitle?: string;
  avatar?: Array<{ url: string }>;
}

export interface IThreadDetails {
  id: string;
  postedByUserId: string;
  threadType: ThreadType;
  content: {
    html: string;
    hashTags?: Array<string>;
    attachments?: Array<string>;
  };
  visibility: ThreadVisibility;
  likes?: number;
  shares?: number;
  updatedAt: Date;
}

interface IParentThreadDetails {
  id: string;
  postedByUserId: string;
  visibility: ThreadVisibility;
  content: {
    html: string;
    hashTags: Array<string>;
  };
  createdAt: Date;
  updatedAt: Date;
}

interface IThreadCommentDetails {
  parentThread: IParentThreadDetails | null;
  id: string;
  parentThreadId: string;
  postedByUserId: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}
