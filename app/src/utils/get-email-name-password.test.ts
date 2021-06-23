import getInvalidEmailMessage from "./getInvalidEmailMessage";
import getInvalidNameMessage from "./getInvalidNameMessage";
import getInvalidPasswordMessage from "./getInvalidPasswordMessage";

describe("validation message tests", () => {
  describe("getInvalidEmailMessage", () => {
    test("returns correct response if invalid", () => {
      const input = "invalid.email";
      expect(getInvalidEmailMessage(input)).toBe("Please enter a valid email");
    });
    test("returns empty string when valid", () => {
      const input = "invalid.email@email.com";
      expect(getInvalidEmailMessage(input)).toBe("");
    });
  });

  describe("getInvalidNameMessage", () => {
    test("returns correct response if invalid", () => {
      const input = "";
      expect(getInvalidNameMessage(input)).toBe(
        "Name must not be empty and may only contain letters, spaces, and these: - _ ."
      );
    });
    test("returns empty string on valid response", () => {
      const input = "John Smith";
      expect(getInvalidNameMessage(input)).toBe("");
    });
  });

  describe("getInvalidPasswordMessage", () => {
    test("valid password, expect no error message", () => {
      const input = "Password$123";
      expect(getInvalidPasswordMessage(input)).toBe("");
    });
    test("Password too short - expect validation message", () => {
      const input = "Pwd$123";
      const expectedOutput = "Password requires at least 8 characters";
      expect(getInvalidPasswordMessage(input)).toBe(expectedOutput);
    });
    test("Password does not contain mixed casing - expect validation message", () => {
      const input = "password$123";
      const expectedOutput =
        "Password requires a mix of uppercase and lowercase";
      expect(getInvalidPasswordMessage(input)).toBe(expectedOutput);
    });

    test("password doesn't meet both requirements - expect validation message", () => {
      const input = "pwd123";
      const expectedOutput =
        "Password requires at least 8 characters and a mix of uppercase and lowercase";
      expect(getInvalidPasswordMessage(input)).toBe(expectedOutput);
    });
  });
});
