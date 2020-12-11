import { getUser } from "./user";

const setCurrentUserInfo = (jsonStr: string = "") => {
  sessionStorage.setItem("currentUserInfo", jsonStr);
};

const getCurrentUserInfo = async () => {
  const storedInfo = sessionStorage.getItem("currentUserInfo");
  let currentUserInfo = !!storedInfo && JSON.parse(storedInfo);
  if (!currentUserInfo?.id) {
    const userData = await getUser({
      userId: "me",
      onError: (msg) => {
        console.error(msg);
      },
    });
    if (userData?.id) {
      const { id, avatar, firstName, lastName, jobTitle } = userData;
      currentUserInfo = { id, avatar, firstName, lastName, jobTitle };
      setCurrentUserInfo(JSON.stringify(currentUserInfo));
    }
  }
  return currentUserInfo || {};
};

export { setCurrentUserInfo, getCurrentUserInfo };
