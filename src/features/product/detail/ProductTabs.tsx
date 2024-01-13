import React from "react";
import { Tabs } from "@/components/UI";
import { Lang } from "@/common/type";
import { TabsItems } from "@/components/UI/Tabs/type";
import Comment from "@/components/Page/Comment";

interface ProductTabsProps {
  lang: Lang;
}

const ProductTabs: React.FC<ProductTabsProps> = ({ lang }) => {
  const tabs: TabsItems = [
    {
      id: "1",
      title: lang.product.detail.description,
      content:
        " Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti dolorum, cupiditate maiores architecto unde facere corporis harum illo sint, provident animi. Ab a quam quasi provident at dicta dolores sit, obcaecati laudantium accusantium in aliquid nesciunt ex nihil doloremque commodi omnis autem animi repudiandae minus quo sint? Saepe, qui ea debitis doloremque dolore pariatur, aperiam ipsum, magnam error sed reiciendis! Aspernatur molestiae aliquid, optio, qui omnis incidunt exercitationem similique, sint officia corporis consequatur odit? Optio voluptatibus neque atque blanditiis reprehenderit deserunt totam harum cupiditate ad id fugit quam, voluptatum sunt fugiat minima iste aperiam dolorem voluptate maiores ratione quos eius!",
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
