import { FC } from "react";
import { Button, Space } from "@/components/UI";
import { FaListAlt } from "react-icons/fa";
import type { Lang } from "@/common/type";
import Categories from "../../Categories";
import useCategoryStore from "@/store/CategoryStore";

interface HeaderCategoryProps {
  lang: Lang;
}

const HeaderCategory: FC<HeaderCategoryProps> = ({ lang }) => {
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
