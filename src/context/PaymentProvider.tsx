import { ReactNode, createContext, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { formatDate } from "../util/date";
import { RangeKeyDict } from "react-date-range";

export const PaymentContext = createContext<{
  date: {
    startDate: Date;
    endDate: Date;
    key: string;
  };
  room: string;
  guest: string;
  changeDate: (ranges: RangeKeyDict) => void;
  changeRoom: (value: string) => void;
  changeGuest: (value: number) => void;
}>({
  date: {
    startDate: new Date(),
    endDate: new Date(),
    key: "",
  },
  room: "",
  guest: "",
  changeDate: () => {},
  changeRoom: () => {},
  changeGuest: () => {},
});

type Props = {
  children: ReactNode;
};

export default function PaymentProvider({ children }: Props) {
  const [query, setQuery] = useSearchParams();

  const [date, setDate] = useState({
    startDate: new Date(query.get("check_in") as string),
    endDate: new Date(query.get("check_out") as string),
    key: "selection",
  });

  const [room, setRoom] = useState(query.get("room") || "");
  const [guest, setGuest] = useState(query.get("guest") || "");

  const changeDate = (ranges: RangeKeyDict) => {
    const { startDate, endDate } = ranges.selection;
    setDate({ startDate: startDate!, endDate: endDate!, key: "selection" });
    setQuery((prevQuery) => ({
      ...Object.fromEntries([...prevQuery]),
      check_in: formatDate(ranges.selection.startDate!),
      check_out: formatDate(ranges.selection.endDate!),
    }));
  };

  const changeRoom = (value: string) => {
    setRoom(value);
    setQuery((prevQuery) => ({
      ...Object.fromEntries([...prevQuery]),
      room: value,
    }));
  };

  const changeGuest = (value: number) => {
    setGuest((prev) => (+prev! + value).toString());
    setQuery((prevQuery) => ({
      ...Object.fromEntries([...prevQuery]),
      guest: (+prevQuery.get("guest")! + value).toString(),
    }));
  };

  const paymentCtx = {
    date,
    room,
    guest,
    changeDate,
    changeRoom,
    changeGuest,
  };

  return (
    <PaymentContext.Provider value={paymentCtx}>
      {children}
    </PaymentContext.Provider>
  );
}
