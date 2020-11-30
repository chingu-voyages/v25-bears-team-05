import IUser, {
  IUserPatch,
  IUserAPI,
  IUserConnection,
} from "../types/user.type";
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

const getConnections = async ({
  userId,
  offset,
  limit,
  onSuccess,
  onError,
}: {
  userId: string;
  offset: number;
  limit: number;
  onSuccess: (data: { [keyof: string]: IUserConnection }) => void;
  onError: (message: string) => void;
}) => {
  const queryParams = new URLSearchParams();
  queryParams.append("offset", offset.toString());
  queryParams.append("limit", limit.toString());
  try {
    // const res = await axios(`/users/${userId}/connections?${queryParams}`);
    const res = {
      data: {
        "123": {
          firstName: "lil",
          lastName: "ka",
          jobTitle: "something",
          avatar: undefined,
          nOfConnections: 0,
          dateTimeConnected: Date(),
          id: "123",
        },
        "124": {
          firstName: "fgds",
          lastName: "ka",
          jobTitle: "something",
          avatar: undefined,
          nOfConnections: 0,
          dateTimeConnected: Date(),
          id: "124",
        },
        "125": {
          firstName: "nbce",
          lastName: "ka",
          jobTitle: "something",
          avatar: undefined,
          nOfConnections: 0,
          dateTimeConnected: Date(),
          id: "125",
        },
        "126": {
          firstName: "csa",
          lastName: "ka",
          jobTitle: "something",
          avatar: undefined,
          nOfConnections: 0,
          dateTimeConnected: Date(),
          id: "126",
        },
      },
    };
    onSuccess(res.data);
  } catch (error) {
    console.error(error);
    typeof error?.message === "string" &&
      onError("Unable to get info from server, please try again later");
  }
};

export { getUser, updateUser, getConnections };
