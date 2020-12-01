const convertDateStringToTimeAgo = ({
  date,
  precision = 1,
}: {
  date: string;
  precision?: number;
}) => {
  let timeAgo = "";
  const thenDate = new Date(date);
  if (Number.isInteger(thenDate.valueOf())) {
    const nowDate = new Date();
    let nOfStringsRequired = precision;
    const yearDiff = nowDate.getUTCFullYear() - thenDate.getUTCFullYear();
    const monthDiff = nowDate.getUTCMonth() - thenDate.getUTCMonth();
    const dateDiff = nowDate.getUTCDate() - thenDate.getUTCDate();
    const hourDiff = nowDate.getUTCHours() - thenDate.getUTCHours();
    const minuteDiff = nowDate.getUTCMinutes() - thenDate.getUTCMinutes();
    const secondDiff = nowDate.getUTCSeconds() - thenDate.getUTCSeconds();
    const millisecondDiff =
      nowDate.getUTCMilliseconds() - thenDate.getUTCMilliseconds();
    const addToTimeAgo = (number: number, baseName: string) => {
      timeAgo += `${number} ${
        Math.abs(number) > 1 ? baseName + "s" : baseName
      } `;
      nOfStringsRequired--;
    };
    if (nOfStringsRequired && yearDiff) {
      addToTimeAgo(yearDiff, "year");
    }
    if (nOfStringsRequired && monthDiff) {
      addToTimeAgo(monthDiff, "month");
    }
    if (nOfStringsRequired && dateDiff) {
      addToTimeAgo(dateDiff, "day");
    }
    if (nOfStringsRequired && hourDiff) {
      addToTimeAgo(hourDiff, "hour");
    }
    if (nOfStringsRequired && minuteDiff) {
      addToTimeAgo(minuteDiff, "minute");
    }
    if (nOfStringsRequired && secondDiff) {
      addToTimeAgo(secondDiff, "second");
    }
    if (nOfStringsRequired && millisecondDiff) {
      addToTimeAgo(millisecondDiff, "millisecond");
    }
    if (timeAgo) {
      timeAgo = `${timeAgo}ago`;
    }
  }
  return timeAgo;
};

export default convertDateStringToTimeAgo;
