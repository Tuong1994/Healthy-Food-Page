import { Dispatch, FC, SetStateAction, useState } from "react";
import { Space, Typography, Loading } from "@/components/UI";
import type { Comment, CommentFormData } from "@/services/comment/type";
import type { ActionType, ActiveComment } from ".";
import { HiReply } from "react-icons/hi";
import { HiPencil, HiTrash } from "react-icons/hi2";
import CommentAuthor from "./CommentAuthor";
import CommentControl from "./CommentControl";
import CommentList from "./CommentList";
import useAuthStore from "@/store/AuthStore";

const { Paragraph } = Typography;

const { Spinner } = Loading;

const ICON_SIZE = 14;

interface CommentItemProps {
  comment: Comment;
  comments: Comment[];
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

const CommentItem: FC<CommentItemProps> = ({
  comment,
  comments = [],
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
  const auth = useAuthStore((state) => state.auth);

  const { isAuth, info } = auth;

  const customerId = info.id ?? "";

  const canReply = isAuth;

  const canEdit = comment.customerId === customerId;

  const canRemove = comment.customerId === customerId;

  const isReply = activeComment.id === comment.id && activeComment.type === "reply";

  const isEdit = activeComment.id === comment.id && activeComment.type === "edit";

  const childComments = comments.filter((child) => child.parentId === comment.id);

  const handleChangeInput = (text: string) => setComment((prev) => ({ ...prev, content: text }));

  const handleAction = (type: ActionType) => {
    if (type === "edit" || type === "reply") setComment({ ...comment });
    setActiveComment({ ...activeComment, id: comment.id ?? "", type });
  };

  const handleCancel = () => setActiveComment({ ...activeComment, id: "", type: null });

  return (
    <div className="comment-item">
      <div className="item-content">
        <CommentAuthor comment={comment} />

        {!isEdit && (
          <div className="content-text">
            <Paragraph>{comment.content}</Paragraph>
          </div>
        )}

        {isEdit && (
          <CommentControl
            hasAuthor={false}
            isRoot={false}
            defaultValue={comment.content}
            saveButtonProps={{ loading: updateLoading }}
            onChangeInput={handleChangeInput}
            onSave={handleUpdate}
            onCancel={handleCancel}
          />
        )}

        {canReply && (
          <Space>
            {canReply && (
              <button className="content-btn" onClick={() => handleAction("reply")}>
                <HiReply size={ICON_SIZE} />
              </button>
            )}
            {canEdit && (
              <button className="content-btn" onClick={() => handleAction("edit")}>
                <HiPencil size={ICON_SIZE} />
              </button>
            )}
            {canRemove && (
              <button className="content-btn" onClick={() => handleRemove(comment.id ?? "")}>
                {removeLoading ? <Spinner /> : <HiTrash size={ICON_SIZE} />}
              </button>
            )}
          </Space>
        )}

        {isReply && (
          <CommentControl
            hasAuthor={false}
            isRoot={false}
            saveButtonProps={{ loading: createLoading }}
            onSave={() => handleCreate(comment.id)}
            onCancel={handleCancel}
          />
        )}
      </div>

      {childComments.length > 0 && (
        <div className="item-child">
          <div className="child-expand"></div>
          <CommentList
            fullComments={comments}
            rootComments={childComments}
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
        </div>
      )}
    </div>
  );
};

export default CommentItem;
