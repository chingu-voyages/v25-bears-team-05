import { getUser } from "./user";
import store from "../../redux/store";

const getCurrentUserInfo = async () => {
  const state = store.getState();
  let currentUserInfo = state?.users.me;
  if (!currentUserInfo?.id) {
    const userData = await getUser({
      userId: "me",
      onError: (msg) => {
        console.error(msg);
      },
    });
    if (userData?.id) {
      currentUserInfo = userData;
    }
  }
  return currentUserInfo;
};

export { getCurrentUserInfo };
