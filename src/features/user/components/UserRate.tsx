import { FC, Fragment, useState } from "react";
import { Image, Table, Pagination, Empty } from "@/components/UI";
import type { Lang } from "@/common/type";
import type { Rate } from "@/services/rate/type";
import type { Columns } from "@/components/UI/Table/type";
import type { ApiQuery } from "@/services/type";
import type { Product } from "@/services/product/type";
import { ELang } from "@/common/enum";
import { getRates } from "@/services/rate/api";
import { useRouter } from "next/router";
import RateStars from "@/components/Page/Rate/RateStars";
import NoDataError from "@/components/Page/Error/NoDataError";
import useSWR from "swr";
import moment from "moment";

interface UserRateProps {
  lang: Lang;
  selectedTab: string;
}

const UserRate: FC<UserRateProps> = ({ lang, selectedTab }) => {
  const { query } = useRouter();

  const userId = query.id as string;

  const langCode = query.langCode as ELang;

  const [error, setError] = useState<boolean>(false);

  const [apiQuery, setApiQuery] = useState<ApiQuery>({
    page: 1,
    limit: 10,
    userId,
    langCode,
  });

  const swrKey = `getRates?page=${apiQuery.page}&userId=${userId}&langCode=${langCode}`;

  const getRatesByUser = async () => {
    const response = await getRates(apiQuery);
    if (!response.success) setError(true);
    return response;
  };

  const { data: ratesResponse, isValidating: loading } = useSWR(
    selectedTab === "rate" ? swrKey : null,
    getRatesByUser,
    {
      refreshInterval: 0,
      revalidateOnFocus: false,
    }
  );

  const dataSource: Rate[] = ratesResponse?.data?.items ?? [];

  const columns: Columns<Rate> = [
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
      render: (product: Product) => <>{product.name}</>,
    },
    {
      id: "point",
      title: lang.common.table.head.rate,
      dataIndex: "point",
      render: (point: number) => <RateStars point={point} />,
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

  if (!dataSource.length) return <Empty text={lang.user.rate.empty} />;

  return (
    <Fragment>
      <Table<Rate> color="green" loading={loading} dataSource={dataSource} columns={columns} />
      <Pagination
        ghost
        color="green"
        shape="square"
        rootClassName="user-table-pagination"
        total={ratesResponse?.data?.totalItems ?? 0}
        onChangePage={handleChangePage}
      />
    </Fragment>
  );
};

export default UserRate;
