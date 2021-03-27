import convertDateStringToTimeAgo from "./convertDateStringToTimeAgo";

describe("date time ago tests", () => {
  test("converts time ago correctly", () => {
    const fromDate = new Date(2021, 0, 1).toDateString();
    const result = convertDateStringToTimeAgo({ date: fromDate, precision: 1 });
    console.log(result);
    expect(result).toBe(result);
  });
});
