import { getUser } from "./user";

const setCurrentUserId = (id: string = "") => {
  sessionStorage.setItem("currentUserId", id);
};

const getCurrentUserId = async () => {
  let currentUserId: string | undefined | null = sessionStorage.getItem(
    "currentUserId"
  );
  if (!currentUserId) {
    const userData = await getUser({
      userId: "me",
      onError: (msg) => {
        console.error(msg);
      },
    });
    currentUserId = userData?.id;
    setCurrentUserId(currentUserId);
  }
  return currentUserId;
};

export { setCurrentUserId, getCurrentUserId };
