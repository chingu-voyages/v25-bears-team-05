import mingo from "mingo";
import assert from "assert";

export type ConnectionsSearchMatch = {
  avatar: { _id: string; url: string }[];
  userId: string;
  firstName: string;
  lastName: string;
  jobTitle: string;
  updatedAt: Date;
};

export type ThreadsSearchMatch = {
  id: string;
  content: { html: string };
  comments: {
    _id: string;
    content: string;
    parentThreadId: string;
    parentThreadOriginatorId: string;
    postedByUserId: string;
    updatedAt: Date;
  } | null;
};

export function doLocalSearch({
  queryString,
  connections,
  threads,
}: {
  queryString: string;
  connections: { [keyof: string]: any };
  threads: { [keyof: string]: any };
}) {
  return {
    connections: queryConnections({ connections, queryString }),
    threads: queryThreads({ threads, queryString }),
  };
}

function queryConnections({
  connections,
  queryString,
}: {
  connections: { [keyof: string]: ConnectionsSearchMatch };
  queryString: string;
}): ConnectionsSearchMatch[] {
  assert(queryString.trim() !== "", "invalid query string");
  const connectionsCollection = Object.values(connections);
  const regExp = new RegExp(queryString, "i");

  const mingoSearchTerm = {
    $or: [{ firstName: regExp }, { lastName: regExp }, { jobTitle: regExp }],
  };
  const query = new mingo.Query(mingoSearchTerm);
  const results = query.find(connectionsCollection).all();
  if (results) return results as ConnectionsSearchMatch[];
  return [];
}

function queryThreads({
  threads,
  queryString,
}: {
  threads: { [keyof: string]: ThreadsSearchMatch };
  queryString: string;
}) {
  assert(queryString.trim() !== "", "invalid query string");
  const threadsCollection = Object.values(threads);
  const regExp = new RegExp(queryString, "i");
  const mingoSearchTerm = {
    $or: [{ "content.html": regExp }, { "comments.content": regExp }],
  };
  const query = new mingo.Query(mingoSearchTerm);
  const results = query.find(threadsCollection).all();
  if (results) return results as ThreadsSearchMatch[];
  return [];
}
