import React from "react";
import { UI } from "@/components";
import { HiMinus, HiPlus } from "react-icons/hi2";

const { Space } = UI;

const ICON_SIZE = 20;

interface ProductCardControlProps {
  defaultValue?: number;
  min?: number;
  onChangeInput?: (value: number) => void;
}

const ProductCardControl: React.FC<ProductCardControlProps> = ({
  defaultValue = 0,
  min = 0,
  onChangeInput,
}) => {
  const [quantity, setQuantity] = React.useState<number>(defaultValue);

  const minusBtnDisabled = quantity === min;

  const btnDisabledClassName = minusBtnDisabled ? "action-btn-disabled" : "";

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    setQuantity(value);
    onChangeInput?.(value);
  };

  const handleChangeClick = (type: "plus" | "minus") => {
    let newQuantity = quantity;
    if (type === "plus") newQuantity++;
    else newQuantity--;
    setQuantity(newQuantity);
    onChangeInput?.(newQuantity);
  };

  return (
    <Space justify="end" rootClassName="product-card-action">
      <button
        disabled={minusBtnDisabled}
        className={`action-btn action-btn-minus ${btnDisabledClassName}`}
        onClick={() => handleChangeClick("minus")}
      >
        <HiMinus size={ICON_SIZE} />
      </button>
      <input type="number" className="action-input" value={quantity} onChange={handleChangeInput} />
      <button className="action-btn" onClick={() => handleChangeClick("plus")}>
        <HiPlus size={ICON_SIZE} />
      </button>
    </Space>
  );
};

export default ProductCardControl;
