import { FC, Fragment, useState } from "react";
import { Image, Table, Pagination, Typography, Empty } from "@/components/UI";
import type { Lang } from "@/common/type";
import type { Comment } from "@/services/comment/type";
import type { Columns } from "@/components/UI/Table/type";
import type { ApiQuery } from "@/services/type";
import type { Product } from "@/services/product/type";
import { getCommentsByUser } from "@/services/comment/api";
import { ELang } from "@/common/enum";
import { useRouter } from "next/router";
import NoDataError from "@/components/Page/Error/NoDataError";
import useSWR from "swr";
import moment from "moment";

const { Paragraph } = Typography;

interface UserCommentProps {
  lang: Lang;
  selectedTab: string;
}

const UserComment: FC<UserCommentProps> = ({ lang, selectedTab }) => {
  const { query } = useRouter();

  const [error, setError] = useState<boolean>(false);

  const userId = query.id as string;

  const langCode = query.langCode as ELang;

  const [apiQuery, setApiQuery] = useState<ApiQuery>({
    page: 1,
    limit: 10,
    userId,
    langCode,
  });

  const swrKey = `getComments?page=${apiQuery.page}&userId=${userId}&langCode=${langCode}`;

  const getComments = async () => {
    const response = await getCommentsByUser(apiQuery);
    if (!response.success) setError(true);
    return response;
  };

  const { data: commentsResponse, isValidating: loading } = useSWR(
    selectedTab === "comment" ? swrKey : null,
    getComments,
    {
      refreshInterval: 0,
      revalidateOnFocus: false,
    }
  );

  const dataSource: Comment[] = commentsResponse?.data?.items ?? [];

  const columns: Columns<Comment> = [
    {
      id: "image",
      title: lang.common.table.head.image,
      dataIndex: "product",
      render: () => <Image imgWidth={40} imgHeight={40} />,
    },
    {
      id: "name",
      title: lang.common.table.head.productName,
      dataIndex: "product",
      render: (product: Product) => <>{product?.name}</>,
    },
    {
      id: "content",
      title: lang.common.table.head.comment,
      dataIndex: "content",
      render: (content: string) => <Paragraph>{content}</Paragraph>,
    },
    {
      id: "createdAt",
      title: lang.common.table.head.createdAt,
      dataIndex: "createdAt",
      render: (data: Date) => <>{moment(data).format("DD/MM/YYYY")}</>,
    },
  ];

  const handleChangePage = (page: number) => setApiQuery((prev) => ({ ...prev, page }));

  if (error) return <NoDataError />;

  if (!dataSource.length) return <Empty text={lang.user.comment.empty} />;

  return (
    <Fragment>
      <Table<Comment> color="green" loading={loading} dataSource={dataSource} columns={columns} />
      <Pagination
        ghost
        color="green"
        shape="square"
        rootClassName="user-table-pagination"
        total={commentsResponse?.data?.totalItems ?? 0}
        onChangePage={handleChangePage}
      />
    </Fragment>
  );
};

export default UserComment;
