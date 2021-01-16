import { IUserPatch } from "./user.type";
import axios from "axios";

const getUser = async ({ userId }: { userId: string }) => {
  const res = await axios(`/api/users/${userId}`);
  if (res.data) {
    return res.data;
  } else {
    throw "Unable to fetch user data";
  }
};

const updateUser = async ({ data }: { data: IUserPatch }) => {
  const res = await axios({
    method: "patch",
    url: `/api/users/me`,
    data,
  });
  if (res.status === 200) {
    return data;
  } else {
    throw "Sorry, we're unable to update your info at this time, please try again later";
  }
};

export { getUser, updateUser };
