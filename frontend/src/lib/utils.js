// Convert any dynamic date into formated date
export const formateDate = (dateObj) => {
  const date = new Date(dateObj);
  return date.toLocaleString("en-us", {
    day: "2-digit",
    month: "short",
    year: "2-digit",
  });
};
