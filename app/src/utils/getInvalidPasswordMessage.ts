import {
  isPasswordTooShort,
  doesPasswordHaveMixedCase,
} from "./passwordValidations";

const getInvalidPasswordMessage = (password: string) => {
  let errors = [];
  isPasswordTooShort(password) && errors.push("at least 8 characters");
  doesPasswordHaveMixedCase(password) &&
    errors.push("a mix of uppercase and lowercase");
  return errors.length > 0
    ? ["Password requires ", errors.join(" and ")].join("")
    : "";
};

export default getInvalidPasswordMessage;
