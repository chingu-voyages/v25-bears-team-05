const excerpt = require("excerpt");

export function getStringExcerpt({
  queryString,
  threadContent,
}: {
  queryString: string;
  threadContent: string;
}): string {
  return excerpt(threadContent, queryString, 25);
}
