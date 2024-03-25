import { AccommodationInfo } from "./AccommodationInfo";

export type SelectedAccommodation = AccommodationInfo & {
  startDate: string;
  endDate: string;
  guest: number;
};
