import { getCookie, setCookie } from "./cookie";

describe("document cookie test", () => {
  test("getCookie returns correct value", () => {
    Object.defineProperty(document, "cookie", {
      get: jest.fn().mockImplementation(() => {
        return "some_cookie=some_value";
      }),
    });
    const result = getCookie("some_cookie");
    expect(result).toBe("some_value");
  });
});
