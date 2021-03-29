import convertDateStringToTimeAgo from "./convert-time-ago";

describe("date time ago tests using dayjs module", () => {
  test("converts time ago seconds", () => {
    const result = convertDateStringToTimeAgo({
      nowTimeStamp: "March 22, 2021, 13:00:50",
      date: "March 22, 2021, 13:00:10",
    });
    expect(result).toBe("a few seconds ago");
  });
  test("converts time ago minutes", () => {
    const result = convertDateStringToTimeAgo({
      nowTimeStamp: "March 1, 2021, 00:05:00",
      date: "March 1, 2021, 00:00:00",
    });
    expect(result).toBe("5 minutes ago");
  });
  test("converts time ago hours", () => {
    const result = convertDateStringToTimeAgo({
      nowTimeStamp: "December 1, 2021, 12:05:00",
      date: "Dec 1, 2021, 00:00:00",
    });
    expect(result).toBe("12 hours ago");
  });
  test("converts time ago months", () => {
    const result = convertDateStringToTimeAgo({
      nowTimeStamp: "Dec 1, 2021",
      date: "2021-10-1",
    });
    expect(result).toBe("2 months ago");
  });
  test("converts time ago months - larger interval", () => {
    const result = convertDateStringToTimeAgo({
      nowTimeStamp: "Dec 1, 2021",
      date: "2020-12-30",
    });
    expect(result).toBe("a year ago");
  });
  test("converts time ago years", () => {
    const result = convertDateStringToTimeAgo({
      date: "2010-02-11",
      nowTimeStamp: "1 March, 2021",
    });
    expect(result).toBe("11 years ago");
  });
});
