import mingo from "mingo";
import _flatten from "lodash/flatten";
export interface IConnectionsSearchMatch {
  avatar: { _id: string; url: string }[];
  userId: string;
  firstName: string;
  lastName: string;
  jobTitle: string;
  updatedAt: Date;
}

export interface IThreadsCommentSearchMatch {
  _id: string;
  content: string;
  parentThreadId: string;
  parentThreadOriginatorId: string;
  postedByUserId: string;
  updatedAt: Date;
}
export interface IThreadsSearchMatch {
  id: string;
  content: { html: string };
  postedByUserId: string;
  comments: IThreadsCommentSearchMatch;
}

export interface IAggregatedLocalSearchResults {
  connections: IConnectionsSearchMatch[];
  threads: IThreadsSearchMatch[];
  threadComments: IThreadsCommentSearchMatch[];
}

export function doLocalSearch({
  queryString,
  connections,
  threads,
}: {
  queryString: string;
  connections: { [keyof: string]: any };
  threads: { [keyof: string]: any };
}): IAggregatedLocalSearchResults {
  return {
    connections: queryConnections({ connections, queryString }),
    threads: queryThreads({ threads, queryString }),
    threadComments: queryThreadComments({ threads, queryString }),
  };
}

export function queryConnections({
  connections,
  queryString,
}: {
  connections: { [keyof: string]: IConnectionsSearchMatch };
  queryString: string;
}): IConnectionsSearchMatch[] {
  if (queryString?.trim() === "") {
    return [];
  }

  if (!connections) return [];
  const connectionsCollection = Object.values(connections);
  const regExp = new RegExp(queryString, "i");

  const mingoSearchTerm = {
    $or: [{ firstName: regExp }, { lastName: regExp }, { jobTitle: regExp }],
  };
  const query = new mingo.Query(mingoSearchTerm);
  const results = query.find(connectionsCollection).all();
  if (results) return results as IConnectionsSearchMatch[];
  return [];
}

export function queryThreads({
  threads,
  queryString,
}: {
  threads: { [keyof: string]: IThreadsSearchMatch };
  queryString: string;
}) {
  if (queryString?.trim() === "") {
    return [];
  }

  const threadsCollection = Object.values(threads);
  const regExp = new RegExp(queryString, "i");
  const mingoSearchTerm = {
    "content.html": regExp,
  };
  const results = new mingo.Query(mingoSearchTerm)
    .find(threadsCollection)
    .all();
  if (results) return results as IThreadsSearchMatch[];
  return [];
}

export function queryThreadComments({
  threads,
  queryString,
}: {
  threads: { [keyof: string]: IThreadsSearchMatch };
  queryString: string;
}) {
  if (queryString?.trim() === "") {
    return [];
  }

  const threadsCollection = Object.values(threads);
  const threadsCommentCollection: any = [];
  threadsCollection.forEach((thread) => {
    if (thread.comments) {
      const commentsArrayForThread = Object.values(thread.comments);
      threadsCommentCollection.push(commentsArrayForThread);
    }
  });

  const flattenedThreadCommentsArray = _flatten(threadsCommentCollection);
  const regExp = new RegExp(queryString, "i");
  const mingoSearchTerm = { "content": regExp };
  const rawResults = new mingo.Query(mingoSearchTerm)
    .find(flattenedThreadCommentsArray)
    .all() as IThreadsCommentSearchMatch[];

  const results: IThreadsCommentSearchMatch[] = rawResults.map((result) => {
    return {
      _id: result._id,
      content: result.content,
      parentThreadId: result.parentThreadId,
      parentThreadOriginatorId: result.parentThreadOriginatorId,
      postedByUserId: result.postedByUserId,
      updatedAt: result.updatedAt,
    };
  });
  return results ? results : [];
}
