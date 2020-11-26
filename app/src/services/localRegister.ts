import axios from "axios";
import getInvalidPasswordMessage from "../utils/getInvalidPasswordMessage";
import getInvalidEmailMessage from "../utils/getInvalidEmailMessage";
import getInvalidNameMessage from "../utils/getInvalidNameMessage";

interface ILocalRegisterProps {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  setDone: React.Dispatch<React.SetStateAction<boolean>>;
  setErrorMessages: React.Dispatch<React.SetStateAction<string[]>>;
}

const localRegister = async ({
  firstName,
  lastName,
  email,
  password,
  setDone,
  setErrorMessages,
}: ILocalRegisterProps) => {
  const errors = {
    firstName: getInvalidNameMessage(firstName),
    lastName: getInvalidNameMessage(lastName),
    email: getInvalidEmailMessage(email),
    password: getInvalidPasswordMessage(password),
  };
  setErrorMessages(Object.values(errors));
  const thereAreErrors = Object.values(errors).some((error) => error);
  if (!thereAreErrors) {
    try {
      const res = await axios({
        method: "post",
        url: "/register/local",
        data: {
          firstName,
          lastName,
          email,
          password,
        },
      });
      if (res.status === 200) {
        setDone(true);
      }
    } catch (error) {
      setErrorMessages(["Woppps something went wrong!"]);
      console.error(error);
    }
  }
};

export default localRegister;
