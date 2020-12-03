import axios from "axios";

const checkIfAuthed = async ({
  setDone,
}: {
  setDone:
    | React.Dispatch<React.SetStateAction<boolean>>
    | ((isDone: boolean) => void);
}) => {
  try {
    const res = await axios("/auth");
    if (res.status === 200) {
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
