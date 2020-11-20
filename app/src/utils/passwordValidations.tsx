const isPasswordTooShort = (password: string) => {
  return password.length < 8;
};
const doesPasswordHaveMixedCase = (password: string) => {
  return password.match(/[A-Z]/) || password.match(/[a-z]/);
};

const isPasswordValid = (password: string) => {
  return !isPasswordTooShort(password) && doesPasswordHaveMixedCase(password);
};

export { isPasswordTooShort, doesPasswordHaveMixedCase, isPasswordValid };
