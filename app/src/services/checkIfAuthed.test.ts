import checkIfAuthed from "./checkIfAuthed";
const axios = require("axios");
jest.mock("axios");

afterEach(() => {
  jest.clearAllMocks();
});

describe("check if authed tests", () => {
  test("function returns true as expected", async () => {
    axios.mockResolvedValue({ status: 200, data: { authed: true } });
    const result = await checkIfAuthed();
    expect(result).toBe(true);
  });
  test("function returns false as expected", async () => {
    axios.mockResolvedValue({ status: 200, data: { authed: false } });
    const result = await checkIfAuthed();
    expect(result).toBe(false);
  });
});
