export type AccommodationInfo = {
  title: string;
  address: string;
  tel: string;
  image1: string;
  description: string;
  category?: string;
  contentid: string;
  length?: number;
  room: Room[];
};

type Room = {
  id: string;
  max_capacity: number;
  price: number;
  stock: number;
};
