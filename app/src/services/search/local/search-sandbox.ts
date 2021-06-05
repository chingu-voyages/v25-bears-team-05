// Sandbox for testing search queries with mingo
import mingo from "mingo";
export const userObject = {
  "60ae28a0f650624e4d0f34e3": {
    dateTimeConnected: "2021-05-26T10:53:20.792Z",
    firstName: "Carl",
    isTeamMate: false,
    jobTitle: "Office Administrator",
    lastName: "O'Connor",
    userId: "60ae28a0f650624e4d0f34e3",
  },
  "60afee4f605e4156dd1a5245": {
    dateTimeConnected: "2021-05-26T10:53:20.792Z",
    firstName: "Mary",
    isTeamMate: false,
    jobTitle: "Dave Developer",
    lastName: "Acosta",
    userId: "60afee4f605e4156dd1a5245",
  },
  "60ae33fbf650624e4d0f34e5": {
    dateTimeConnected: "2021-05-26T10:53:20.792Z",
    firstName: "John",
    isTeamMate: false,
    jobTitle: "HR consultant",
    lastName: "Dave",
    userId: "60ae33fbf650624e4d0f34e5",
  },
  "60ae33fbf650624e4d0f34f5": {
    dateTimeConnected: "2021-05-26T09:01:20.792Z",
    firstName: "Dave",
    isTeamMate: false,
    jobTitle: "HR consultant",
    lastName: "Carson-Daley",
    userId: "60ae33fbf650624e4d0f34f5",
  },
};

const sampleThreadObject = {
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
};

function searchUsers() {
  const ex = "dave";
  const expr = new RegExp(ex, "i");
  const collection = Object.values(userObject);
  let searchTerm = {
    $or: [{ firstName: expr }, { lastName: expr }, { jobTitle: expr }],
  };
  let query = new mingo.Query(searchTerm);
  let cursor = query.find(collection);
  const results = cursor.all();
}

function searchThreads() {
  const ex = "test";
  const expr = new RegExp(ex, "i");
  const collection = Object.values(sampleThreadObject);
  let searchTerm = {
    $or: [{ "content.html": expr }, { "comments.content": expr }],
  };
  let query = new mingo.Query(searchTerm);
  let cursor = query.find(collection);
  const results = cursor.all();
  console.log(results);
}
function run() {
  searchUsers();
  searchThreads();
}

run();
