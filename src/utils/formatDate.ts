export const formatDateCompleteVersion = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  };
  return new Date(dateString).toLocaleString("en-GB", options).replace(",", "");
};

export const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = {
    // day: "2-digit",
    // month: "2-digit",
    // year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  };
  return new Date(dateString).toLocaleString("en-GB", options).replace(",", "");
};

export const formatDateOnly = (dateString: string | undefined) => {
  if (!dateString) return "";
  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour12: false,
  };
  return new Date(dateString).toLocaleString("en-GB", options).replace(",", "");
};
