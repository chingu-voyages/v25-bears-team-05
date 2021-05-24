import axios from "axios";
import { INotification } from "../../pages/notifications/notificationSlice";
export const getNotifications = async () => {
  const request = await axios({
    method: "get",
    url: "/api/users/me/notifications",
  });
  return request.data as INotification[];
};

export const markNotificationAsRead = async (notificationId: string) => {
  const request = await axios({
    method: "patch",
    url: `/api/users/me/notifications/${notificationId}`,
    data: { read: true },
  });
  return request.data as INotification[];
};
