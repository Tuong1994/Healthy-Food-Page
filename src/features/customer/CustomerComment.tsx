import React from "react";
import { UI } from "@/components";
import type { Lang } from "@/common/type";
import type { Comment } from "@/services/comment/type";
import type { Columns } from "@/components/UI/Table/type";
import moment from "moment";

const { Image, Table, Pagination } = UI;

interface CustomerCommentProps {
  lang: Lang;
}

const CustomerComment: React.FC<CustomerCommentProps> = ({ lang }) => {
  const dataSource: Comment[] = [
    {
      id: "1",
      content: "This is a comment 1",
      parentId: "",
      productId: "1",
      customerId: "1",
      productName: "product 1",
      productImage: null,
      createdAt: new Date(),
    },
    {
      id: "2",
      content: "This is a comment 2",
      parentId: "",
      productId: "1",
      customerId: "1",
      productName: "product 2",
      productImage: null,
      createdAt: new Date(),
    },
    {
      id: "3",
      content: "This is a comment 3",
      parentId: "",
      productId: "1",
      customerId: "1",
      productName: "product 3",
      productImage: null,
      createdAt: new Date(),
    },
  ];

  const columns: Columns<Comment> = [
    {
      id: "productImage",
      title: lang.common.table.head.image,
      dataIndex: "productImage",
      render: () => <Image imgWidth={60} imgHeight={60} />,
    },
    {
      id: "productName",
      title: lang.common.table.head.productName,
      dataIndex: "productName",
    },
    {
      id: "content",
      title: lang.common.table.head.comment,
      dataIndex: "content",
    },
    {
      id: "createdAt",
      title: lang.common.table.head.createdAt,
      dataIndex: "createdAt",
      render: (data: Date) => <>{moment(data).format("DD/MM/YYYY")}</>,
    },
  ];

  return (
    <React.Fragment>
      <Table<Comment> color="green" dataSource={dataSource} columns={columns} />
      <Pagination rootClassName="customer-table-pagination" color="green" shape="square" ghost />
    </React.Fragment>
  );
};

export default CustomerComment;
