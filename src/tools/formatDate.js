import moment from "moment";

export function formatDate(date) {
  if (!date) {
    return "";
  }
  return moment(date).format("YYYY-MM-DD");
}