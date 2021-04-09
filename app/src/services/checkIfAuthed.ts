import axios from "axios";

const checkIfAuthed = async () => {
  try {
    const res = await axios("/api/auth");
    if (res.data.authed) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};

export default checkIfAuthed;
