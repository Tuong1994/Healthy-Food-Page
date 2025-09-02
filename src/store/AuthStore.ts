import localStorageKey from "@/common/constant/storage";
import { Auth, AuthInfo } from "@/services/auth/type";
import { create, StateCreator } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  auth: Auth;
  setAuth: (auth: Auth) => void;
  resetAuth: () => void;
}

const defaultAuth: Auth = { expired: 0, info: {} as AuthInfo, isAuth: false };

const storage = () => {
  let authStorage: Auth = defaultAuth;
  if (typeof window === "undefined") return authStorage;
  if (localStorage.getItem(localStorageKey.AUTH)) {
    authStorage = JSON.parse(localStorage.getItem(localStorageKey.AUTH) ?? "");
  }
  return authStorage;
};

const store: StateCreator<AuthState> = (set) => ({
  auth: storage(),
  setAuth: (authPayload) => set((state) => ({ ...state, auth: { ...state.auth, ...authPayload } })),
  resetAuth: () => set((state) => ({ ...state, auth: defaultAuth })),
});

const useAuthStore = create(
  persist(store, {
    name: localStorageKey.AUTH,
  })
);

export default useAuthStore;
