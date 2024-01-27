import { create, StateCreator } from "zustand";
import { City } from "@/services/city/type";
import { District } from "@/services/district/type";
import { Ward } from "@/services/ward/type";

interface LocationState {
  cities: City[];
  districts: District[];
  wards: Ward[];
  setCities: (cities: City[]) => void;
  setDistricts: (districts: District[]) => void;
  setWards: (wards: Ward[]) => void;
}

const store: StateCreator<LocationState> = (set) => ({
  cities: [],
  districts: [],
  wards: [],
  setCities: (cities) => set((state) => ({ ...state, cities })),
  setDistricts: (districts) => set((state) => ({ ...state, districts })),
  setWards: (wards) => set((state) => ({ ...state, wards })),
});

const useLocationStore = create(store);

export default useLocationStore;
