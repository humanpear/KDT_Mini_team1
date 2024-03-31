import { ReactNode, createContext, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { formatDate, getStayDuration } from "../util/date";
import { RangeKeyDict } from "react-date-range";
import { AccommodationInfo, Room } from "../types/AccommodationInfo";

export const OptionContext = createContext<{
  date: {
    startDate: Date;
    endDate: Date;
    key: string;
  };
  room: string;
  guest: string;
  selectedRoom: Room | undefined;
  stayDuration: number | undefined;
  roomPrice: number | undefined;
  totalPrice: number;
  charge: number;
  finalPrice: number;
  changeDate: (ranges: RangeKeyDict) => void;
  changeRoom: (value: string) => void;
  changeGuest: (value: number) => void;
  clearDate: () => void;
}>({
  date: {
    startDate: new Date(),
    endDate: new Date(),
    key: "",
  },
  room: "",
  guest: "",
  selectedRoom: {
    id: 0,
    max_capacity: 0,
    price: 0,
    stock: 0,
  },
  stayDuration: 0,
  roomPrice: 0,
  totalPrice: 0,
  charge: 0,
  finalPrice: 0,
  changeDate: () => {},
  changeRoom: () => {},
  changeGuest: () => {},
  clearDate: () => {},
});

type Props = {
  product: AccommodationInfo;
  children: ReactNode;
};

export default function OptionProvider({ product, children }: Props) {
  const [query, setQuery] = useSearchParams();

  const [date, setDate] = useState({
    startDate: new Date(query.get("check_in") as string),
    endDate: new Date(query.get("check_out") as string),
    key: "selection",
  });

  const [room, setRoom] = useState(query.get("room") || "");
  const [guest, setGuest] = useState(query.get("guest") || "");

  const { rooms } = product;

  const selectedRoom = rooms.find((r) => r.max_capacity.toString() === room);

  const roomPrice = selectedRoom?.price;

  const stayDuration = getStayDuration(date.startDate, date.endDate);

  const totalPrice = roomPrice! * (stayDuration || 0);
  const charge = totalPrice / 10;

  const finalPrice = totalPrice + charge;

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
    const newGuest = (+guest + value).toString();
    const isValid = value === 1 ? +room > +guest : 1 < +guest;

    setGuest((prev) => (isValid ? (+prev + value).toString() : prev));
    setQuery((prevQuery) => ({
      ...Object.fromEntries([...prevQuery]),
      ...(isValid && { guest: newGuest }),
    }));
  };

  const clearDate = () => {
    setDate({
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    });
  };

  const paymentCtx = {
    date,
    room,
    guest,
    selectedRoom,
    roomPrice,
    stayDuration,
    totalPrice,
    charge,
    finalPrice,
    changeDate,
    changeRoom,
    changeGuest,
    clearDate,
  };

  return (
    <OptionContext.Provider value={paymentCtx}>
      {children}
    </OptionContext.Provider>
  );
}
