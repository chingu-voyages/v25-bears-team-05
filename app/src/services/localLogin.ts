import axios from "axios";
import getInvalidEmailMessage from "../utils/getInvalidEmailMessage";

interface ILocalLoginProps {
  email: string;
  password: string;
  setDone: React.Dispatch<React.SetStateAction<boolean>>;
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
  const errors = {
    email: getInvalidEmailMessage(email),
  };
  setEmailErrorMessage(errors.email);
  const thereAreErrors = !Object.values(errors).some((error) => error);
  if (thereAreErrors) {
    try {
      const res = await axios({
        method: "post",
        url: "/auth/local",
        data: {
          email,
          password,
        },
      });
      if (res.status === 200) {
        setDone(true);
      }
    } catch (error) {
      if (error.response.status === 401) {
        setPasswordErrorMessage("Invalid login!");
        setEmailErrorMessage(" ");
      } else {
        setPasswordErrorMessage("Woppps something went wrong!");
        console.error(error);
      }
    }
  }
};

export default localLogin;
