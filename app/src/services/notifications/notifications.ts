import axios from "axios";
export const getNotifications = async() => {
  const request = await axios({
    method: "get",
    url: `api/users/me/notifications`,
  });

  // Do something
  console.log(request.data);
}
