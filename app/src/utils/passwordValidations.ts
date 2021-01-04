const isPasswordTooShort = (password: string) => {
  return password.length < 8;
};
const doesPasswordHaveMixedCase = (password: string) => {
  const lowerCaseExpression = /[a-z]/;
  const upperCaseExpression = /[A-Z]/;
  return (
    lowerCaseExpression.test(password) && upperCaseExpression.test(password)
  );
};

const isPasswordValid = (password: string) => {
  return !isPasswordTooShort(password) && doesPasswordHaveMixedCase(password);
};

export { isPasswordTooShort, doesPasswordHaveMixedCase, isPasswordValid };
