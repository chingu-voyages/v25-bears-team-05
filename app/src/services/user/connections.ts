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

const removeConnection = async ({ targetUserId }: { targetUserId: string }) => {
  const res = await axios({
    method: "delete",
    url: `/api/users/me/connections/${targetUserId}`,
  });
  return res?.data;
};

const addConnection = async ({
  connectionId,
  connectionRequestDocumentId,
}: {
  connectionId: string;
  connectionRequestDocumentId: string;
}) => {
  const req = await axios({
    method: "put",
    url: `/api/users/${connectionId}/connections`,
    data: { connectionRequestDocumentId },
  });
  return req?.data;
};

const requestAddConnection = async ({
  connectionId,
  isTeamMate,
}: {
  connectionId: string;
  isTeamMate: boolean;
}) => {
  const req = await axios({
    method: "post",
    url: `/api/request/connection/${connectionId}`,
    data: { isTeamMate },
  });
  return req?.data;
};

const cancelAddConnectionRequest = async ({
  connectionId,
}: {
  connectionId: string;
}) => {
  const req = await axios({
    method: "delete",
    url: `/api/request/connection/${connectionId}`,
    data: { origin: "requestor" },
  });
  return req?.data;
};

const declineConnectionRequest = async ({
  requestorId,
}: {
  requestorId: string;
}) => {
  const req = await axios({
    method: "delete",
    url: `/api/request/connection/${requestorId}`,
    data: { origin: "approver" },
  });
  return req?.data;
};

export {
  getConnections,
  removeConnection,
  addConnection,
  requestAddConnection,
  cancelAddConnectionRequest,
  declineConnectionRequest,
};
