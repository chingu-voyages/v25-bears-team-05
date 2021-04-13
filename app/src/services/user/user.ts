import { IUserPatchRequest, IUserProcessed } from "./user.type";
import axios from "axios";
import { getCurrentUserInfo, setCurrentUserInfo } from "./currentUserInfo";

const getUser = async ({
  userId,
  onSuccess, // Remove when redux update done
  onError, // Remove when redux update done
}: {
  userId: string;
  onSuccess?: (data: any) => any;
  onError?: (message: any) => any;
}) => {
  const res = await axios(`/api/users/${userId}`);
  let currentUserId;
  if (userId === "me") {
    const { id, avatar, firstName, lastName, jobTitle } = res.data;
    setCurrentUserInfo(
      JSON.stringify({ id, avatar, firstName, lastName, jobTitle })
    );
    currentUserId = id;
  } else {
    const currentUserInfo = await getCurrentUserInfo();
    currentUserId = currentUserInfo?.id;
  }
  const connectionIds = Object.keys(res.data.connections);
  const connectionOfIds = Object.keys(res.data.connectionOf);
  const processedUserData: IUserProcessed = {
    ...res.data,
    nOfConnections: connectionIds.length,
    isAConnection: !!(currentUserId && connectionOfIds.includes(currentUserId)),
  };
  return processedUserData;
};

const updateUser = async ({ data }: { data: IUserPatchRequest }) => {
  const req = await axios({
    method: "patch",
    url: `/api/users/me`,
    data,
  });
  if (req.status === 200) {
    return data;
  } else {
    throw req.statusText;
  }
};

export { getUser, updateUser };
