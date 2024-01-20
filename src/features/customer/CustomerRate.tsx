import { FC, Fragment } from "react";
import { Image, Table, Pagination } from "@/components/UI";
import type { Lang } from "@/common/type";
import type { Rate } from "@/services/rate/type";
import type { Columns } from "@/components/UI/Table/type";
import RateStars from "@/components/Page/Rate/RateStars";
import moment from "moment";

interface CustomerRateProps {
  lang: Lang;
}

const CustomerRate: FC<CustomerRateProps> = ({ lang }) => {
  const dataSource: Rate[] = [
    {
      id: "1",
      point: 4,
      note: "",
      customerId: "1",
      productId: "1",
      productName: "Product 1",
      productImage: null,
    },
    {
      id: "2",
      point: 3,
      note: "",
      customerId: "1",
      productId: "2",
      productName: "Product 2",
      productImage: null,
    },
    {
      id: "3",
      point: 5,
      note: "",
      customerId: "1",
      productId: "3",
      productName: "Product 3",
      productImage: null,
    },
  ];

  const columns: Columns<Rate> = [
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
      id: "point",
      title: lang.common.table.head.rate,
      dataIndex: "point",
      render: (data: number) => <RateStars point={data} />,
    },
    {
      id: "createdAt",
      title: lang.common.table.head.createdAt,
      dataIndex: "createdAt",
      render: (data: Date) => <>{moment(data).format("DD/MM/YYYY")}</>,
    },
  ];

  return (
    <Fragment>
      <Table<Rate> color="green" dataSource={dataSource} columns={columns} />
      <Pagination rootClassName="customer-table-pagination" color="green" shape="square" ghost />
    </Fragment>
  );
};

export default CustomerRate;
