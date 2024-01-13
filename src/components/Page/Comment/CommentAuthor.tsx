import React from "react";
import { UI } from "@/components";

const { Space, Avatar, Typography } = UI;

const { Paragraph } = Typography;

interface CommentAuthorProps {}

const CommentAuthor: React.FC<CommentAuthorProps> = () => {
  return (
    <Space align="middle">
      <Avatar color="green" />
      <Paragraph strong>User</Paragraph>
    </Space>
  );
};

export default CommentAuthor;
