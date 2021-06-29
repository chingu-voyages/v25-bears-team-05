export const mockUserDataArray = [
  {
    status: 200,
    data: {
      firstName: "Abbaca",
      lastName: "FirstUser",
      jobTitle: "testUser0JobTitle",
      avatar: [{ _id: "60da3e037e931d40e0cd8cdd", url: "testUser0AvatarUrl" }],
      connections: {},
      connectionRequests: {},
      threads: { started: {}, commented: {}, liked: {}, shared: {} },
      id: "60da3e037e931d40e0cd8ede",
    },
  },
  {
    status: 200,
    data: {
      firstName: "Arny",
      lastName: "SecondUser",
      jobTitle: "Some other title",
      avatar: [
        { _id: "60da3e037e931d40e0cd8c11", url: "http://ping.com/kiki.bmp" },
      ],
      connections: {},
      connectionRequests: {},
      threads: { started: {}, commented: {}, liked: {}, shared: {} },
      id: "60da3e037e931d40e0cd8111",
    },
  },
  {
    status: 200,
    data: {
      firstName: "Thirdy",
      lastName: "ThirdUser",
      jobTitle: "Recruiter",
      avatar: [
        { _id: "60da3e037e931d40e0cd8c22", url: "http://ping.com/oranges.jpg" },
      ],
      connections: {},
      connectionRequests: {},
      threads: { started: {}, commented: {}, liked: {}, shared: {} },
      id: "60da3e037e931d40e0cd9222",
    },
  },
];

export const mockExpectedUserResults = {
  users: {
    "60da3e037e931d40e0cd8ede": {
      firstName: "Abbaca",
      lastName: "FirstUser",
      jobTitle: "testUser0JobTitle",
      avatar: [{ _id: "60da3e037e931d40e0cd8cdd", url: "testUser0AvatarUrl" }],
      connections: {},
      connectionRequests: {},
      threads: { started: {}, commented: {}, liked: {}, shared: {} },
      id: "60da3e037e931d40e0cd8ede",
      nOfConnections: 0,
    },
    "60da3e037e931d40e0cd8111": {
      firstName: "Arny",
      lastName: "SecondUser",
      jobTitle: "Some other title",
      avatar: [
        { _id: "60da3e037e931d40e0cd8c11", url: "http://ping.com/kiki.bmp" },
      ],
      connections: {},
      connectionRequests: {},
      threads: { started: {}, commented: {}, liked: {}, shared: {} },
      id: "60da3e037e931d40e0cd8111",
      nOfConnections: 0,
    },
    "60da3e037e931d40e0cd9222": {
      firstName: "Thirdy",
      lastName: "ThirdUser",
      jobTitle: "Recruiter",
      avatar: [
        { _id: "60da3e037e931d40e0cd8c22", url: "http://ping.com/oranges.jpg" },
      ],
      connections: {},
      connectionRequests: {},
      threads: { started: {}, commented: {}, liked: {}, shared: {} },
      id: "60da3e037e931d40e0cd9222",
      nOfConnections: 0,
    },
  },
  currentUserId: undefined,
};

export const mockExpectedUserResultsMe = {
  users: {
    "60da3e037e931d40e0cd8ede": {
      firstName: "Abbaca",
      lastName: "FirstUser",
      jobTitle: "testUser0JobTitle",
      avatar: [{ _id: "60da3e037e931d40e0cd8cdd", url: "testUser0AvatarUrl" }],
      connections: {},
      connectionRequests: {},
      threads: { started: {}, commented: {}, liked: {}, shared: {} },
      id: "60da3e037e931d40e0cd8ede",
      nOfConnections: 0,
    },
    "60da3e037e931d40e0cd8111": {
      firstName: "Arny",
      lastName: "SecondUser",
      jobTitle: "Some other title",
      avatar: [
        { _id: "60da3e037e931d40e0cd8c11", url: "http://ping.com/kiki.bmp" },
      ],
      connections: {},
      connectionRequests: {},
      threads: { started: {}, commented: {}, liked: {}, shared: {} },
      id: "60da3e037e931d40e0cd8111",
      nOfConnections: 0,
    },
    "60da3e037e931d40e0cd9222": {
      firstName: "Thirdy",
      lastName: "ThirdUser",
      jobTitle: "Recruiter",
      avatar: [
        { _id: "60da3e037e931d40e0cd8c22", url: "http://ping.com/oranges.jpg" },
      ],
      connections: {},
      connectionRequests: {},
      threads: { started: {}, commented: {}, liked: {}, shared: {} },
      id: "60da3e037e931d40e0cd9222",
      nOfConnections: 0,
    },
    "60da3e037e931d40e0cd8cdc": {
      firstName: "Ian",
      lastName: "Me",
      jobTitle: "testUser0JobTitle",
      avatar: [{ _id: "60da3e037e931d40e0cd8cdd", url: "testUser0AvatarUrl" }],
      "nOfConnections": 0,
      connections: {},
      connectionRequests: {},
      threads: { started: {}, commented: {}, liked: {}, shared: {} },
      id: "60da3e037e931d40e0cd8cdc",
    },
  },
  currentUserId: "60da3e037e931d40e0cd8cdc",
};
