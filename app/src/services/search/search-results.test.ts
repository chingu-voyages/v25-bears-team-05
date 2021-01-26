import { hasSearchResultContent } from "./search";
import { ISearchResults } from "./search.types";

describe("search results tests", () => {
  test("returns false when the data is empty", () => {
    const sampleSearchResult: ISearchResults = {
      query_string: "There is something",
      private_thread_comments: [],
      private_threads: [],
      public_thread_comments: [],
      public_threads: [],
      users: [],
    };
    expect(hasSearchResultContent(sampleSearchResult)).toBe(false);
  });
  test("returns true when there are results", () => {
    const sampleSearchResult: ISearchResults = {
      query_string: "Some User value",
      private_thread_comments: [],
      private_threads: [],
      public_thread_comments: [],
      public_threads: [],
      users: [{ id: "1234567890", firstName: "Test", lastName: "User" }],
    };
    expect(hasSearchResultContent(sampleSearchResult)).toBe(true);
  });
});
