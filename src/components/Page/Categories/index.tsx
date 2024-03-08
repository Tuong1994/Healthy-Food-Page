import { FC, Fragment } from "react";
import { Image } from "@/components/UI";
import { HiChevronRight } from "react-icons/hi2";
import { ESort } from "@/common/enum";
import { useLang } from "@/hooks";
import CategoriesLoading from "./Loading";
import NoDataError from "../Error/NoDataError";
import useCategoryStore from "@/store/CategoryStore";
import Link from "next/link";
import utils from "@/utils";
import url from "@/common/constant/url";

const { PRODUCT_LIST } = url;

interface CategoriesProps {
  highlight?: boolean;
}

const Categories: FC<CategoriesProps> = ({ highlight = false }) => {
  const categories = useCategoryStore((state) => state.categories);

  const { locale } = useLang();

  const { data: categoriesWithSubs, loading, error } = categories;

  const [show, showCategories] = useCategoryStore((state) => [state.show, state.showCategories]);

  const isHighLight = show && highlight;

  const highLightClassName = isHighLight ? "categories-highlight" : "";

  const backdropActiveClassName = isHighLight ? "categories-backdrop-active" : "";

  const mainClassName = utils.formatClassName("categories", highLightClassName);

  const backdropClassName = utils.formatClassName("categories-backdrop", backdropActiveClassName);

  const renderCategories = () => {
    const commonQuery = { page: 1, limit: 12, sortBy: ESort.PRICE_GO_UP, langCode: locale };
    return categoriesWithSubs.map((category) => (
      <div key={category.id} className="categories-item">
        <Link
          href={{
            pathname: PRODUCT_LIST,
            query: { categoryId: category.id, ...commonQuery },
          }}
          className="item-wrap"
        >
          <div className="wrap-content">
            <Image imgWidth={20} imgHeight={20} />
            <span>{category.name}</span>
          </div>
          <HiChevronRight size={16} />
        </Link>

        <div className="item-child">
          {category.subCategories.map((subcategory) => (
            <Link
              href={{
                pathname: PRODUCT_LIST,
                query: { categoryId: category.id, subCategoryId: subcategory.id, ...commonQuery },
              }}
              key={subcategory.id}
              className="child-inner"
            >
              {subcategory.name}
            </Link>
          ))}
        </div>
      </div>
    ));
  };

  const renderContent = () => {
    if (loading) return <CategoriesLoading />;
    if (error) return <NoDataError />;
    return renderCategories();
  };

  return (
    <Fragment>
      {isHighLight && <div className={backdropClassName} onClick={showCategories} />}
      <div className={mainClassName}>{renderContent()}</div>
    </Fragment>
  );
};

export default Categories;
