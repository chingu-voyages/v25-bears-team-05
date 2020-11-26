import axios from "axios";

const checkIfAuthed = async ({
  setDone,
}: {
  setDone: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  try {
    const res = await axios("/auth");
    if (res.status === 200) {
      setDone(true);
    }
  } catch (error) {
    return;
  }
};

export default checkIfAuthed;
