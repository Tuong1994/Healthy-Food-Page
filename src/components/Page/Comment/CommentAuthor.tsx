import { FC } from "react";
import { Space, Avatar, Typography, Grid } from "@/components/UI";
import type { Comment } from "@/services/comment/type";
import useAuthStore from "@/store/AuthStore";
import moment from "moment";

const { Paragraph } = Typography;

const { Row, Col } = Grid;

interface CommentAuthorProps {
  comment?: Comment;
  isRoot?: boolean;
}

const CommentAuthor: FC<CommentAuthorProps> = ({ isRoot, comment }) => {
  const auth = useAuthStore((state) => state.auth);

  const { info } = auth;

  const renderName = () => {
    if (isRoot) return info.fullName ?? "Customer";
    if (comment) return comment.customer?.fullName ?? "Customer";
    return "Customer";
  };

  return (
    <Row justify="between" align="middle">
      <Col>
        <Space align="middle">
          <Avatar color="green" />
          <Paragraph strong>{renderName()}</Paragraph>
        </Space>
      </Col>
      <Col>
        <Paragraph variant="secondary">{moment(comment?.createdAt).format("DD/MM/YYYY")}</Paragraph>
      </Col>
    </Row>
  );
};

export default CommentAuthor;
