import { IUserPatchRequest, IUserProcessed } from "./user.type";
import axios from "axios";

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
  const connectionIds = Object.keys(res.data.connections);
  const processedUserData: IUserProcessed = {
    ...res.data,
    nOfConnections: connectionIds.length,
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
