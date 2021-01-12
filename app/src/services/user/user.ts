import {
  IUserPatchRequest,
  IUserProcessed,
  IUserRawResponse,
} from "./user.type";
import axios from "axios";
import { getCurrentUserInfo } from "./currentUserInfo";

const processUserData = (rawData: IUserRawResponse, currentUserId: string) => {
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

const getUser = async ({ userId }: { userId: string }) => {
  const res = await axios(`/api/users/${userId}`);
  if (res.data) {
    let currentUserId;
    if (userId === "me") {
      currentUserId = res.data.id;
    } else {
      const currentUserInfo = await getCurrentUserInfo();
      currentUserId = currentUserInfo?.id;
    }
    return processUserData(res.data, currentUserId);
  } else {
    throw "Unable to fetch user data";
  }
};

const updateUser = async ({ data }: { data: IUserPatchRequest }) => {
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
