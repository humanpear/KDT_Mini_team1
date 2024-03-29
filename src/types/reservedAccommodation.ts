import { AccommodationInfo } from "./AccommodationInfo";

export type ReservedAccommodation = AccommodationInfo & {
  startDate: string;
  endDate: string;
  guest: string;
};
