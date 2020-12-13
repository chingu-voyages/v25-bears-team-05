import isNameValid from "./isNameValid";

const getInvalidNameMessage = (name: string) => {
  return isNameValid(name)
    ? ""
    : "Name must not be empty and may only contain letters, spaces, and these: - _ .";
};

export default getInvalidNameMessage;
