import {
  IThread,
  IThreadComment,
  ThreadType,
  ThreadVisibility,
} from "../thread/thread.type";

export interface ISearchResults {
  query_string: string;
  users?: Array<IPublicUserDetails>;
  public_threads?: Array<IThread>;
  private_threads?: Array<IThread>;
  public_thread_comments?: Array<IThreadCommentWithParent>;
  private_thread_comments?: Array<IThreadCommentWithParent>;
}

export interface IPublicUserDetails {
  id: string;
  firstName: string;
  lastName: string;
  jobTitle?: string;
  avatar?: Array<{ url: string }>;
}

export interface IThreadCommentWithParent extends IThreadComment {
  parentThread: IThread | null;
}
