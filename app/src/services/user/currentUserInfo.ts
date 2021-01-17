import { fetchUserData } from "../../redux/actions/users";
import store from "../../redux/store";

const getCurrentUserData = async () => {
  let state = store.getState();
  let currentUserInfo = state?.users.me;
  if (!currentUserInfo?.id) {
    const userData = await fetchUserData("me");
    await userData;
    state = store.getState();
    currentUserInfo = state?.users.me;
  }
  return currentUserInfo;
};

const isAConnection = (id: string) => {
  const state = store.getState();
  const currentUserInfo = state?.users.me;
  if (!currentUserInfo.id) {
    return undefined;
  }
  return currentUserInfo.connections.some(
    ({ userId }: { userId: string }) => userId === id
  );
};

const isAConnectionOf = (id: string) => {
  const state = store.getState();
  const currentUserInfo = state?.users.me;
  if (!currentUserInfo.id) {
    return undefined;
  }
  return currentUserInfo.connectionsOf.some(
    ({ userId }: { userId: string }) => userId === id
  );
};

const isCurrentUser = (id: string) => {
  if (id === "me") {
    return true;
  }
  const state = store.getState();
  const currentUserInfo = state?.users.me;
  if (!currentUserInfo.id) {
    return undefined;
  }
  return currentUserInfo.id === id;
};

export { getCurrentUserData, isAConnection, isAConnectionOf, isCurrentUser };
