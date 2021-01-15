import axios from "axios";

const checkIfAuthed = async () => {
  const res = await axios("/api/auth");
  if (res.data.authed) {
    return true;
  } else {
    return false;
  }
};

export default checkIfAuthed;
