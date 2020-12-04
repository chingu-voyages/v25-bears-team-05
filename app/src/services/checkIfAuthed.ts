import axios from "axios";

const checkIfAuthed = async ({
  setDone,
}: {
  setDone:
    | React.Dispatch<React.SetStateAction<boolean>>
    | ((isDone: boolean) => void);
}) => {
  try {
    const res = await axios("/api/auth");
    if (res.data.authed) {
      setDone(true);
    } else {
      setDone(false);
    }
  } catch (error) {
    setDone(false);
    return;
  }
};

export default checkIfAuthed;
