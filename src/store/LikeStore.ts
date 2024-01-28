import { create, StateCreator } from "zustand";
import type { Like } from "@/services/like/type";
import type { Paging } from "@/services/type";

interface LikeState {
  likesPaging: Paging<Like>;
  setLikesPaging: (data: Paging<Like>) => void;
}

const store: StateCreator<LikeState> = (set) => ({
  likesPaging: { totalItems: 0, page: 0, limit: 0, items: [] },
  setLikesPaging: (data) => set((state) => ({ ...state, likesPaging: data })),
});

const useLikeStore = create(store);

export default useLikeStore;
