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
    const res = await axios(`/users/${userId}/connections?${queryParams}`);
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
  onSuccess,
  onError,
}: {
  connectionId: string;
  onSuccess: () => void;
  onError: (message: string) => void;
}) => {
  try {
    const req = await axios({
      method: "delete",
      url: `/users/connections/${connectionId}`,
    });
    if (req.status === 200) {
      onSuccess();
    } else {
      onError(req.statusText);
    }
  } catch (error) {
    console.error(error);
    typeof error?.message === "string" &&
      onError("Connection not removed, please try again later");
  }
};

const addConnection = async ({
  connectionId,
  isTeamMate,
  onSuccess,
  onError,
}: {
  connectionId: string;
  isTeamMate: boolean;
  onSuccess: () => void;
  onError: (message: string) => void;
}) => {
  try {
    const req = await axios({
      method: "put",
      url: `/users/connections/${connectionId}`,
      data: { isTeamMate },
    });
    if (req.status === 200) {
      onSuccess();
    } else {
      onError(req.statusText);
    }
  } catch (error) {
    console.error(error);
    typeof error?.message === "string" &&
      onError("Connection not added, please try again later");
  }
};

export { getConnections, removeConnection, addConnection };
