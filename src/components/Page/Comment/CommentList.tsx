import { FC, Fragment } from "react";
import type { Comment } from "@/services/comment/type";
import CommentItem from "./CommentItem";

interface CommentListProps {
  rootComments: Comment[];
  fullComments: Comment[];
}

const CommentList: FC<CommentListProps> = ({ rootComments, fullComments }) => {
  const renderComment = () => {
    return rootComments.map((comment) => (
      <CommentItem key={comment.id} comment={comment} comments={fullComments} />
    ));
  };

  return <Fragment>{renderComment()}</Fragment>;
};

export default CommentList;
