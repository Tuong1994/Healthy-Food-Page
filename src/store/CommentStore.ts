import { create, StateCreator } from "zustand";
import type { Comment } from "@/services/comment/type";
import type { Paging } from "@/services/type";

interface CommentState {
  comments: Paging<Comment>;
  setComments: (comments: Paging<Comment>) => void;
}

const store: StateCreator<CommentState> = (set) => ({
  comments: { totalItems: 0, page: 1, limit: 10, items: [] },
  setComments: (comments) => set((state) => ({ ...state, comments })),
});

const useCommentStore = create(store);

export default useCommentStore;
