import { NextPage } from "next";
import { UI } from "@/components";
import { BreadcrumbItems } from "@/components/UI/Breadcrumb/type";
import { useLang } from "@/hooks";
import Link from "next/link";
import ProductInfo from "@/features/product/detail/ProductInfo";
import ProductSimilar from "@/features/product/detail/ProductSimilar";
import ProductTabs from "@/features/product/detail/ProductTabs";
import url from "@/common/constant/url";

const { HOME, PRODUCT_LIST } = url;

const { Breadcrumb } = UI;

const Product: NextPage = () => {
  const { lang } = useLang();

  const items: BreadcrumbItems = [
    { id: "1", label: <Link href={HOME}>{lang.common.menu.home}</Link> },
    { id: "2", label: <Link href={PRODUCT_LIST}>Category</Link> },
    { id: "3", label: "Product", actived: true },
  ];

  return (
    <div className="page product-detail">
      <Breadcrumb items={items} />
      <ProductInfo lang={lang} />
      <ProductTabs lang={lang} />
      <ProductSimilar lang={lang} />
    </div>
  );
};

export default Product;
