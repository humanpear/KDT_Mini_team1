export type Room = {
  id: string;
  max_capacity: string;
  price: number;
  stock?: number;
};

export type AccommodationInfo = {
  contentid: string;
  title: string;
  description: string;
  address: string;
  tel: string;
  image1: string;
  category?: string;
  room: Room[];
};

export type ReservationInfo = {
  id: string;
  room_id: string;
  capacity: "2";
  start_date: string;
  end_date: string;
  room_price: number;
  total_price: number;
};

export type AccommodationWithOption = {
  accommodation: AccommodationInfo;
  reservation: ReservationInfo;
};
