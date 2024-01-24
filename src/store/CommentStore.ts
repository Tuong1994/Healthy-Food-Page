import { create, StateCreator } from "zustand";
import type { Comment } from "@/services/comment/type";
import type { List } from "@/services/type";

interface CommentState {
  comments: List<Comment>;
  setComments: (comments: List<Comment>) => void;
}

const store: StateCreator<CommentState> = (set) => ({
  comments: { totalItems: 0, page: 1, limit: 10, items: [] },
  setComments: (comments) => set((state) => ({ ...state, comments })),
});

const useCommentStore = create(store);

export default useCommentStore;
