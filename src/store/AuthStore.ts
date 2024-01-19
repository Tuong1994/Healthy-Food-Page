import localStorageKey from "@/common/constant/storage";
import { Auth, AuthInfo } from "@/services/auth/type";
import { create, StateCreator } from "zustand";

interface AuthState {
  auth: Auth;
  setAuth: (auth: Auth) => void;
  resetAuth: () => void;
}

const defaultAuth = { accessToken: "", expired: 0, info: {} as AuthInfo, isAuth: false };

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
  setAuth: (auth) => set((state) => ({ ...state, auth })),
  resetAuth: () => set((state) => ({ ...state, auth: defaultAuth })),
});

const useAuthStore = create(store);

export default useAuthStore;
