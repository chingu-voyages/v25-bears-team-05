import {
  IUserPatchRequest,
  IUserProcessed,
  IUserRawResponse,
} from "./user.type";
import axios from "axios";

const storeActiveUsersId = (id: string) => {
  sessionStorage.setItem("currentUserId", id);
};

const getUser = async ({
  userId,
  onSuccess,
  onError,
}: {
  userId: string;
  onSuccess?: (data: IUserProcessed) => void;
  onError: (message: string) => void;
}) => {
  try {
    const res = await axios(`/api/users/${userId}`);
    let currentUserId;
    if (userId === "me") {
      currentUserId = res.data.id;
      storeActiveUsersId(currentUserId);
    } else {
      currentUserId = sessionStorage.getItem("currentUserId");
    }
    const {
      firstName,
      lastName,
      jobTitle,
      avatar,
      id,
    } = res.data as IUserRawResponse;
    const connectionIds = Object.keys(res.data.connections);
    const connectionOfIds = Object.keys(res.data.connectionOf);
    const processedUserData: IUserProcessed = {
      firstName,
      lastName,
      jobTitle,
      avatar,
      nOfConnections: connectionIds.length,
      isAConnection: !!(
        currentUserId && connectionOfIds.includes(currentUserId)
      ),
      id,
    };
    onSuccess?.(processedUserData);
    return processedUserData;
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
  data: IUserPatchRequest;
  onSuccess: (data: IUserPatchRequest) => void;
  onError: (message: string) => void;
}) => {
  try {
    const req = await axios({
      method: "patch",
      url: `/api/users/me`,
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
