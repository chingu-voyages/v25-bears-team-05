export function parseIdParameter(data: {fullQueryString: string }) {
  const atDemarcator = data.fullQueryString.indexOf("&");
  return data.fullQueryString.substring(4, atDemarcator);
}
