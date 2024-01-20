import { FC, ChangeEvent, FocusEvent, useState, useEffect } from "react";
import { Space, Loading } from "@/components/UI";
import { useRouter } from "next/router";
import { HiMinus, HiPlus } from "react-icons/hi2";
import useAuthStore from "@/store/AuthStore";
import usePurchase from "@/features/cart/hooks/usePurchase";
import url from "@/common/constant/url";
import utils from "@/utils";

const { AUTH_SIGN_IN } = url;

const { Spinner } = Loading;

const ICON_SIZE = 20;

interface QuantityControlProps {
  productId: string;
  rootClassName?: string;
  defaultValue?: number;
  min?: number;
  onChangeInput?: (value: number) => void;
}

const QuantityControl: FC<QuantityControlProps> = ({
  rootClassName = "",
  productId = "",
  defaultValue = 0,
  min = 0,
  onChangeInput,
}) => {
  const { loading, handlePurchase } = usePurchase();

  const [quantity, setQuantity] = useState<number>(defaultValue);

  const auth = useAuthStore((state) => state.auth);

  const router = useRouter();

  const minusBtnDisabled = quantity === min;

  const btnDisabledClassName = minusBtnDisabled ? "action-btn-disabled" : "";

  const mainClassName = utils.formatClassName("product-card-action", rootClassName);

  useEffect(() => setQuantity(defaultValue), [defaultValue]);

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    setQuantity(value);
    onChangeInput?.(value);
  };

  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    if (!auth.isAuth) return router.push(AUTH_SIGN_IN);
    const value = Number(e.target.value);
    handlePurchase(productId, value);
  };

  const handleChangeClick = (type: "plus" | "minus") => {
    if (!auth.isAuth) return router.push(AUTH_SIGN_IN);
    let newQuantity = quantity;
    if (type === "plus") newQuantity++;
    else newQuantity--;
    setQuantity(newQuantity);
    onChangeInput?.(newQuantity);
    handlePurchase(productId, newQuantity);
  };

  return (
    <Space justify="end" rootClassName={mainClassName}>
      <button
        disabled={minusBtnDisabled}
        className={`action-btn action-btn-minus ${btnDisabledClassName}`}
        onClick={() => handleChangeClick("minus")}
      >
        {loading ? <Spinner /> : <HiMinus size={ICON_SIZE} />}
      </button>
      <input className="action-input" value={quantity} onChange={handleChangeInput} onBlur={handleBlur} />
      <button className="action-btn" onClick={() => handleChangeClick("plus")}>
        {loading ? <Spinner /> : <HiPlus size={ICON_SIZE} />}
      </button>
    </Space>
  );
};

export default QuantityControl;
