import React from "react";
import { UI } from "@/components";
import { DropdownItems } from "@/components/UI/Dropdown/type";
import { ESort } from "@/common/enum";
import { Lang } from "@/common/type";
import { HiChevronDown } from "react-icons/hi2";
import { useRouter } from "next/router";
import Link from "next/link";
import url from "@/common/constant/url";

const { PRODUCT_LIST } = url;

const { Dropdown, Space } = UI;

interface ProductsFilterProps {
  lang: Lang;
}

const ProductsFilter: React.FC<ProductsFilterProps> = ({ lang }) => {
  const { query } = useRouter();

  const [title, setTitle] = React.useState<string>(lang.options.sort.priceGoUp);

  const items: DropdownItems = [
    {
      id: "1",
      label: (
        <Link
          href={{ pathname: PRODUCT_LIST, query: { ...query, sortBy: ESort.PRICE_GO_UP } }}
          onClick={() => setTitle(lang.options.sort.priceGoUp)}
        >
          {lang.options.sort.priceGoUp}
        </Link>
      ),
    },
    {
      id: "2",
      label: (
        <Link
          href={{ pathname: PRODUCT_LIST, query: { ...query, sortBy: ESort.PRICE_GO_DOWN } }}
          onClick={() => setTitle(lang.options.sort.priceGoDown)}
        >
          {lang.options.sort.priceGoDown}
        </Link>
      ),
    },
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
