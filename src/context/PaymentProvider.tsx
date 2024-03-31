import { ReactNode, createContext, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { formatDate, stayDuration } from "../util/date";
import { RangeKeyDict } from "react-date-range";
import { AccommodationInfo, Room } from "../types/AccommodationInfo";

export const PaymentContext = createContext<{
  date: {
    startDate: Date;
    endDate: Date;
    key: string;
  };
  room: string;
  guest: string;
  selectedRoom: Room | undefined;
  roomPrice: number | undefined;
  totalPrice: number;
  charge: number;
  finalPrice: number;
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
  selectedRoom: {
    id: 0,
    max_capacity: 0,
    price: 0,
    stock: 0,
  },
  roomPrice: 0,
  totalPrice: 0,
  charge: 0,
  finalPrice: 0,
  changeDate: () => {},
  changeRoom: () => {},
  changeGuest: () => {},
});

type Props = {
  product: AccommodationInfo;
  children: ReactNode;
};

export default function PaymentProvider({ product, children }: Props) {
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

  const totalPrice =
    roomPrice! * (stayDuration(date.startDate, date.endDate) || 0);
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
    selectedRoom,
    roomPrice,
    totalPrice,
    charge,
    finalPrice,
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
