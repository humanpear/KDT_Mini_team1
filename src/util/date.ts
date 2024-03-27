import { format } from "date-fns";
import ko from "date-fns/locale/ko";

export function formatDate(date: Date) {
	return format(date, "yyyy-MM-dd");
}

export function formattedDate(date: Date) {
	return format(date, "MM월 dd일 (eee)", {
		locale: ko,
	});
}
