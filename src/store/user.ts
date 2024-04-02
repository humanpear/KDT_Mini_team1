import { create } from "zustand";
import { LoginUser } from "../types/user";

type State = {
  loginUser: LoginUser | null;
};

type Action = {
  setLoginUser: (user: LoginUser | null) => void;
};

export const useUserStore = create<State & Action>((set) => ({
  loginUser: null,
  setLoginUser: (user: LoginUser | null) => set(() => ({ loginUser: user })),
}));
