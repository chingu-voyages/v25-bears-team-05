import axios from "axios";
import { IBucketItem } from "../../redux/store.type";

const fetchFeed = async ({
  query,
  destination,
}: {
  query: string;
  destination: IBucketItem["destination"];
}) => {
  const res = await axios(`/api/feed/${destination}?${query}`);
  if (res.data) {
    return res.data;
  } else {
    throw "Unable to get info from server, please try again later";
  }
};

export { fetchFeed };
