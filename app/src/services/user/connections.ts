import { IUserConnection } from "./user.type";
import axios from "axios";

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
    const res = await axios(`/api/users/${userId}/connections?${queryParams}`);
    onSuccess(res.data);
  } catch (error) {
    console.error(error);
    typeof error?.message === "string" &&
      onError(
        "Unable to get your connections from server, please try again later"
      );
  }
};

const removeConnection = async ({
  connectionId,
  onSuccess, // Remove when redux update done
  onError, // Remove when redux update done
}: {
  connectionId: string;
  onSuccess?: (data: any) => any;
  onError?: (message: any) => any;
}) => {
  const req = await axios({
    method: "delete",
    url: `/api/users/connections/${connectionId}`,
  });
  return req;
};

const addConnection = async ({
  connectionId,
  isTeamMate,
  onSuccess, // Remove when redux update done
  onError, // Remove when redux update done
}: {
  connectionId: string;
  isTeamMate: boolean;
  onSuccess?: (data: any) => any;
  onError?: (message: any) => any;
}) => {
  const req = await axios({
    method: "put",
    url: `/api/users/connections/${connectionId}`,
    data: { isTeamMate },
  });
  return req;
};

export { getConnections, removeConnection, addConnection };
