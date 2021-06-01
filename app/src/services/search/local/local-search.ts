import mingo from "mingo";
import assert from "assert";

export type IConnectionsSearchMatch = {
  firstName: string;
  lastName: string;
  jobTitle: string;
};
export function doLocalSearch({
  queryString,
  connections,
}: {
  queryString: string;
  connections: { [keyof: string]: any };
}) {}

function queryConnections({
  connections,
  queryString,
}: {
  connections: { [keyof: string]: IConnectionsSearchMatch };
  queryString: string;
}): IConnectionsSearchMatch[] {
  assert(queryString.trim() !== "", "invalid query string");
  const connectionsCollection = Object.values(connections);
  const regExp = new RegExp(queryString);

  const mingoSearchTerm = {
    $or: [{ firstName: regExp }, { lastName: regExp }, { jobTitle: regExp }],
  };
  const query = new mingo.Query(mingoSearchTerm);
  const results = query.find(connectionsCollection).all();
  if (results) return results as IConnectionsSearchMatch[];
  return [];
}
