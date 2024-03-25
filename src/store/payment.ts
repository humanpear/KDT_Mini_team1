import { create } from "zustand";

type State = {
  paymentInfo: {
    startDate: string | null;
    endDate: string | null;
    guest: number;
  };
};

type Action = {
  setStartDate: (date: string) => void;
  setEndDate: (date: string) => void;
  setGuest: (num: number) => void;
};

export const usePaymentStore = create<State & Action>((set) => ({
  paymentInfo: {
    startDate: null,
    endDate: null,
    guest: 1,
    selectedAccommodation: null,
  },
  setStartDate: (date) =>
    set((state) => ({
      paymentInfo: { ...state.paymentInfo, startDate: date },
    })),
  setEndDate: (date) =>
    set((state) => ({
      paymentInfo: { ...state.paymentInfo, endDate: date },
    })),
  setGuest: (num) =>
    set((state) => ({
      paymentInfo: {
        ...state.paymentInfo,
        guest: state.paymentInfo.guest + num,
      },
    })),
}));
