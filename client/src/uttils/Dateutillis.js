import { format } from "date-fns";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import advancedFormat from "dayjs/plugin/advancedFormat";
import localeData from "dayjs/plugin/localeData";
import weekday from "dayjs/plugin/weekday";
import weekOfYear from "dayjs/plugin/weekOfYear";
import weekYear from "dayjs/plugin/weekYear";

dayjs.extend(customParseFormat);
dayjs.extend(advancedFormat);
dayjs.extend(weekday);
dayjs.extend(localeData);
dayjs.extend(weekOfYear);
dayjs.extend(weekYear);

const dateFormat = "dd/MM/yyyy";
// const timeFormat = "hh:mm:ss";
const timePickerFormat = "HH:mm:ss";
const fullDateFormat = "dd/MM/yyyy hh:mm:ss aa";
const timeDateFormat = "dd/MM/yyyy hh:mm aa";
const dbDateFormat = "yyyy-MM-dd";
export const datePickerDateFormat = "DD/MM/YYYY";

/**
 * This function convert the date to
 * 'dd/MM/yyyy' format
 * @param {String Date} date
 * @returns
 */
export const convertToDateFormat = (date) => {
  if (date) {
    const value = new Date(date);
    return format(value, dateFormat);
  }
  return "";
};

/**
 * This function return the today date with defined format
 * @returns 'current date with format '
 */
export const todayWithDateFormat = () => {
  const value = new Date();
  return format(value, dateFormat);
};

/**
 * This function return the today date with defined format
 * @returns 'current date with format '
 */
export const todayWithDBDateFormat = () => {
  const value = new Date();
  return format(value, dbDateFormat);
};

// export const toDBDateFormat = (value) => {
//   if ("$d" in value) {
//     return format(value.$d, dbDateFormat);
//   } else if ("_d" in value) {
//     return format(value._d, dbDateFormat);
//   }
//   return "";
// };
export const toDBDateFormat = (value) => {
  if (value && ("$d" in value || "_d" in value)) {
    return format(value.$d || value._d, dbDateFormat);
  }
  return "";
};
/**
 * This function get the ISO formatted date time and
 * convert to the specific the datetime format.
 * @param {string date} dateTime
 * @returns
 */
export const toFullDateTime = (dateTime) => {
  if (dateTime) {
    const value = new Date(dateTime);
    return format(value, fullDateFormat);
  }
  return "";
};
export function convertToFullDateTime(dateString) {
  const options = {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  };
  return new Date(dateString).toLocaleDateString("en-US", options);
}

export const toDateTime = (dateTime) => {
  if (dateTime) {
    const value = new Date(dateTime);
    return format(value, timeDateFormat);
  }
  return "";
};

/**
 * This function convert the time to
 * 'HH:mm:ss' format
 * @param {String Date} time
 * @returns
 */
export const convertToTimeFormat = (time) => {
  if (time) {
    const value = new Date(time);
    return format(value, timePickerFormat);
  }
  return "";
};
export const formatDate = (date) => {
  return date.toISOString().split("T")[0];
};

/**
 * This function convert the time to
 * 'HH:mm:ss' format
 * @param {String Date} time
 * @returns
 */
export const convertToTimePickerFormat = (time) => {
  if (time) {
    return dayjs(time, timePickerFormat);
  }
  return dayjs("00:00:00", timePickerFormat);
};

/**
 * This function convert the time to
 * 'HH:mm:ss' format
 * @param {String Date} time
 * @returns
 */
export const convertToDatePickerFormat = (date) => {
  if (date) {
    return dayjs(new Date(date));
  }
  return dayjs(new Date());
};
/*This function used make date disabled from current date to target date*/
export const disabledDate = (current, targetDate) => {
  return current && current > dayjs(targetDate, "YYYY-MM-DD");
};
/*This function used make date disabled before  target date*/
export const disabledDateBefore = (current, targetDate) => {
  return current && current < dayjs(targetDate, "YYYY-MM-DD");
};
export const convertToDateTimeFormat = (dateTimeString) => {
  if (!dateTimeString) return "";

  const dateObj = new Date(dateTimeString);

  const day = String(dateObj.getDate()).padStart(2, "0");
  const month = String(dateObj.getMonth() + 1).padStart(2, "0");
  const year = dateObj.getFullYear();

  const hours = String(dateObj.getHours()).padStart(2, "0");
  const minutes = String(dateObj.getMinutes()).padStart(2, "0");
  const seconds = String(dateObj.getSeconds()).padStart(2, "0");

  return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
};
