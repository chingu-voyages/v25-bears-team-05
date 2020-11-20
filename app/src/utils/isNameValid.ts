const isNameValid = (name: string) => {
  return (
    name.trim() !== "" &&
    name.match(/[a-zA-Z\d\s\-\.\_]/g)?.length === name.length
  );
};

export default isNameValid;
