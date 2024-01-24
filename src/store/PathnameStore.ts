import { create, StateCreator } from "zustand";
import url from "@/common/constant/url";

const { HOME } = url;

interface PathnameState {
  previousPath: string;
  setPreviousPath: (path: string) => void;
}

const store: StateCreator<PathnameState> = (set) => ({
  previousPath: HOME,
  setPreviousPath: (path) => set((state) => ({ ...state, previousPath: path })),
});

const usePathnameStore = create(store);

export default usePathnameStore;
