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
      // do something
      data.onSuccess(req.data);
    } else {
      data.onError(req.statusText);
    }
  } catch (err) {
    data.onError(err);
  }
};

/** Returns true if there are search results, false if not */
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
