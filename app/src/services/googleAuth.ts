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
      const res = await axios("/api/auth");
      if (res.status === 200) {
        setDone(true);
      }
    } catch (error) {
      setDone(false);
      if (error.response.status === 401) {
        typeof error?.message === "string" &&
          setErrorMessage(
            "Authentication unsuccessful, please select a google account to sign in with."
          );
      } else {
        setErrorMessage("Woppps something went wrong!");
        console.error(error);
      }
    }
  };
  const googleAuthPage = window.open(
    `${
      process.env.NODE_ENV === "production"
        ? process.env.REACT_APP_API_URL
        : process.env.REACT_APP_DEV_API_URL
    }/auth/google`,
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
