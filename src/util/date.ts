import { format, intervalToDuration } from "date-fns";
import ko from "date-fns/locale/ko";

export function formatDate(date: Date) {
  return format(date, "yyyy-MM-dd");
}

export function formattedDate(date: Date) {
  return format(date, "M월 d일 (eee)", {
    locale: ko,
  });
}

export function getStayDuration(start: Date, end: Date) {
  return intervalToDuration({ start, end }).days;
}
