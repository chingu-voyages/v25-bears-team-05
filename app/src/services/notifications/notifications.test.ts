import { getNotifications, markNotificationAsRead } from "./notifications";
import axios from "axios";
jest.mock("axios");
describe("services -> notifications", () => {
  it("gets sorted notifications", async () => {
    axios.mockResolvedValue({
      data: [
        {
          _id: "1",
          read: false,
          type: "someType",
          message: "someMessage",
          link: "somelink",
          originatorId: "originatorId",
          targetId: "targetId",
          createdAt: "2021-05-26T23:19:48.186Z",
        },
        {
          _id: "2",
          read: false,
          type: "someType2",
          message: "someMessage2",
          link: "somelink",
          originatorId: "originatorId",
          targetId: "targetId",
          createdAt: "2021-05-26T23:19:55.186Z",
        },
      ],
    });
    const results = await getNotifications();
    expect(results).toEqual([
      {
        _id: "2",
        read: false,
        type: "someType2",
        message: "someMessage2",
        link: "somelink",
        originatorId: "originatorId",
        targetId: "targetId",
        createdAt: "2021-05-26T23:19:55.186Z",
      },
      {
        _id: "1",
        read: false,
        type: "someType",
        message: "someMessage",
        link: "somelink",
        originatorId: "originatorId",
        targetId: "targetId",
        createdAt: "2021-05-26T23:19:48.186Z",
      },
    ]);
  });
});
