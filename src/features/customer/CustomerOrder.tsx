import React from "react";
import { UI } from "@/components";
import type { Order } from "@/services/order/type";
import type { Columns } from "@/components/UI/Table/type";
import type { OrderItem } from "@/services/order/type";
import { EOrderStatus, EPaymentStatus, EPaymentMethod } from "@/services/order/enum";
import { useLang, useDisplayOrderStatus, useDisplayPaymentMethod, useDisplayPaymentStatus } from "@/hooks";
import utils from "@/utils";
import moment from "moment";

const { Table, Image, Pagination } = UI;

interface CustomerOrderProps {}

const CustomerOrder: React.FC<CustomerOrderProps> = () => {
  const { lang, type } = useLang();

  const dataSource: Order[] = [
    {
      id: "1",
      orderNumber: "#00001",
      status: EOrderStatus.DELIVERED,
      paymentStatus: EPaymentStatus.PAID,
      paymentMethod: EPaymentMethod.TRANSFER,
      customerId: "1",
      createdAt: new Date(),
      items: [
        {
          id: "item-1",
          productName: "Product 1",
          productPrice: 100000,
          productImage: null,
          productId: "product-1",
          quantity: 1,
          orderId: "1",
        },
        {
          id: "item-2",
          productName: "Product 2",
          productPrice: 100000,
          productImage: null,
          productId: "product-2",
          quantity: 1,
          orderId: "1",
        },
        {
          id: "item-3",
          productName: "Product 3",
          productPrice: 100000,
          productImage: null,
          productId: "product-3",
          quantity: 1,
          orderId: "1",
        },
        {
          id: "item-4",
          productName: "Product 4",
          productPrice: 100000,
          productImage: null,
          productId: "product-4",
          quantity: 1,
          orderId: "1",
        },
      ],
    },
    {
      id: "2",
      orderNumber: "#00002",
      status: EOrderStatus.DELIVERING,
      paymentStatus: EPaymentStatus.UNPAID,
      paymentMethod: EPaymentMethod.COD,
      customerId: "1",
      createdAt: new Date(),
      items: [
        {
          id: "item-1",
          productName: "Product 4",
          productPrice: 200000,
          productImage: null,
          productId: "product-4",
          quantity: 2,
          orderId: "1",
        },
        {
          id: "item-2",
          productName: "Product 5",
          productPrice: 200000,
          productImage: null,
          productId: "product-6",
          quantity: 5,
          orderId: "1",
        },
      ],
    },
  ];

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
      render: (data: EOrderStatus) => <>{useDisplayOrderStatus(data)}</>,
    },
    {
      id: "paymentMethod",
      title: lang.common.table.head.paymentMethod,
      dataIndex: "paymentMethod",
      render: (data: EPaymentMethod) => <>{useDisplayPaymentMethod(data)}</>,
    },
    {
      id: "paymentStatus",
      title: lang.common.table.head.paymentStatus,
      dataIndex: "paymentStatus",
      render: (data: EPaymentStatus) => <>{useDisplayPaymentStatus(data)}</>,
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
        id: "quantity",
        title: lang.common.table.head.quantity,
        dataIndex: "quantity",
      },
      {
        id: "productPrice",
        title: lang.common.table.head.price,
        dataIndex: "productPrice",
        render: (data: number) => <>{utils.formatPrice(type, data)}</>,
      },
    ];

    return <Table<OrderItem> color="green" dataSource={order.items} columns={columns} />;
  };

  return (
    <React.Fragment>
      <Table<Order>
        color="green"
        hasRowExpand
        dataSource={dataSource}
        columns={columns}
        expandRowTable={expandRowTable}
      />
      <Pagination rootClassName="customer-table-pagination" color="green" shape="square" ghost />
    </React.Fragment>
  );
};

export default CustomerOrder;
