import React from "react";
import { HiHeart } from "react-icons/hi2";

const ICON_SIZE = 20;

interface ProductCardLikeProps {}

const ProductCardLike: React.FC<ProductCardLikeProps> = () => {
  return (
    <button className="product-card-like">
      <HiHeart className="like-icon" size={ICON_SIZE} />
    </button>
  );
};

export default ProductCardLike;
