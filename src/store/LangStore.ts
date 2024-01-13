import { create, StateCreator } from "zustand";
import { Lang } from "@/common/type";
import { ELang } from "@/common/enum";
import en from "@/common/lang/en";
import vn from "@/common/lang/vn";

interface LangState {
  lang: Lang;
  type: ELang;
  switchLang: (type: ELang) => void;
}

const store: StateCreator<LangState> = (set) => ({
  lang: en,
  type: ELang.EN,

  switchLang: (type: ELang) => {
    if (type === ELang.EN) return set((state) => ({ ...state, type, lang: en }));
    set((state) => ({ ...state, type, lang: vn }));
  },
});

const useLangStore = create(store);

export default useLangStore;
