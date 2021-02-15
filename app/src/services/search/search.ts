import axios from "axios";
import { ISearchResults } from "./search.types";

export const doSearch = async (data: {
  queryString: string;
  onSuccess: (data: any) => void;
  onError: (data: any) => void;
}) => {
  try {
    const req = await axios({
      method: "get",
      url: `/api/search`,
      params: { query: data.queryString },
    });
    if (req.status === 200) {
      data.onSuccess(req.data);
    } else {
      data.onError(req.statusText);
    }
  } catch (err) {
    data.onError(err);
  }
};

/**
 * Helper function that indicates if search results have
 * been returned (true)
 * @param results True if there are results, false if none
 */
export function hasSearchResultContent(results?: ISearchResults): boolean {
  if (results) {
    for (let [key, value] of Object.entries(results)) {
      if (key !== "query_string") {
        if (value.length > 0) {
          return true;
        }
      }
    }
  }
  return false;
}
