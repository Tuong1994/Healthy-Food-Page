import { FC } from "react";
import CommentControl from "./CommentControl";
import CommentList from "./CommentList";
import useCommentStore from "@/store/CommentStore";

interface CommentProps {}

const Comment: FC<CommentProps> = () => {
  const comments = useCommentStore((state) => state.comments);

  const rootComments = comments.filter((comment) => !comment.parentId);

  return (
    <div className="comment">
      <CommentControl />
      <div className="comment-list">
        <CommentList rootComments={rootComments} fullComments={comments} />
      </div>
    </div>
  );
};

export default Comment;
