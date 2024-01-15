import React from "react";
import { Image } from "@/components/UI";
import { useCategoriesData } from "@/components/Page/AppWrapper/AppData/Provider";
import CategoriesMobileLoading from "./Loading";
import NoDataError from "@/components/Page/Error/NoDataError";

interface CategoriesMobileProps {}

const CategoriesMobile: React.FC<CategoriesMobileProps> = () => {
  const { data: categoriesWithSubs, loading, error } = useCategoriesData();

  const renderCategories = (start: number, end: number) => {
    return categoriesWithSubs.slice(start, end).map((category) => (
      <div key={category.id} className="inner-item">
        <Image rootClassName="item-image" imgWidth={40} imgHeight={40} />
        <span className="item-text">{category.name}</span>
      </div>
    ));
  };

  const renderContent = () => {
    if (loading) return <CategoriesMobileLoading />;
    if (error) return <NoDataError />;
    return (
      <div className="mobile-wrap">
        <div className="wrap-inner">{renderCategories(0, 4)}</div>
        <div className="wrap-inner">{renderCategories(4, categoriesWithSubs.length)}</div>
      </div>
    );
  };

  return <div className="categories-mobile">{renderContent()}</div>;
};

export default CategoriesMobile;
