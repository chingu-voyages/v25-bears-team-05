const excerpt = require("excerpt");

export function getStringExcerpt({
  queryString,
  threadContent,
  length,
}: {
  queryString: string;
  threadContent: string;
  length?: number;
}): string {
  if (!length) length = 25;
  return excerpt(threadContent, queryString, length);
}
