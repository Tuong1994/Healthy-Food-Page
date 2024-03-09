import { FC, Fragment, useState } from "react";
import { Table, Image, Pagination, Empty } from "@/components/UI";
import type { Order } from "@/services/order/type";
import type { Columns } from "@/components/UI/Table/type";
import type { OrderItem } from "@/services/order/type";
import type { ApiQuery } from "@/services/type";
import type { Product } from "@/services/product/type";
import { getOrders } from "@/services/order/api";
import { EOrderStatus, EPaymentStatus, EPaymentMethod, EReceivedType } from "@/services/order/enum";
import { ELang } from "@/common/enum";
import { useRouter } from "next/router";
import { useLang } from "@/hooks";
import NoDataError from "@/components/Page/Error/NoDataError";
import getDisplayOrderStatus from "../data-display/getDisplayOrderStatus";
import getDisplayPaymentMethod from "../data-display/getDisplayPaymentMethod";
import getDisplayPaymentStatus from "../data-display/getDisplayPaymentStatus";
import getDisplayReceivedType from "../data-display/getDisplayReceivedType";
import useSWR from "swr";
import utils from "@/utils";
import moment from "moment";

interface UserOrderProps {
  selectedTab: string;
}

const UserOrder: FC<UserOrderProps> = ({ selectedTab }) => {
  const { lang, locale } = useLang();

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

  const swrKey = `getOrders?page=${apiQuery.page}&userId=${userId}&langCode=${langCode}`;

  const getOrdersByUser = async () => {
    const response = await getOrders(apiQuery);
    if (!response.success) setError(true);
    return response;
  };

  const { data: ordersResponse, isValidating: loading } = useSWR(
    selectedTab === "order" ? swrKey : null,
    getOrdersByUser,
    {
      refreshInterval: 0,
      revalidateOnFocus: false,
    }
  );

  const dataSource: Order[] = ordersResponse?.data?.items ?? [];

  const columns: Columns<Order> = [
    {
      id: "orderNumber",
      title: lang.common.table.head.orderNumber,
      dataIndex: "orderNumber",
    },
    {
      id: "status",
      title: lang.common.table.head.status,
      dataIndex: "status",
      render: (status: EOrderStatus) => <>{getDisplayOrderStatus(lang, status)}</>,
    },
    {
      id: "paymentMethod",
      title: lang.common.table.head.paymentMethod,
      dataIndex: "paymentMethod",
      render: (method: EPaymentMethod) => <>{getDisplayPaymentMethod(lang, method)}</>,
    },
    {
      id: "paymentStatus",
      title: lang.common.table.head.paymentStatus,
      dataIndex: "paymentStatus",
      render: (status: EPaymentStatus) => <>{getDisplayPaymentStatus(lang, status)}</>,
    },
    {
      id: "recieviedType",
      title: lang.common.table.head.recievedType,
      dataIndex: "receivedType",
      render: (type: EReceivedType) => <>{getDisplayReceivedType(lang, type)}</>,
    },
    {
      id: "createdAt",
      title: lang.common.table.head.createdAt,
      dataIndex: "createdAt",
      render: (data: Date) => <>{moment(data).format("DD/MM/YYYY")}</>,
    },
  ];

  const expandRowTable = (order: Order) => {
    const columns: Columns<OrderItem> = [
      {
        id: "image",
        title: lang.common.table.head.image,
        dataIndex: "product",
        render: (product: Product) => <Image src={product.image?.path} imgWidth={40} imgHeight={40} />,
      },
      {
        id: "name",
        title: lang.common.table.head.productName,
        dataIndex: "product",
        render: (product: Product) => <>{product.name}</>,
      },
      {
        id: "quantity",
        title: lang.common.table.head.quantity,
        dataIndex: "quantity",
      },
      {
        id: "price",
        title: lang.common.table.head.price,
        dataIndex: "product",
        render: (product: Product) => <>{utils.formatPrice(locale, product?.totalPrice)}</>,
      },
    ];

    return <Table<OrderItem> color="green" dataSource={order.items} columns={columns} />;
  };

  const handleChangePage = (page: number) => setApiQuery((prev) => ({ ...prev, page }));

  if (error) return <NoDataError />;

  if (!dataSource.length) return <Empty text={lang.user.order.empty} />;

  return (
    <Fragment>
      <Table<Order>
        color="green"
        hasRowExpand
        loading={loading}
        dataSource={dataSource}
        columns={columns}
        expandRowTable={expandRowTable}
      />
      <Pagination
        ghost
        color="green"
        shape="square"
        rootClassName="user-table-pagination"
        total={ordersResponse?.data?.totalItems ?? 0}
        onChangePage={handleChangePage}
      />
    </Fragment>
  );
};

export default UserOrder;
