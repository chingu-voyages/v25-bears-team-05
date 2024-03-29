export const mockConnections = {
  "60ae28a0f650624e4d0f34e3": {
    avatar: [{ _id: "1", url: "someUrl" }],
    updatedAt: "2021-05-26T10:53:20.792Z",
    firstName: "Carl",
    isTeamMate: false,
    jobTitle: "Office Administrator",
    lastName: "O'Connor",
    userId: "60ae28a0f650624e4d0f34e3",
  },
  "60afee4f605e4156dd1a5245": {
    avatar: [{ _id: "2", url: "someUrl" }],
    updatedAt: "2021-05-26T10:53:20.792Z",
    firstName: "Mary",
    isTeamMate: false,
    jobTitle: "Dave Developer",
    lastName: "Acosta",
    userId: "60afee4f605e4156dd1a5245",
  },
  "60ae33fbf650624e4d0f34e5": {
    avatar: [{ _id: "3", url: "someUrl" }],
    updatedAt: "2021-05-26T10:53:20.792Z",
    firstName: "John",
    isTeamMate: false,
    jobTitle: "HR consultant",
    lastName: "Dave",
    userId: "60ae33fbf650624e4d0f34e5",
  },
  "60ae33fbf650624e4d0f34f5": {
    avatar: [{ _id: "4", url: "someUrl" }],
    updatedAt: "2021-05-26T09:01:20.792Z",
    firstName: "Dave",
    isTeamMate: false,
    jobTitle: "HR consultant",
    lastName: "Carson-Daley",
    userId: "60ae33fbf650624e4d0f34f5",
  },
};

export const mockThreads = {
  "60aed794f541a54a23ebc6ee": {
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
  "60aed794f541a54a23ebc5ab": {
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
  "60bbd794f541a54a23eca1fe": {
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
};

export const mockThreadComments = {
  "f66adbf3-c02a-51d1-813e-e24bc128dcb3": {
    id: "f66adbf3-c02a-51d1-813e-e24bc128dcb3",
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
        "_id": "90b6368d562e51090e510d63",
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
  "g66adbf3-c02a-51d1-813e-e24bc128dcb3": {
    id: "g66adbf3-c02a-51d1-813e-e24bc128dcb3",
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
        "_id": "21c6368d562e51180e511e32",
        "postedByUserId": "60ae33fbf650624e4d0f34e5",
        "content": "there was only sushi",
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
  "c56adbf3-b12a-61d3-814e-e24bc138faa2": {
    id: "c56adbf3-b12a-61d3-814e-e24bc138faa2",
    "content": {
      "hashTags": [],
      "attachments": [],
      "html": "weight tribble",
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
        "_id": "21c6368d562e51180e511e32",
        "postedByUserId": "60ae33fbf650624e4d0f34e5",
        "content": "because home test",
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
};

const mockFullSearch = {};
