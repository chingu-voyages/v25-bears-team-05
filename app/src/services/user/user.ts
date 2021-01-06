import {
  IUserPatchRequest,
  IUserProcessed,
  IUserRawResponse,
} from "./user.type";
import axios from "axios";
import { getCurrentUserInfo } from "./currentUserInfo";
import store from "../../redux/store";
import { UPDATE_CURRENT_USER_INFO, UPDATE_USER } from "../../redux/actionTypes";

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
    } else {
      const currentUserInfo = await getCurrentUserInfo();
      currentUserId = currentUserInfo?.id;
    }
    const cachedUserData = await processUserData(res.data, currentUserId);
    const dispatchType =
      cachedUserData.id === currentUserId
        ? UPDATE_CURRENT_USER_INFO
        : UPDATE_USER;
    store.dispatch({
      type: dispatchType,
      payload: { userData: cachedUserData },
    });
    const apiResponse = await res.data.apiPromise;
    let apiUserData;
    if (apiResponse?.data?.id) {
      // Handle second response from service worker
      apiUserData = await processUserData(apiResponse.data, currentUserId);
      store.dispatch({
        type: dispatchType,
        payload: { userData: apiUserData },
      });
    }
    return apiUserData || cachedUserData;
  } catch (error) {
    console.error(error);
    typeof error?.message === "string" &&
      onError("Unable to get info from server, please try again later");
  }
};

const processUserData = async (
  rawData: IUserRawResponse,
  currentUserId: string
) => {
  const {
    firstName,
    lastName,
    jobTitle,
    avatar,
    id,
  } = rawData as IUserRawResponse;
  const connectionIds = Object.keys(rawData.connections);
  const connectionOfIds = Object.keys(rawData.connectionOf);
  const processedUserData: IUserProcessed = {
    firstName,
    lastName,
    jobTitle,
    avatar,
    nOfConnections: connectionIds.length,
    isAConnection: !!(currentUserId && connectionOfIds.includes(currentUserId)),
    id,
  };
  return processedUserData;
};

const updateUser = async ({
  data,
  onSuccess,
  onError,
}: {
  data: IUserPatchRequest;
  onSuccess: () => void;
  onError: (message: string) => void;
}) => {
  try {
    const req = await axios({
      method: "patch",
      url: `/api/users/me`,
      data,
    });
    if (req.status === 200) {
      const currentUserInfo = await getCurrentUserInfo();
      store.dispatch({
        type: UPDATE_CURRENT_USER_INFO,
        payload: { userData: { ...currentUserInfo, ...data } },
      });
      onSuccess();
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
