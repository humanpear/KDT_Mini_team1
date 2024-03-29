import { DateRange } from "react-date-range";
import ko from "date-fns/locale/ko";
import { PaymentContext } from "../context/PaymentProvider";
import { useContext } from "react";

export default function DatePicker() {
  const { date, changeDate } = useContext(PaymentContext);

  return (
    <DateRange
      locale={ko}
      ranges={[date]}
      onChange={changeDate}
      minDate={new Date()}
      months={2}
      direction="horizontal"
    />
  );
}
