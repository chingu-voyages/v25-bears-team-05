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
  onError?: (message: string) => void;
}) => {
  try {
    if (!userId) {
      throw "No userId given!";
    }
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
    const finalData = apiUserData || cachedUserData;
    onSuccess?.(finalData);
    return finalData;
  } catch (error) {
    console.error(error);
    typeof error?.message === "string" &&
      onError?.("Unable to get info from server, please try again later");
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
    connections,
    connectionOf,
  } = rawData as IUserRawResponse;
  const connectionIds = Object.keys(connections);
  const connectionOfIds = Object.keys(connectionOf);
  const processedUserData: IUserProcessed = {
    firstName,
    lastName,
    jobTitle,
    avatar,
    nOfConnections: connectionIds.length,
    isAConnection: !!(currentUserId && connectionOfIds.includes(currentUserId)),
    id,
    connections,
    connectionOf,
    isMe: currentUserId === id,
  };
  return processedUserData;
};

const updateUser = async ({
  data,
  onSuccess,
  onError,
}: {
  data: IUserPatchRequest;
  onSuccess?: (data: IUserPatchRequest) => void;
  onError?: (message: string) => void;
}) => {
  try {
    const res = await axios({
      method: "patch",
      url: `/api/users/me`,
      data,
    });
    if (res.status === 200) {
      onSuccess?.(data);
    } else {
      onError?.(res.statusText);
    }
  } catch (error) {
    console.error(error);
    typeof error?.message === "string" &&
      onError?.(
        "Sorry, we're unable to update your info at this time, please try again later"
      );
  }
};

export { getUser, updateUser };
