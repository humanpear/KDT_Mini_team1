import { DateRange } from "react-date-range";
import ko from "date-fns/locale/ko";
import { OptionContext } from "../context/OptionProvider";
import { useContext } from "react";
import { formatDate } from "../util/date";

type DateProps = {
  months : number;
}

export default function DatePicker({months} : DateProps) {
  const { date, reservedDates, changeDate } = useContext(OptionContext);

  return (
    <DateRange
      locale={ko}
      ranges={[date]}
      onChange={changeDate}
      minDate={new Date()}
      months={months}
      direction="horizontal"
      disabledDay={(date) =>
        reservedDates ? reservedDates.includes(formatDate(date)) : false
      }
    />
  );
}
