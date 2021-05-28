import axios from "axios";
import { INotification } from "../../pages/notifications/notificationSlice";
export const getNotifications = async () => {
  const request = await axios({
    method: "get",
    url: "/api/users/me/notifications",
  });
  const notifications = request.data as INotification[];
  const sortedNotifications = notifications.sort(
    (a, b) =>
      parseInt(b.createdAt.replace(/[-.:\D]/g, "")) -
      parseInt(a.createdAt.replace(/[-.:\D]/g, ""))
  );
  return sortedNotifications;
};

export const markNotificationAsRead = async (notificationId: string) => {
  const request = await axios({
    method: "patch",
    url: `/api/users/me/notifications/${notificationId}`,
    data: { read: true },
  });
  return request.data as INotification[];
};
