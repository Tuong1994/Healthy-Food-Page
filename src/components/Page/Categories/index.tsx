import React from "react";
import { Image } from "@/components/UI";
import { HiChevronRight } from "react-icons/hi2";
import { useCategoriesData } from "../AppWrapper/AppData/Provider";
import { useRouter } from "next/router";
import CategoriesLoading from "./Loading";
import NoDataError from "../Error/NoDataError";
import Link from "next/link";
import useCategoryStore from "@/store/CategoryStore";
import utils from "@/utils";
import url from "@/common/constant/url";
import { ESort } from "@/common/enum";

const { PRODUCT_LIST } = url;

interface CategoriesProps {
  highlight?: boolean;
}

const Categories: React.FC<CategoriesProps> = ({ highlight = false }) => {
  const { data: categoriesWithSubs, loading, error } = useCategoriesData();

  const { query } = useRouter();

  const [show, showCategories] = useCategoryStore((state) => [state.show, state.showCategories]);

  const isHighLight = show && highlight;

  const highLightClassName = isHighLight ? "categories-highlight" : "";

  const backdropActiveClassName = isHighLight ? "categories-backdrop-active" : "";

  const mainClassName = utils.formatClassName("categories", highLightClassName);

  const backdropClassName = utils.formatClassName("categories-backdrop", backdropActiveClassName);

  const renderCategories = () => {
    const commonQuery = { page: 1, limit: 12, sortBy: ESort.PRICE_GO_UP, ...query };
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
    <React.Fragment>
      {isHighLight && <div className={backdropClassName} onClick={showCategories} />}
      <div className={mainClassName}>{renderContent()}</div>
    </React.Fragment>
  );
};

export default Categories;
