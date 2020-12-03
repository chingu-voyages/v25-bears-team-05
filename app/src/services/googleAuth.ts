import axios from "axios";

interface IGoogleAuthProps {
  setDone:
    | React.Dispatch<React.SetStateAction<boolean>>
    | ((isDone: boolean) => void);
  setErrorMessage:
    | React.Dispatch<React.SetStateAction<string>>
    | ((msg: string) => void);
}

const googleAuth = async ({ setDone, setErrorMessage }: IGoogleAuthProps) => {
  const requestAuth = async () => {
    try {
      const res = await axios("/auth");
      console.log({ res });
      if (res.status === 200) {
        setDone(true);
      }
    } catch (error) {
      console.log({ error });
      if (error.response.status === 401) {
        typeof error?.message === "string" &&
          setErrorMessage(
            "Authentication unsuccessful, please select a google acoount to sign in with."
          );
      } else {
        setErrorMessage("Woppps something went wrong!");
        console.error(error);
      }
    }
  };
  console.log(process.env.REACT_APP_GOOGLE_AUTH_LINK);
  const googleAuthPage = window.open(
    process.env.REACT_APP_GOOGLE_AUTH_LINK,
    "googleAuthPage",
    "onclose"
  );
  let intTest = setInterval(() => {
    if (googleAuthPage?.closed) {
      setTimeout(() => requestAuth(), 1000);
      clearInterval(intTest);
    }
  }, 1000);
};

export default googleAuth;
