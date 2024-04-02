import { DateRange } from "react-date-range";
import ko from "date-fns/locale/ko";
import { OptionContext } from "../context/OptionProvider";
import { useContext } from "react";
import { formatDate } from "../util/date";

export default function DatePicker() {
  const { date, reservedDates, changeDate } = useContext(OptionContext);

  return (
    <DateRange
      locale={ko}
      ranges={[date]}
      onChange={changeDate}
      minDate={new Date()}
      months={2}
      direction="horizontal"
      disabledDay={(date) =>
        reservedDates ? reservedDates.includes(formatDate(date)) : false
      }
    />
  );
}
