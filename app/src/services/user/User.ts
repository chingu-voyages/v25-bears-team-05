import { IUserPatch, IUserAPI } from "./user.type";
import axios from "axios";

const getUser = async ({
  userId,
  onSuccess,
  onError,
}: {
  userId: string;
  onSuccess: (data: IUserAPI) => void;
  onError: (message: string) => void;
}) => {
  try {
    const res = await axios(`/users/${userId}`);
    onSuccess(res.data);
  } catch (error) {
    console.error(error);
    typeof error?.message === "string" &&
      onError("Unable to get info from server, please try again later");
  }
};

const updateUser = async ({
  data,
  onSuccess,
  onError,
}: {
  data: IUserPatch;
  onSuccess: (data: {}) => void;
  onError: (message: string) => void;
}) => {
  try {
    const req = await axios({
      method: "patch",
      url: `/users/me`,
      data,
    });
    if (req.status === 200) {
      onSuccess(data);
    } else {
      onError(req.statusText);
    }
  } catch (error) {
    console.error(error);
    typeof error?.message === "string" &&
      onError(
        "Sorry, we're unable to update your info at this time, please try again later"
      );
  }
};

export { getUser, updateUser };
