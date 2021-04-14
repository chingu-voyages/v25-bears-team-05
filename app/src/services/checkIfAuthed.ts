import axios from "axios";
import { setCookie } from "../utils/cookie";

const checkIfAuthed = async () => {
  try {
    const res = await axios("/api/auth");
    if (res.data.authed) {
      setCookie("has-existing-auth-cookie", "true", 90);
      return true;
    } else {
      setCookie("has-existing-auth-cookie", "false", 90);
      return false;
    }
  } catch (error) {
    return false;
  }
};

export default checkIfAuthed;
