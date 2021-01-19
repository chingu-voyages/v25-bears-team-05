import axios from "axios";

const removeConnection = async ({ connectionId }: { connectionId: string }) => {
  const res = await axios({
    method: "delete",
    url: `/api/users/connections/${connectionId}`,
  });
  if (res.status === 200) {
    return "Connection removed";
  } else {
    throw "Connection not removed, please try again later";
  }
};

const addConnection = async ({
  connectionId,
  isTeamMate,
}: {
  connectionId: string;
  isTeamMate: boolean;
}) => {
  const res = await axios({
    method: "put",
    url: `/api/users/connections/${connectionId}`,
    data: { isTeamMate },
  });
  if (res.status === 200) {
    return { data: res.data, successMessage: "Connection added" };
  } else {
    throw "Connection not added, please try again later";
  }
};

export { removeConnection, addConnection };
