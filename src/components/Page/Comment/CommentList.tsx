import { Dispatch, FC, Fragment, SetStateAction } from "react";
import type { Comment, CommentFormData } from "@/services/comment/type";
import type { ActiveComment } from ".";
import CommentItem from "./CommentItem";

interface CommentListProps {
  rootComments: Comment[];
  fullComments: Comment[];
  activeComment: ActiveComment;
  createLoading: boolean;
  updateLoading: boolean;
  removeLoading: boolean;
  handleCreate: (parentId?: string) => void;
  handleUpdate: () => void;
  handleRemove: (id: string) => void;
  setComment: Dispatch<SetStateAction<CommentFormData>>;
  setActiveComment: Dispatch<SetStateAction<ActiveComment>>;
}

const CommentList: FC<CommentListProps> = ({
  rootComments,
  fullComments,
  activeComment,
  createLoading,
  updateLoading,
  removeLoading,
  handleCreate,
  handleUpdate,
  handleRemove,
  setComment,
  setActiveComment,
}) => {
  const renderComment = () => {
    return rootComments.map((comment) => (
      <CommentItem
        key={comment.id}
        comment={comment}
        comments={fullComments}
        activeComment={activeComment}
        createLoading={createLoading}
        updateLoading={updateLoading}
        removeLoading={removeLoading}
        handleCreate={handleCreate}
        handleUpdate={handleUpdate}
        handleRemove={handleRemove}
        setComment={setComment}
        setActiveComment={setActiveComment}
      />
    ));
  };

  return <Fragment>{renderComment()}</Fragment>;
};

export default CommentList;
