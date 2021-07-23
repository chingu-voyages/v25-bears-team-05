import { isPasswordValid } from "./passwordValidations";

describe("password validation", () => {
  test("returns correct true if password meets requirements", () => {
    const input = "Password$123";
    expect(isPasswordValid(input)).toBe(true);
  });
  test("turns false if password is not meeting requirements", () => {
    const input = "pasword123";
    expect(isPasswordValid(input)).toBe(false);
  });
});
