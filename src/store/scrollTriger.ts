import { atom } from "recoil";

interface ScrollTriger {
  target: string | null;
}

export const scrollSelectState = atom<ScrollTriger>({
  key: "scrollSelectState",
  default: {
    target: null,
  },
});
