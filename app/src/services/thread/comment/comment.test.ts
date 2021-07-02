import { addComment, deleteComment, getComments } from "./comment";
import axios from "axios";

jest.mock("axios");
describe("comment tests", () => {
  describe("add comment", () => {
    test("add comment function throws when there is no response", async () => {
      axios.mockResolvedValue({ data: undefined });
      await expect(() =>
        addComment({ threadId: "123456", data: { content: "some content " } })
      ).rejects.toThrow();
    });
  });
  describe("get comments", () => {
    test("getComments throws when data is empty", async () => {
      axios.mockResolvedValue({ data: undefined });
      await expect(() =>
        getComments({ commentIds: ["a", "b", "c"] })
      ).rejects.toThrow();
    });
  });
  describe("delete comments", () => {
    test("getComments throws when data is empty", async () => {
      axios.mockResolvedValue({ data: undefined });
      await expect(() => deleteComment({ commentId: "a" })).rejects.toThrow();
    });
  });
});
