export type Room = {
  id: string;
	max_capacity: string;
	price: number;
  stock?: number;
};

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
