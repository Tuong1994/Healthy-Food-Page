import React from "react";
import { UI } from "@/components";
import { Comment } from "@/services/comment/type";
import { HiReply } from "react-icons/hi";
import { HiPencil, HiTrash } from "react-icons/hi2";
import CommentAuthor from "./CommentAuthor";
import CommentControl from "./CommentControl";
import CommentList from "./CommentList";

const { Space, Typography } = UI;

const { Paragraph } = Typography;

type ActionType = "reply" | "edit";

type ActiveComment = {
  id: string;
  type: ActionType | null;
};

interface CommentItemProps {
  comment: Comment;
  comments: Comment[];
}

const ICON_SIZE = 14;

const userId = "1";

const isAuth = true;

const CommentItem: React.FC<CommentItemProps> = ({ comment, comments = [] }) => {
  const [activeComment, setActiveComment] = React.useState<ActiveComment>({
    id: comment.id as string,
    type: null,
  });

  const canReply = isAuth;

  const canEdit = comment.customerId === userId;

  const canRemove = comment.customerId === userId;

  const isReply = activeComment.id === comment.id && activeComment.type === "reply";

  const isEdit = activeComment.id === comment.id && activeComment.type === "edit";

  const childComments = comments.filter((child) => child.parentId === comment.id);

  const handleAction = (type: ActionType) => setActiveComment({ ...activeComment, type });

  const handleCancel = () => setActiveComment({ ...activeComment, type: null });

  return (
    <div className="comment-item">
      <div className="item-content">
        <CommentAuthor />

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
              <button className="content-btn">
                <HiTrash size={ICON_SIZE} />
              </button>
            )}
          </Space>
        )}

        {isReply && <CommentControl hasAuthor={false} isRoot={false} onCancel={handleCancel} />}
      </div>

      {childComments.length > 0 && (
        <div className="item-child">
          <div className="child-expand"></div>
          <CommentList rootComments={childComments} fullComments={comments} />
        </div>
      )}
    </div>
  );
};

export default CommentItem;
