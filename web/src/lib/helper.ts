import { format } from "date-fns";

const DATE_FORMAT = "d MMM yyyy, HH:mm";

export function extractTime(dateString: string) {
  const string = format(new Date(dateString), DATE_FORMAT);
  return string;
}
