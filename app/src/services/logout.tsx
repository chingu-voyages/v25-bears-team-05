import axios from "axios";

const logout = async () => {
  try {
    await axios({
      method: "post",
      url: "/logout",
    });
    window.location.replace("/");
  } catch (error) {
    console.error(error);
  }
};

export default logout;
