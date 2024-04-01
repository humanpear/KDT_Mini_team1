import { DateRange } from "react-date-range";
import ko from "date-fns/locale/ko";
import { OptionContext } from "../context/OptionProvider";
import { useContext } from "react";
import { formatDate } from "../util/date";
import { addDays } from "date-fns";

export default function DatePicker() {
  const { date, reservationRooms, changeDate } = useContext(OptionContext);
  const disabledDates = reservationRooms?.map((r) => ({
    startDate: new Date(r.start_date),
    endDate: new Date(r.end_date),
  }));

  function getAllDatesBetween(startDate: Date, endDate: Date) {
    const dates = [];
    let currentDate = new Date(startDate);

    while (currentDate <= endDate) {
      dates.push(formatDate(currentDate));
      currentDate = addDays(currentDate, 1);
    }

    return dates;
  }

  const reservedDates = disabledDates
    ?.map((d) => getAllDatesBetween(d.startDate, d.endDate))
    .flat();

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
