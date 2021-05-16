import axios from "axios";
import { INotification } from "../../pages/notifications/notificationSlice";
export const getNotifications = async () => {
  const request = await axios({
    method: "get",
    url: `api/users/me/notifications`,
  });

  return request.data as INotification[];
};
