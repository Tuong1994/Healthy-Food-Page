import React from "react";
import { Image } from "@/components/UI";
import { HiChevronRight } from "react-icons/hi2";
import { useCategoriesData } from "../AppWrapper/AppData/Provider";
import CategoriesLoading from "./Loading";
import NoDataError from "../Error/NoDataError";
import useCategoryStore from "@/store/CategoryStore";
import utils from "@/utils";

interface CategoriesProps {
  highlight?: boolean;
}

const Categories: React.FC<CategoriesProps> = ({ highlight = false }) => {
  const { data: categoriesWithSubs, loading, error } = useCategoriesData();

  const [show, showCategories] = useCategoryStore((state) => [state.show, state.showCategories]);

  const isHighLight = show && highlight;

  const highLightClassName = isHighLight ? "categories-highlight" : "";

  const backdropActiveClassName = isHighLight ? "categories-backdrop-active" : "";

  const mainClassName = utils.formatClassName("categories", highLightClassName);

  const backdropClassName = utils.formatClassName("categories-backdrop", backdropActiveClassName);

  const renderCategories = () => {
    return categoriesWithSubs.map((category) => (
      <div key={category.id} className="categories-item">
        <div className="item-wrap">
          <div className="wrap-content">
            <Image imgWidth={20} imgHeight={20} />
            <span>{category.name}</span>
          </div>
          <HiChevronRight size={16} />
        </div>

        <div className="item-child">
          {category.subCategories.map((subcategory) => (
            <div key={subcategory.id} className="child-inner">
              {subcategory.name}
            </div>
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
