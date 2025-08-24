import { FC } from "react";
import { Image } from "@/components/UI";
import { ESort } from "@/common/enum";
import { useLang } from "@/hooks";
import { LIST_LIMIT_ITEMS } from "@/services/helper";
import Link from "next/link";
import CategoriesMobileLoading from "./Loading";
import NoDataError from "@/components/Page/Error/NoDataError";
import useCategoryStore from "@/store/CategoryStore";
import url from "@/common/constant/url";

const { PRODUCT_LIST } = url;

interface CategoriesMobileProps {}

const CategoriesMobile: FC<CategoriesMobileProps> = () => {
  const { locale } = useLang();

  const categories = useCategoryStore((state) => state.categories);

  const { data: categoriesWithSubs, loading, error } = categories;

  const renderCategories = (start: number, end: number) => {
    return categoriesWithSubs.slice(start, end).map((category) => (
      <Link
        href={{
          pathname: PRODUCT_LIST,
          query: {
            page: 1,
            limit: LIST_LIMIT_ITEMS,
            sortBy: ESort.PRICE_GO_UP,
            categoryId: category.id,
            langCode: locale,
          },
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
