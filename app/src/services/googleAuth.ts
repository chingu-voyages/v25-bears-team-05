import axios from "axios";

interface IGoogleAuthProps {
  setDone: React.Dispatch<React.SetStateAction<boolean>>;
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
}

const googleAuth = async ({ setDone, setErrorMessage }: IGoogleAuthProps) => {
  const requestAuth = async () => {
    try {
      const res = await axios("/auth");
      if (res.status === 200) {
        setDone(true);
      }
    } catch (error) {
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
  const googleAuthPage = window.open(
    `http://localhost:${process.env.REACT_APP_API_PORT}/auth/google`,
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
