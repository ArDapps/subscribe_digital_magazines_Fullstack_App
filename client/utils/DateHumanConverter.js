import dayjs from "dayjs";

export const DateHumanConverter = (date) => {
  const createDate = dayjs(date);

  const formattedDate = createDate.format("dddd, MMMM D, YYYY");
  const formattedTime = createDate.format("h:mm:ss A");
  console.log("Formatted Date:", formattedDate);
  console.log("Formatted Time:", formattedTime);
  return formattedDate + formattedTime;
};
