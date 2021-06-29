import axios from "axios";
import { getUser, getUsers, updateUser } from "./user";
import {
  mockExpectedUserResults,
  mockExpectedUserResultsMe,
  mockUserDataArray,
} from "./mock-user-data";
import { IUserPatchRequest } from "./user.type";
jest.mock("axios");
const User404 = {
  firstName: "User does",
  lastName: "not exist!",
  jobTitle: "",
  avatar: [],
  connections: {},
  threads: {},
};
describe("user services tests", () => {
  test("getUser method transforms data properly", async () => {
    axios.mockResolvedValue({
      status: 200,
      data: {
        firstName: "testUser0FirstName",
        lastName: "testUser0LastName",
        jobTitle: "testUser0JobTitle",
        avatar: [
          { _id: "60da3e037e931d40e0cd8cdd", url: "testUser0AvatarUrl" },
        ],
        connections: {},
        connectionRequests: {},
        threads: { started: {}, commented: {}, liked: {}, shared: {} },
        id: "60da3e037e931d40e0cd8cdc",
      },
    });
    const results = await getUser({ userId: "60da3e037e931d40e0cd8cdc" });
    expect(results).toEqual({
      firstName: "testUser0FirstName",
      lastName: "testUser0LastName",
      jobTitle: "testUser0JobTitle",
      avatar: [{ _id: "60da3e037e931d40e0cd8cdd", url: "testUser0AvatarUrl" }],
      connections: {},
      connectionRequests: {},
      threads: { started: {}, commented: {}, liked: {}, shared: {} },
      id: "60da3e037e931d40e0cd8cdc",
      nOfConnections: 0,
    });
  });
  test("getUser undefined data causes function to throw", async () => {
    axios.mockResolvedValue({
      status: 200,
      data: undefined,
    });
    await expect(() =>
      getUser({ userId: "60da3e037e931d40e0cd8cdc" })
    ).rejects.toThrow();
  });

  test("getUser received a 404 error - should transform output correctly", async () => {
    axios.mockImplementation(() =>
      Promise.reject({
        response: {
          status: 404,
        },
      })
    );
    const res = await getUser({ userId: "60da3e037e931d40e0cd8cdc" });
    expect(res).toEqual({
      id: "60da3e037e931d40e0cd8cdc",
      ...User404,
    });
  });
  test("getUser received some other error response - should throw", async () => {
    axios.mockImplementation(() =>
      Promise.resolve({
        data: undefined,
        response: {
          status: 404,
        },
      })
    );
    await expect(
      getUser({ userId: "60da3e037e931d40e0cd8cdc" })
    ).rejects.toThrowError("Cannot read property 'connections' of undefined");
  });
});

describe("getUsers tests", () => {
  test(`getUsers function returns with correct result
  id 'me' is not present in the userIds`, async () => {
    let count = 0;
    axios.mockImplementation((url: string) => {
      switch (url) {
        case "/api/users/me":
          return Promise.resolve({
            status: 200,
            data: {
              firstName: "Ian",
              lastName: "Me",
              jobTitle: "testUser0JobTitle",
              avatar: [
                { _id: "60da3e037e931d40e0cd8cdd", url: "testUser0AvatarUrl" },
              ],
              connections: {},
              connectionRequests: {},
              threads: { started: {}, commented: {}, liked: {}, shared: {} },
              id: "60da3e037e931d40e0cd8cdc",
            },
          });
        default:
          return Promise.resolve(mockUserDataArray[count++]);
      }
    });

    const userIds = [
      "60da3e037e931d40e0cd8ede",
      "60da3e037e931d40e0cd8111",
      "60da3e037e931d40e0cd9222",
    ];
    const res = await getUsers({ userIds });
    expect(res).toEqual(mockExpectedUserResults);
  });
  test(`getUsers function returns with correct result
  with id 'me' in the array`, async () => {
    let count = 0;
    axios.mockImplementation((url: string) => {
      switch (url) {
        case "/api/users/me":
          return Promise.resolve({
            status: 200,
            data: {
              firstName: "Ian",
              lastName: "Me",
              jobTitle: "testUser0JobTitle",
              avatar: [
                { _id: "60da3e037e931d40e0cd8cdd", url: "testUser0AvatarUrl" },
              ],
              connections: {},
              connectionRequests: {},
              threads: { started: {}, commented: {}, liked: {}, shared: {} },
              id: "60da3e037e931d40e0cd8cdc",
            },
          });
        default:
          return Promise.resolve(mockUserDataArray[count++]);
      }
    });

    const userIds = [
      "me",
      "60da3e037e931d40e0cd8ede",
      "60da3e037e931d40e0cd8111",
      "60da3e037e931d40e0cd9222",
    ];
    const res = await getUsers({ userIds });
    expect(res).toEqual(mockExpectedUserResultsMe);
  });
});

describe("updateUser", () => {
  test("function returns correct data", async () => {
    axios.mockResolvedValue({
      status: 200,
      data: {
        firstName: "updatedFirstName",
        jobTitle: "Engineer",
      },
    });
    const patchRequest: IUserPatchRequest = {
      firstName: "updatedFirstName",
      jobTitle: "Engineer",
    };
    const res = await updateUser({ data: patchRequest });
    expect(res).toEqual(patchRequest);
  });
  test("function throws", async () => {
    axios.mockResolvedValue({
      status: 400,
      statusText: "Bad request",
      data: undefined,
    });
    const patchRequest: IUserPatchRequest = {
      firstName: "updatedFirstName",
      jobTitle: "Engineer",
    };
    await expect(updateUser({ data: patchRequest })).rejects.toThrow(
      "Bad request"
    );
    // const res = await updateUser({ data: patchRequest})
    // console.log(res);
    // expect(res).toEqual(patchRequest);
  });
});
