import axios from "axios";

const logout = async () => {
  try {
    await axios({
      method: "post",
      url: "/api/logout",
    });
    sessionStorage.clear();
  } catch (error) {
    console.error(error);
  }
};

export default logout;
