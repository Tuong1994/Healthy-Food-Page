import React from "react";
import { Image } from "@/components/UI";
import { useCategoriesData } from "@/components/Page/AppWrapper/AppData/Provider";
import { useRouter } from "next/router";
import { ESort } from "@/common/enum";
import CategoriesMobileLoading from "./Loading";
import NoDataError from "@/components/Page/Error/NoDataError";
import Link from "next/link";
import url from "@/common/constant/url";

const { PRODUCT_LIST } = url;

interface CategoriesMobileProps {}

const CategoriesMobile: React.FC<CategoriesMobileProps> = () => {
  const { data: categoriesWithSubs, loading, error } = useCategoriesData();

  const { query } = useRouter();

  const renderCategories = (start: number, end: number) => {
    return categoriesWithSubs.slice(start, end).map((category) => (
      <Link
        href={{
          pathname: PRODUCT_LIST,
          query: { page: 1, limit: 12, sortBy: ESort.PRICE_GO_UP, categoryId: category.id, ...query },
        }}
        key={category.id}
        className="inner-item"
      >
        <Image rootClassName="item-image" imgWidth={40} imgHeight={40} />
        <span className="item-text">{category.name}</span>
      </Link>
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
