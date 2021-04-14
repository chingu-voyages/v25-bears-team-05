import axios from "axios";
import { setCookie } from "../utils/cookie";

const logout = async () => {
  try {
    await axios({
      method: "post",
      url: "/api/logout",
    });
    setCookie("has-existing-auth-cookie", "false", 90);
    sessionStorage.clear();
  } catch (error) {
    console.error(error);
  }
};

export default logout;
