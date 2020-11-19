const getInvalidPasswordMessage = (currentPassword: string) => {
  let errors = [];
  currentPassword.length < 8 && errors.push("at least 8 characters");
  (!currentPassword.match(/[A-Z]/) || !currentPassword.match(/[a-z]/)) &&
    errors.push("a mix of uppercase and lowercase");
  return errors.length > 0
    ? ["Password requires ", errors.join(" and ")].join("")
    : "";
};

export default getInvalidPasswordMessage;
