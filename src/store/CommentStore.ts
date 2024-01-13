import { create, StateCreator } from "zustand";
import { Comment } from "@/services/comment/type";

interface CommentState {
  comments: Comment[];
}

const store: StateCreator<CommentState> = () => ({
  comments: [
    { id: "1", parentId: "", content: "Root comment", customerId: "1", productId: "" },
    { id: "2", parentId: "1", content: "Child comment", customerId: "", productId: "" },
    { id: "3", parentId: "2", content: "Child comment", customerId: "", productId: "" },
    { id: "4", parentId: "", content: "Root comment", customerId: "1", productId: "" },
    { id: "5", parentId: "4", content: "Child comment", customerId: "", productId: "" },
    { id: "6", parentId: "4", content: "Child comment", customerId: "", productId: "" },
    { id: "7", parentId: "", content: "Child comment", customerId: "", productId: "" },
    { id: "8", parentId: "", content: "Child comment", customerId: "", productId: "" },
    { id: "9", parentId: "", content: "Child comment", customerId: "", productId: "" },
    { id: "10", parentId: "", content: "Child comment", customerId: "", productId: "" },
  ],
});

const useCommentStore = create(store);

export default useCommentStore;
