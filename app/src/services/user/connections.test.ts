import axios from "axios";
import {
  addConnection,
  cancelAddConnectionRequest,
  declineConnectionRequest,
  getConnections,
  removeConnection,
  requestAddConnection,
} from "./connections";
import {
  mockConnectionData,
  mockExpectedConnectionData,
} from "./mock-user-data";

jest.mock("axios");

describe("connection tests", () => {
  test("getConnections returns connections", async () => {
    axios.mockImplementation(() => {
      return Promise.resolve({
        status: 200,
        data: mockConnectionData,
      });
    });
    const successCallBack = (data: any) => {
      expect(data).toEqual(mockExpectedConnectionData);
    };

    await getConnections({
      userId: "60dca0b5de9bc0717805730A",
      offset: 0,
      limit: 0,
      onSuccess: successCallBack,
      onError: (msg: any) => console.log(msg),
    });
  });
  test("getConnections error is triggered", async () => {
    axios.mockImplementation(() => {
      return Promise.reject({
        status: 404,
        data: undefined,
        message: "error message from API",
      });
    });
    const errorCallBack = (message: string) => {
      expect(message).toBe(
        "Unable to get your connections from server, please try again later"
      );
    };

    await getConnections({
      userId: "60dca0b5de9bc0717805730A",
      offset: 0,
      limit: 0,
      onSuccess: () => undefined,
      onError: errorCallBack,
    });
  });
});

describe("removeConnection tests", () => {
  test("remove connection returns the data", async () => {
    axios.mockImplementation(() => {
      return Promise.resolve({
        status: 200,
        data: {
          "60dca0b5de9bc07178057316": {
            firstName: "testUser3FirstName",
            lastName: "testUser3LastName",
            jobTitle: "testUser3JobTitle",
            avatar: [{ url: "http://example.com/defaultAvatar316.bmp" }],
            userId: "60dca0b5de9bc07178057316",
            dateTimeConnected: "2021-06-30T16:49:57.022Z",
            isTeamMate: false,
          },
          "60dca0b5de9bc07178057318": {
            firstName: "testUser4FirstName",
            lastName: "testUser4LastName",
            jobTitle: "testUser4JobTitle",
            avatar: [
              { url: "http://example.com/defaultAvatar318.bmp" },
              { url: "http://example.com/defaultAvatar318-b.bmp" },
            ],
            userId: "60dca0b5de9bc07178057318",
            dateTimeConnected: "2021-06-30T16:49:57.023Z",
            isTeamMate: false,
          },
        },
      });
    });
    const res = await removeConnection({ targetUserId: "myid" });
    expect(res).toBeDefined();
  });
});

describe("addConnection tests", () => {
  test("add connection returns data", async () => {
    axios.mockImplementation(() => {
      return Promise.resolve({
        status: 200,
        data: {
          "60dca0b5de9bc07178057316": {
            firstName: "testUser3FirstName",
            lastName: "testUser3LastName",
            jobTitle: "testUser3JobTitle",
            avatar: [{ url: "http://example.com/defaultAvatar316.bmp" }],
            userId: "60dca0b5de9bc07178057316",
            dateTimeConnected: "2021-06-30T16:49:57.022Z",
            isTeamMate: false,
          },
          "60dca0b5de9bc07178057318": {
            firstName: "testUser4FirstName",
            lastName: "testUser4LastName",
            jobTitle: "testUser4JobTitle",
            avatar: [
              { url: "http://example.com/defaultAvatar318.bmp" },
              { url: "http://example.com/defaultAvatar318-b.bmp" },
            ],
            userId: "60dca0b5de9bc07178057318",
            dateTimeConnected: "2021-06-30T16:49:57.023Z",
            isTeamMate: false,
          },
        },
      });
    });
    const res = await addConnection({
      connectionId: "myid",
      connectionRequestDocumentId: "some id",
    });
    expect(res).toBeDefined();
  });
});

describe("requestAddConnection tests", () => {
  test("requestAddconnection returns data", async () => {
    axios.mockImplementation(() => {
      return Promise.resolve({
        status: 200,
        data: {
          "60dca0b5de9bc07178057316": {
            firstName: "testUser3FirstName",
            lastName: "testUser3LastName",
            jobTitle: "testUser3JobTitle",
            avatar: [{ url: "http://example.com/defaultAvatar316.bmp" }],
            userId: "60dca0b5de9bc07178057316",
            dateTimeConnected: "2021-06-30T16:49:57.022Z",
            isTeamMate: false,
          },
          "60dca0b5de9bc07178057318": {
            firstName: "testUser4FirstName",
            lastName: "testUser4LastName",
            jobTitle: "testUser4JobTitle",
            avatar: [
              { url: "http://example.com/defaultAvatar318.bmp" },
              { url: "http://example.com/defaultAvatar318-b.bmp" },
            ],
            userId: "60dca0b5de9bc07178057318",
            dateTimeConnected: "2021-06-30T16:49:57.023Z",
            isTeamMate: false,
          },
        },
      });
    });
    const res = await requestAddConnection({
      connectionId: "myid",
      isTeamMate: false,
    });
    expect(res).toBeDefined();
  });
});

describe("cancelAddConnectionRequest test", () => {
  test("function returns data", async () => {
    axios.mockImplementation(() => {
      return Promise.resolve({
        status: 200,
        data: {
          "60dca0b5de9bc07178057316": {
            firstName: "testUser3FirstName",
            lastName: "testUser3LastName",
            jobTitle: "testUser3JobTitle",
            avatar: [{ url: "http://example.com/defaultAvatar316.bmp" }],
            userId: "60dca0b5de9bc07178057316",
            dateTimeConnected: "2021-06-30T16:49:57.022Z",
            isTeamMate: false,
          },
          "60dca0b5de9bc07178057318": {
            firstName: "testUser4FirstName",
            lastName: "testUser4LastName",
            jobTitle: "testUser4JobTitle",
            avatar: [
              { url: "http://example.com/defaultAvatar318.bmp" },
              { url: "http://example.com/defaultAvatar318-b.bmp" },
            ],
            userId: "60dca0b5de9bc07178057318",
            dateTimeConnected: "2021-06-30T16:49:57.023Z",
            isTeamMate: false,
          },
        },
      });
    });
    const res = await cancelAddConnectionRequest({ connectionId: "myid" });
    expect(res).toBeDefined();
  });
});

describe("declineConnectionRequest test", () => {
  test("function returns data", async () => {
    axios.mockImplementation(() => {
      return Promise.resolve({
        status: 200,
        data: {
          "60dca0b5de9bc07178057316": {
            firstName: "testUser3FirstName",
            lastName: "testUser3LastName",
            jobTitle: "testUser3JobTitle",
            avatar: [{ url: "http://example.com/defaultAvatar316.bmp" }],
            userId: "60dca0b5de9bc07178057316",
            dateTimeConnected: "2021-06-30T16:49:57.022Z",
            isTeamMate: false,
          },
          "60dca0b5de9bc07178057318": {
            firstName: "testUser4FirstName",
            lastName: "testUser4LastName",
            jobTitle: "testUser4JobTitle",
            avatar: [
              { url: "http://example.com/defaultAvatar318.bmp" },
              { url: "http://example.com/defaultAvatar318-b.bmp" },
            ],
            userId: "60dca0b5de9bc07178057318",
            dateTimeConnected: "2021-06-30T16:49:57.023Z",
            isTeamMate: false,
          },
        },
      });
    });
    const res = await declineConnectionRequest({ requestorId: "myid" });
    expect(res).toBeDefined();
  });
});
