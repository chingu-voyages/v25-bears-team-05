const convertDateStringToTimeAgo = ({
  date,
  precision = 1,
}: {
  date: string;
  precision?: number;
}) => {
  const now = new Date();
  const then = new Date(date);
  if (!Number.isInteger(then.valueOf())) {
    throw Error(`Invalid date value ${date}`);
  }
  let nOfStringsRequired = precision;
  let timeAgo = "";
  const yearDiff = now.getUTCFullYear() - then.getUTCFullYear();
  const monthDiff = now.getUTCMonth() - then.getUTCMonth();
  const dateDiff = now.getUTCDate() - then.getUTCDate();
  const hourDiff = now.getUTCHours() - then.getUTCHours();
  const minuteDiff = now.getUTCMinutes() - then.getUTCMinutes();
  const secondDiff = now.getUTCSeconds() - then.getUTCSeconds();
  const millisecondDiff = now.getUTCMilliseconds() - then.getUTCMilliseconds();
  const addToTimeAgo = (number: number, baseName: string) => {
    timeAgo += `${number} ${Math.abs(number) > 1 ? baseName + "s" : baseName} `;
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
  return timeAgo;
};

export default convertDateStringToTimeAgo;
