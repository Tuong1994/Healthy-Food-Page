import { FC, Key, useState } from "react";
import { Table, Image, Pagination, Divider, Space, Button, Typography } from "@/components/UI";
import type { CartItem, CartWithItemsPaging } from "@/services/cart/type";
import type { Columns } from "@/components/UI/Table/type";
import type { Product } from "@/services/product/type";
import { PiWarning } from "react-icons/pi";
import { removeCartItems } from "@/services/cart/api";
import { REPLACE_NUM_REGEX } from "@/common/constant/regex";
import { useAsync, useLang } from "@/hooks";
import { cartSwrKey } from "@/components/Page/AppMain/AppData/swrkey";
import { useRouter } from "next/router";
import { mutate } from "swr";
import Quantity from "@/components/Page/Quantity";
import ConfirmModal from "@/components/Page/ConfirmModal";
import Link from "next/link";
import useMessage from "@/components/UI/ToastMessage/useMessage";
import useCartStore from "@/store/CartStore";
import url from "@/common/constant/url";
import utils from "@/utils";

const { CART, PRODUCT_DETAIL } = url;

const { Title } = Typography;

interface CartConfirmProps {
  loading: boolean;
  cart: CartWithItemsPaging | undefined;
  handleConfirm: () => void;
}

const CartConfirm: FC<CartConfirmProps> = ({ loading, cart, handleConfirm }) => {
  const messageApi = useMessage();

  const { locale, lang } = useLang();

  const { query, push: routerPush, reload: routerReload } = useRouter();

  const resetCart = useCartStore((state) => state.resetCart);

  const [openModal, setOpenModal] = useState<boolean>(false);

  const [ids, setIds] = useState<Key[]>([]);

  const { loading: removeLoading, call: onRemoveItem } = useAsync(removeCartItems);

  const dataSource = (): CartItem[] => {
    if (!cart) return [];
    const { detail: cartDetail } = cart;
    return cartDetail?.items.map((item) => ({ ...item })) || [];
  };

  const columns: Columns<CartItem> = [
    {
      id: "image",
      title: lang.common.table.head.image,
      dataIndex: "product",
      render: (product: Product) => <Image src={product.image?.path} imgWidth={50} imgHeight={50} />,
    },
    {
      id: "name",
      title: lang.common.table.head.productName,
      dataIndex: "product",
      render: (product: Product) => (
        <Link
          className="confirm-product-link"
          href={{ pathname: PRODUCT_DETAIL, query: { id: product.id, langCode: locale } }}
        >
          {product.name}
        </Link>
      ),
    },
    {
      id: "quantity",
      title: lang.common.table.head.quantity,
      dataIndex: "quantity",
      render: (quantity: number, item: CartItem) => (
        <Quantity defaultValue={quantity} min={1} productId={item.productId} />
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
    const cartItemsLength = cart?.detail?.items.length || 0;
    const response = await onRemoveItem({ cartId: cart?.detail?.id, ids: listIds });
    setOpenModal(false);
    if (!response.success) return messageApi.error(lang.common.message.error.remove);
    if (cartItemsLength === 0) resetCart();
    if (cartItemsLength >= 1) {
      routerReload()
      // mutate(cartSwrKey(cart?.detail?.userId, query.page, query.limit, locale))
    };
    messageApi.success(lang.common.message.success.updateCart);
  };

  return (
    <div className="cart-confirm">
      <Title level={6}>{lang.cart.confirm}</Title>

      <Table<CartItem>
        color="green"
        rowKey="id"
        hasRowSelection
        loading={loading}
        dataSource={dataSource()}
        columns={columns}
        showRemove={openModal}
        onSelectRows={handleOpenModal}
      />

      <Pagination
        ghost
        control
        color="green"
        shape="square"
        page={Number(query.page)}
        total={cart?.totalItems}
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
        okButtonProps={{ loading: removeLoading }}
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
