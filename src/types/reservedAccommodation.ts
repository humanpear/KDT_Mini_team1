import { AccommodationInfo } from "./AccommodationInfo";

export type reservedAccommodation = AccommodationInfo & {
  startDate: string;
  endDate: string;
  guest: string;
};
