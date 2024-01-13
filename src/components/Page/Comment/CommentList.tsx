import React from "react";
import { Comment } from "@/services/comment/type";
import CommentItem from "./CommentItem";

interface CommentListProps {
  rootComments: Comment[];
  fullComments: Comment[];
}

const CommentList: React.FC<CommentListProps> = ({ rootComments, fullComments }) => {
  const renderComment = () => {
    return rootComments.map((comment) => (
      <CommentItem key={comment.id} comment={comment} comments={fullComments} />
    ));
  };

  return <React.Fragment>{renderComment()}</React.Fragment>;
};

export default CommentList;
