import { IThread, IThreadComment } from "../thread/thread.type";

export interface ISearchResults {
  [query: string]: ISearchResult;
}

export interface ISearchResult {
  [keyof: string]: Array<{ id: string }>;
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
