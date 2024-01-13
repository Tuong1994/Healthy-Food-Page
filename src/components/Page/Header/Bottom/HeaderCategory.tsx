import React from "react";
import { UI } from "@/components";
import { Lang } from "@/common/type";
import { FaListAlt } from "react-icons/fa";
import Categories from "../../Categories";
import useCategoryStore from "@/store/CategoryStore";

const { Button, Space } = UI;

interface HeaderCategoryProps {
  lang: Lang;
}

const HeaderCategory: React.FC<HeaderCategoryProps> = ({ lang }) => {
  const [show, showCategories] = useCategoryStore((state) => [state.show, state.showCategories]);

  return (
    <div className="bottom-category">
      <Button sizes="lg" color="green" ghost rootClassName="category-btn" onClick={showCategories}>
        <Space align="middle">
          <FaListAlt />
          <span>{lang.pageComponent.header.category}</span>
        </Space>
      </Button>

      {show && <Categories highlight />}
    </div>
  );
};

export default HeaderCategory;
