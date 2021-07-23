import {
  doLocalSearch,
  queryConnections,
  queryThreadComments,
  queryThreads,
} from "./local-search";
import { mockConnections, mockThreadComments, mockThreads } from "./mock-data";

describe("localSearch tests", () => {
  describe("queryConnections tests", () => {
    test("returns the correct single result", () => {
      const queryString = "Carl";
      const result = queryConnections({
        connections: mockConnections,
        queryString,
      });
      expect(result).toEqual([
        {
          avatar: [{ _id: "1", url: "someUrl" }],
          updatedAt: "2021-05-26T10:53:20.792Z",
          firstName: "Carl",
          isTeamMate: false,
          jobTitle: "Office Administrator",
          lastName: "O'Connor",
          userId: "60ae28a0f650624e4d0f34e3",
        },
      ]);
    });

    test("returns correct multiple result", () => {
      const queryString = "hr";
      const result = queryConnections({
        connections: mockConnections,
        queryString,
      });
      expect(result.length).toBe(2);
      expect(result).toEqual([
        {
          avatar: [{ _id: "3", url: "someUrl" }],
          updatedAt: "2021-05-26T10:53:20.792Z",
          firstName: "John",
          isTeamMate: false,
          jobTitle: "HR consultant",
          lastName: "Dave",
          userId: "60ae33fbf650624e4d0f34e5",
        },
        {
          avatar: [{ _id: "4", url: "someUrl" }],
          updatedAt: "2021-05-26T09:01:20.792Z",
          firstName: "Dave",
          isTeamMate: false,
          jobTitle: "HR consultant",
          lastName: "Carson-Daley",
          userId: "60ae33fbf650624e4d0f34f5",
        },
      ]);
    });

    test("returns empty array due to no result found", () => {
      const queryString = "hvn";
      const result = queryConnections({
        connections: mockConnections,
        queryString,
      });
      expect(result).toEqual([]);
    });
    test("queryString is empty -- expect empty result", () => {
      const queryString = "";
      const result = queryConnections({
        connections: mockConnections,
        queryString,
      });
      expect(result).toEqual([]);
    });
    test("connections is undefined, expect empty", () => {
      const queryString = "bebe";
      const result = queryConnections({ connections: undefined, queryString });
      expect(result).toEqual([]);
    });
  });

  describe("queryThreads", () => {
    test("returns correct single results", () => {
      const queryString = "classic";
      const result = queryThreads({ threads: mockThreads, queryString });
      expect(result).toEqual([
        {
          id: "60aed794f541a54a23ebc6ee",
          "content": {
            "hashTags": [],
            "attachments": [],
            "html":
              "Just like the classic version, the Impossible Whopper comment is made with a flame-grilled patty topped with freshly sliced tomatoes and onions, crisp lettuce, creamy mayonnaise, ketchup, and crunchy pickles on a toasted sesame seed bun.",
            "updatedAt": "2021-05-26T23:19:48.186Z",
            "createdAt": "2021-05-26T23:19:48.186Z",
          },
          "postedByUserId": "60ae28a0f650624e4d0f34e3",
          "threadType": "0",
          "visibility": 0,
          "reactionsCount": {},
          "currentUserReactions": {},
          "comments": [
            {
              "parentThreadVisibility": 0,
              "_id": "60b6368d562e49090e510d72",
              "postedByUserId": "60ae33fbf650624e4d0f34e5",
              "content": "This is a test comment!",
              "attachments": [],
              "parentThreadId": "60aed794f541a54a23ebc6ee",
              "parentThreadOriginatorId": "60ae28a0f650624e4d0f34e3",
              "createdAt": "2021-06-01T13:30:53.897Z",
              "updatedAt": "2021-06-01T13:30:53.897Z",
              "__v": 0,
            },
          ],
          "updatedAt": "2021-06-01T13:30:54.326Z",
          "createdAt": "2021-05-26T23:19:48.186Z",
        },
      ]);
    });
    test("returns correct multiple results", () => {
      const queryString = "bakery";
      const result = queryThreads({ threads: mockThreads, queryString });
      expect(result.length).toBe(2);
      expect(result).toEqual([
        {
          id: "60aed794f541a54a23ebc5ab",
          "content": {
            "hashTags": [],
            "attachments": [],
            "html": "best bakery",
            "updatedAt": "2021-05-26T23:19:48.186Z",
            "createdAt": "2021-05-26T23:19:48.186Z",
          },
          "postedByUserId": "60ae28a0f650624e4d0f34e3",
          "threadType": "0",
          "visibility": 0,
          "reactionsCount": {},
          "currentUserReactions": {},
          "comments": [
            {
              "parentThreadVisibility": 0,
              "_id": "60b6368d562e49090e510d72",
              "postedByUserId": "60ae33fbf650624e4d0f34e5",
              "content": "only ketchup mustard",
              "attachments": [],
              "parentThreadId": "60aed794f541a54a23ebc6ee",
              "parentThreadOriginatorId": "60ae28a0f650624e4d0f34e3",
              "createdAt": "2021-06-01T13:30:53.897Z",
              "updatedAt": "2021-06-01T13:30:53.897Z",
              "__v": 0,
            },
          ],
          "updatedAt": "2021-06-01T13:30:54.326Z",
          "createdAt": "2021-05-26T23:19:48.186Z",
        },
        {
          id: "60aed794f541a54a23ebc5ab",
          "content": {
            "hashTags": [],
            "attachments": [],
            "html": "there was only 1 bakery",
            "updatedAt": "2021-05-26T23:19:48.186Z",
            "createdAt": "2021-05-26T23:19:48.186Z",
          },
          "postedByUserId": "60ae28a0f650624e4d0f34e3",
          "threadType": "0",
          "visibility": 0,
          "reactionsCount": {},
          "currentUserReactions": {},
          "comments": [
            {
              "parentThreadVisibility": 0,
              "_id": "60b6368d562e49090e510d72",
              "postedByUserId": "60ae33fbf650624e4d0f34e5",
              "content": "only ketchup mustard",
              "attachments": [],
              "parentThreadId": "60aed794f541a54a23ebc6ee",
              "parentThreadOriginatorId": "60ae28a0f650624e4d0f34e3",
              "createdAt": "2021-06-01T13:30:53.897Z",
              "updatedAt": "2021-06-01T13:30:53.897Z",
              "__v": 0,
            },
          ],
          "updatedAt": "2021-06-01T13:30:54.326Z",
          "createdAt": "2021-05-26T23:19:48.186Z",
        },
      ]);
    });
    test("query string is empty string", () => {
      const queryString = "";
      const result = queryThreads({ threads: mockThreads, queryString });
      expect(result).toEqual([]);
    });
    test("threads no result", () => {
      const queryString = "x9someo";
      const result = queryThreads({ threads: mockThreads, queryString });
      expect(result).toEqual([]);
    });
  });
  describe("thread comments", () => {
    test("gets single result", () => {
      const queryString = "comment!";
      const result = queryThreadComments({
        threads: mockThreadComments,
        queryString,
      });
      expect(result).toEqual([
        {
          _id: "90b6368d562e51090e510d63",
          content: "This is a test comment!",
          parentThreadId: "60aed794f541a54a23ebc6ee",
          parentThreadOriginatorId: "60ae28a0f650624e4d0f34e3",
          postedByUserId: "60ae33fbf650624e4d0f34e5",
          updatedAt: "2021-06-01T13:30:53.897Z",
        },
      ]);
    });

    test("gets multiple results", () => {
      const queryString = "test";
      const result = queryThreadComments({
        threads: mockThreadComments,
        queryString,
      });
      expect(result).toEqual([
        {
          _id: "90b6368d562e51090e510d63",
          content: "This is a test comment!",
          parentThreadId: "60aed794f541a54a23ebc6ee",
          parentThreadOriginatorId: "60ae28a0f650624e4d0f34e3",
          postedByUserId: "60ae33fbf650624e4d0f34e5",
          updatedAt: "2021-06-01T13:30:53.897Z",
        },
        {
          "_id": "21c6368d562e51180e511e32",
          "content": "because home test",
          "parentThreadId": "60aed794f541a54a23ebc6ee",
          "parentThreadOriginatorId": "60ae28a0f650624e4d0f34e3",
          "postedByUserId": "60ae33fbf650624e4d0f34e5",
          "updatedAt": "2021-06-01T13:30:53.897Z",
        },
      ]);
    });
    test("gets empty result", () => {
      const queryString = "";
      const result = queryThreadComments({
        threads: mockThreadComments,
        queryString,
      });
      expect(result).toEqual([]);
    });
  });
});
