import { FC } from "react";
import { Tabs, Typography } from "@/components/UI";
import type { Lang } from "@/common/type";
import type { TabsItems } from "@/components/UI/Tabs/type";
import type { Product } from "@/services/product/type";
import Comment from "@/components/Page/Comment";
import ReactHtmlParser from "react-html-parser";

const { Paragraph } = Typography;

interface ProductTabsProps {
  lang: Lang;
  product: Product;
}

const ProductTabs: FC<ProductTabsProps> = ({ lang, product }) => {
  const tabs: TabsItems = [
    {
      id: "1",
      title: lang.product.detail.description.title,
      content: product.description ? (
        <div className="tabs-description">{ReactHtmlParser(product.description)}</div>
      ) : (
        <Paragraph variant="secondary" italic>
          {lang.product.detail.description.note}
        </Paragraph>
      ),
    },
    { id: "2", title: lang.product.detail.comment, content: <Comment /> },
  ];

  return (
    <div className="detail-tabs">
      <Tabs color="green" items={tabs} />
    </div>
  );
};

export default ProductTabs;
