import { format } from "date-fns";
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
  const diffTime = Math.abs(end.getTime() - start.getTime());

  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}
