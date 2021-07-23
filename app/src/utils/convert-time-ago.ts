const dayjs = require("dayjs");
const relativeTime = require("dayjs/plugin/relativeTime");

dayjs.extend(relativeTime);

function convertDateStringToTimeAgo({
  date,
  nowTimeStamp,
}: {
  date: string;
  nowTimeStamp?: string | null;
}): string {
  const dateStringToDate = new Date(date);
  const nowTimestampStringToDate = new Date(nowTimeStamp!);
  return !nowTimeStamp
    ? dayjs(dateStringToDate).fromNow()
    : dayjs(dateStringToDate).from(nowTimestampStringToDate);
}

export default convertDateStringToTimeAgo;
