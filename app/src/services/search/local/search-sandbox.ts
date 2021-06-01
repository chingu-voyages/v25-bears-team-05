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

function run() {
  const ex = "dave";
  const expr = new RegExp(ex, "i");
  const collection = Object.values(userObject);
  let searchTerm = {
    $or: [{ firstName: expr }, { lastName: expr }, { jobTitle: expr }],
  };
  let query = new mingo.Query(searchTerm);
  let cursor = query.find(collection);
  const results = cursor.all();
  console.log(results);
}
run();
