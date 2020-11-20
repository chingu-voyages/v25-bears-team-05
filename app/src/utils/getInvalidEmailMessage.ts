import isEmailValid from "./isEmailValid";

const getInvalidEmailMessage = (email: string) => {
  return !isEmailValid(email) ? "Please enter a valid email" : "";
};

export default getInvalidEmailMessage;
