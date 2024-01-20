import { FC } from "react";
import { Space, Avatar, Typography } from "@/components/UI";

const { Paragraph } = Typography;

interface CommentAuthorProps {}

const CommentAuthor: FC<CommentAuthorProps> = () => {
  return (
    <Space align="middle">
      <Avatar color="green" />
      <Paragraph strong>User</Paragraph>
    </Space>
  );
};

export default CommentAuthor;
