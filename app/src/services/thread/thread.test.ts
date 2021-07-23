import { MOCK_THREAD_DATA } from "./mock-data";
import {
  addThreadReaction,
  getThread,
  processThread,
  removeThreadReaction,
} from "./thread";
import axios from "axios";
jest.mock("axios");
describe("getThread tests", () => {
  test("returns error on a non-200 response", async () => {
    axios.mockResolvedValue({ status: 400, data: [] });
    await expect(() => getThread({ threadId: "2222" })).rejects.toThrow();
  });
});

describe("getThreads", () => {
  test("gets threads in correct format", async () => {
    // POIJ
  });
});
describe("addThreadReaction", () => {
  test("function throws", async () => {
    axios.mockResolvedValue({
      status: 400,
      data: undefined,
      statusText: "error",
    });
    await expect(() =>
      addThreadReaction({ threadId: "id", title: "title" })
    ).rejects.toThrow("error");
  });
});

describe("remove thread reaction", () => {
  test("function throws", async () => {
    axios.mockResolvedValue({ status: 400, data: undefined });
    await expect(() =>
      removeThreadReaction({ threadId: "222", threadLikeId: "333" })
    ).rejects.toThrow();
  });
});
describe("processThread tests", () => {
  test("returns processed data", async () => {
    const result = await processThread(MOCK_THREAD_DATA);
    const expectedResult = {
      id: "fakeId",
      content: {
        html: "test",
        hashTags: ["hash"],
        attachments: [],
        updatedAt: "06-06-2021",
        createdAt: "06-06-2021",
      },
      postedByUserId: "123456",
      threadType: 0,
      visibility: 0,
      reactionsCount: {},
      currentUserReactions: {},
      comments: [
        {
          _id: "6780",
          postedByUserId: "Hnsd83",
          content: "some thread content",
          updatedAt: "06-06-2021",
          createdAt: "06-06-2021",
          parentThreadId: "parentThreadId",
          parentThreadVisibility: 0,
          parentThreadOriginatorId: "fakeId",
        },
      ],
      updatedAt: "06-06-2021",
      createdAt: "06-06-2021",
    };
    expect(result).toEqual(expectedResult);
  });
});
