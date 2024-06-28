export const useDateFormat = (date: any) => {
  let format = new Date(date).toLocaleDateString("ru");
  return format;
};
