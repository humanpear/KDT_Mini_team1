import { DateRange, RangeKeyDict } from "react-date-range";
import ko from "date-fns/locale/ko";

type Props = {
  date: {
    startDate: Date;
    endDate: Date;
    key: string;
  };
  handleChangeDate: (rangesByKey: RangeKeyDict) => void;
};

export default function DatePicker({ date, handleChangeDate }: Props) {
  return (
    <DateRange
      locale={ko}
      ranges={[date]}
      onChange={handleChangeDate}
      minDate={new Date()}
      months={2}
      direction="horizontal"
    />
  );
}
