import axios from "axios";
import store from "../../redux/store";
import { ADD_CONNECTION, REMOVE_CONNECTION } from "../../redux/actionTypes";

const removeConnection = async ({
  connectionId,
  onSuccess,
  onError,
}: {
  connectionId: string;
  onSuccess?: () => void;
  onError?: (message: string) => void;
}) => {
  try {
    const res = await axios({
      method: "delete",
      url: `/api/users/connections/${connectionId}`,
    });
    if (res.status === 200) {
      store.dispatch({
        type: REMOVE_CONNECTION,
        payload: { connectionId },
      });
      onSuccess?.();
    } else {
      onError?.(res.statusText);
    }
  } catch (error) {
    console.error(error);
    typeof error?.message === "string" &&
    onError?.("Connection not removed, please try again later");
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
  onSuccess?: () => void;
  onError?: (message: string) => void;
}) => {
  try {
    const res = await axios({
      method: "put",
      url: `/api/users/connections/${connectionId}`,
      data: { isTeamMate },
    });
    if (res.status === 200) {
      store.dispatch({
        type: ADD_CONNECTION,
        payload: { connectionId },
      });
      onSuccess?.();
    } else {
      onError?.(res.statusText);
    }
  } catch (error) {
    console.error(error);
    typeof error?.message === "string" &&
    onError?.("Connection not added, please try again later");
  }
};

export { removeConnection, addConnection };
