export type Room = {
	id: string;
	max_capacity: string;
	price: number;
	stock?: number;
};

export type accommodation = {
	id: string;
	title: string;
	address: string;
	image1: string;
	description: string;
	category?: string;
	tel: string;
};

export type AccommodationInfo = {
	id: string;
	title: string;
	address: string;
	image1: string;
	description: string;
	category?: string;
	tel: string;
	length?: number;
	accommodation: accommodation;
	rooms: Room[];
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
