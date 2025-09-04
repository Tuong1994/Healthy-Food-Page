import { create, StateCreator } from "zustand";
import type { Comment } from "@/services/comment/type";
import type { List } from "@/services/type";
import helper from "@/helper";

interface CommentState {
  comments: List<Comment>;
  setComments: (comments: List<Comment>) => void;
}

const store: StateCreator<CommentState> = (set) => ({
  comments: helper.defaultPagingCollection(),
  setComments: (comments) => set((state) => ({ ...state, comments })),
});

const useCommentStore = create(store);

export default useCommentStore;
