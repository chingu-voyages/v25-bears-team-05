import axios from "axios";
import { ISearchResult } from "./search.types";

export const doSearch = async (data: { queryString: string }) => {
  const req = await axios({
    method: "get",
    url: `/api/search`,
    params: { query: data.queryString },
  });
  if (req.status === 200) {
    const {
      private_thread_comments,
      private_threads,
      public_thread_comments,
      public_threads,
      query_string,
      users,
    } = req.data;
    return {
      privateThreadComments: private_thread_comments,
      privateThreads: private_threads,
      publicThreadComments: public_thread_comments,
      publicThreads: public_threads,
      queryString: query_string,
      users,
    };
  } else {
    throw req.statusText;
  }
};

/**
 * Helper function that indicates if search results have
 * been returned (true)
 * @param results True if there are results, false if none
 */
export function hasSearchResultContent(result?: ISearchResult): boolean {
  if (result) {
    for (let value of Object.values(result)) {
      if (value.length > 0) {
        return true;
      }
    }
  }
  return false;
}
