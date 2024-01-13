import React from "react";
import { UI } from "@/components";
import type { DropdownItems } from "@/components/UI/Dropdown/type";
import { Lang } from "@/common/type";
import { HiChevronDown } from "react-icons/hi2";
import Link from "next/link";
import url from "@/common/constant/url";

const { PRODUCT_LIST } = url;

const { Dropdown, Space } = UI;

interface ProductsFilterProps {
  lang: Lang;
}

const ProductsFilter: React.FC<ProductsFilterProps> = ({ lang }) => {
  const [title, setTitle] = React.useState<string>(lang.options.sort.priceGoUp);

  const items: DropdownItems = [
    { id: "1", label: <Link href={PRODUCT_LIST}>{lang.options.sort.priceGoUp}</Link> },
    { id: "2", label: <Link href={PRODUCT_LIST}>{lang.options.sort.priceGoDown}</Link> },
  ];

  return (
    <Dropdown items={items} placement="right">
      <Space align="middle" rootClassName="list-filter">
        <span>{title}</span>
        <HiChevronDown />
      </Space>
    </Dropdown>
  );
};

export default ProductsFilter;
