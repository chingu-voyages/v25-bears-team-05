import { IUserPatchRequest, IUserProcessed } from "./user.type";
import axios from "axios";

const User404 = {
  firstName: "User does",
  lastName: "not exist!",
  jobTitle: "",
  avatar: [],
  connections: {},
  connectionOf: {},
  threads: {},
};

const getUser = async ({
  userId,
  onSuccess, // Remove when redux update done
  onError, // Remove when redux update done
}: {
  userId: string;
  onSuccess?: (data: any) => any;
  onError?: (message: any) => any;
}) => {
  try {
    const res = await axios(`/api/users/${userId}`);

    const connectionIds = Object.keys(res.data.connections);
    const processedUserData: IUserProcessed = {
      ...res.data,
      nOfConnections: connectionIds.length,
    };
    return processedUserData;
  } catch (error) {
    if (error?.response?.status === 404) {
      return {
        id: userId,
        ...User404,
      };
    } else {
      throw error;
    }
  }
};

// TODO make more efficient route for getting multiple
const getUsers = async ({ userIds }: { userIds: string[] }) => {
  let currentUserId;
  const res = await Promise.all(
    userIds.filter((id) => id !== "me").map((userId) => getUser({ userId }))
  );
  const users: any = {};
  if (userIds.includes("me")) {
    const currentUser = await getUser({ userId: "me" });
    if (!!currentUser) {
      currentUserId = currentUser.id;
      users[currentUserId] = currentUser;
    }
  }
  res.forEach((user) => {
    if (user) {
      users[user.id] = user;
    }
  });
  return {
    users,
    currentUserId,
  };
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
    throw new Error(req.statusText);
  }
};

export { getUser, getUsers, updateUser };
