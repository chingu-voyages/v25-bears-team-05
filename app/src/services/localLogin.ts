import axios from "axios";
import getInvalidEmailMessage from "../utils/getInvalidEmailMessage";
import { isPasswordValid } from "../utils/passwordValidations";

interface ILocalLoginProps {
  email: string;
  password: string;
  setDone:
    | React.Dispatch<React.SetStateAction<boolean>>
    | ((isDone: boolean) => void);
  setPasswordErrorMessage: React.Dispatch<React.SetStateAction<string>>;
  setEmailErrorMessage: React.Dispatch<React.SetStateAction<string>>;
}

const localLogin = async ({
  email,
  password,
  setDone,
  setPasswordErrorMessage,
  setEmailErrorMessage,
}: ILocalLoginProps) => {
  const emailError = getInvalidEmailMessage(email);
  setEmailErrorMessage(emailError);
  const passwordError = !isPasswordValid(password);
  if (passwordError) {
    setPasswordErrorMessage("Invalid login!");
    setTimeout(() => setDone?.(false), 1000);
    return;
  }
  if (!emailError) {
    try {
      const res = await axios({
        method: "post",
        url: "/api/auth/local",
        data: {
          email,
          password,
        },
      });
      if (res.status === 200) {
        setDone(true);
      } else {
        setDone(false);
      }
    } catch (error) {
      setDone(false);
      if (error.response.status === 401) {
        setPasswordErrorMessage("Invalid login!");
        setEmailErrorMessage(" ");
      } else {
        setPasswordErrorMessage("Woppps something went wrong!");
        console.error(error);
      }
    }
  } else {
    setDone(false);
  }
};

export default localLogin;
