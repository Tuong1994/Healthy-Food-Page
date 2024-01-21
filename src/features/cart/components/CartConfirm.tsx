import { FC, Key, useState } from "react";
import { Table, Image, Pagination, Divider, Space, Button, Typography } from "@/components/UI";
import type { CartItem } from "@/services/cart/type";
import type { Columns } from "@/components/UI/Table/type";
import type { Product } from "@/services/product/type";
import { PiWarning } from "react-icons/pi";
import { removeCartItems } from "@/services/cart/api";
import { REPLACE_NUM_REGEX } from "@/common/constant/regex";
import { useAsync, useLang } from "@/hooks";
import { mutate } from "swr";
import { useRouter } from "next/router";
import QuantityControl from "@/components/Page/QuantityControl";
import ConfirmModal from "@/components/Page/ConfirmModal";
import useMessage from "@/components/UI/ToastMessage/useMessage";
import useCartStore from "@/store/CartStore";
import url from "@/common/constant/url";
import utils from "@/utils";

const { CART } = url;

const { Title } = Typography;

interface CartConfirmProps {
  handleConfirm: () => void;
}

const CartConfirm: FC<CartConfirmProps> = ({ handleConfirm }) => {
  const messageApi = useMessage();

  const cart = useCartStore((state) => state.cart);

  const { data: cartResponse } = cart;

  const { locale, lang } = useLang();

  const { query, push: routerPush } = useRouter();

  const [openModal, setOpenModal] = useState<boolean>(false);

  const [ids, setIds] = useState<Key[]>([]);

  const { loading, call: onRemove } = useAsync(removeCartItems);

  const dataSource = (): CartItem[] => {
    if (!cart.data) return [];
    const { data: cartDetail } = cart.data;
    return cartDetail.items.map((item) => ({ ...item })) || [];
  };

  const columns: Columns<CartItem> = [
    {
      id: "image",
      title: lang.common.table.head.image,
      dataIndex: "product",
      render: (product: Product) => <Image imgWidth={50} imgHeight={50} />,
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
      render: (quantity: number, item: CartItem) => (
        <QuantityControl defaultValue={quantity} min={1} productId={item.productId} />
      ),
    },
    {
      id: "price",
      title: lang.common.table.head.price,
      dataIndex: "product",
      render: (product: Product) => <>{utils.formatPrice(locale, product.totalPrice)}</>,
    },
  ];

  const handleChangePage = (page: number) => {
    routerPush({ pathname: CART, query: { ...query, page } });
  };

  const handleOpenModal = (ids: Key[]) => {
    setOpenModal(true);
    setIds(ids);
  };

  const handleCloseModal = () => setOpenModal(false);

  const handleRemoveItems = async () => {
    const listIds = ids.join(",");
    const response = await onRemove({ ids: listIds });
    setOpenModal(false);
    if (!response.success) return messageApi.error(lang.common.message.error.remove);
    messageApi.success(lang.common.message.success.updateCart);
    mutate(`getCartByCustomer?customerId=${cartResponse?.data.customerId}`);
  };

  return (
    <div className="cart-confirm">
      <Title level={6}>{lang.cart.confirm}</Title>

      <Table<CartItem>
        color="green"
        rowKey="id"
        hasRowSelection
        dataSource={dataSource()}
        columns={columns}
        showRemove={openModal}
        onSelectRows={handleOpenModal}
      />

      <Pagination
        color="green"
        shape="square"
        ghost
        total={cartResponse?.totalItems}
        rootClassName="confirm-pagination"
        onChangePage={handleChangePage}
      />

      <Divider />

      <Space justify="end">
        <Button sizes="lg" color="green" onClick={handleConfirm}>
          {lang.cart.actions.payment}
        </Button>
      </Space>

      <ConfirmModal
        open={openModal}
        okButtonProps={{ loading }}
        onOk={handleRemoveItems}
        onCancel={handleCloseModal}
        desciption={
          <Space align="middle" justify="center">
            <PiWarning size={18} />
            <span>{lang.cart.removeModal.description.replace(REPLACE_NUM_REGEX, String(ids.length))}</span>
          </Space>
        }
      />
    </div>
  );
};

export default CartConfirm;
