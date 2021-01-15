import axios from "axios";

const getFeed = async ({ query }: { query: string }) => {
  const res = await axios(`/api/feed?${query}`);
  if (res.data) {
    return res.data;
  } else {
    throw "Unable to get info from server, please try again later";
  }
};

export { getFeed };
