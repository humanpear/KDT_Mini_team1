import { ReactNode, createContext, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { formatDate, getStayDuration } from "../util/date";
import { RangeKeyDict } from "react-date-range";
import {
  AccommodationInfo,
  OptionInfo,
  Room,
} from "../types/AccommodationInfo";
import { useQuery } from "@tanstack/react-query";
import { getRoomInfo } from "../util/http";
import { addDays } from "date-fns";

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
  reservedDates: string[];
  isInvalidDate: boolean;
  isSameDate: boolean;
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
  reservedDates: [],
  isInvalidDate: false,
  isSameDate: false,
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

  const { data } = useQuery({
    queryKey: ["room", selectedRoom!.id],
    queryFn: () => getRoomInfo(selectedRoom!.id),
  });

  const reservationRooms = data?.body.map((r: OptionInfo) => ({
    ...r,
    max_capacity: selectedRoom?.max_capacity,
  }));

  const disabledDates = reservationRooms?.map((r: OptionInfo) => ({
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
    ?.map((d: { startDate: Date; endDate: Date }) =>
      getAllDatesBetween(d.startDate, d.endDate)
    )
    .flat();

  const isInvalidDate = getAllDatesBetween(date.startDate, date.endDate).some(
    (item) => reservedDates?.includes(item)
  );

  const isSameDate = formatDate(date.startDate) === formatDate(date.endDate);

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
    if (value === "2" && guest === "4") {
      changeGuest(-2);
    }
    if (value === "2" && guest === "3") {
      changeGuest(-1);
    }
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
    reservedDates,
    isInvalidDate,
    isSameDate,
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
