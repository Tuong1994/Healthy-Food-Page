import React from "react";
import { Skeleton } from "@/components/UI/Loading";

const CategoriesMobileLoading: React.FC<{}> = () => {
  const renderCategories = (start: number, end: number) => {
    return [...Array(8)].slice(start, end).map((_, idx) => (
      <div className="inner-item" key={idx}>
        <Skeleton type="image" options={{ size: 30 }} />
        <Skeleton type="paragraph" options={{ lines: 1, width: 100, height: 8 }} />
      </div>
    ));
  };

  return (
    <div className="mobile-loading mobile-wrap">
      <div className="wrap-inner">{renderCategories(0, 4)}</div>
      <div className="wrap-inner">{renderCategories(4, 8)}</div>
    </div>
  );
};

export default CategoriesMobileLoading;
