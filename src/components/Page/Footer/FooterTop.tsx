import React from "react";
import { UI } from "@/components";
import { BreadcrumbItems } from "@/components/UI/Breadcrumb/type";
import useCategoryStore from "@/store/CategoryStore";

const { Breadcrumb, Typography, Grid } = UI;

const { Row, Col } = Grid;

const { Paragraph } = Typography;

interface FooterTopProps {}

const FooterTop: React.FC<FooterTopProps> = () => {
  const categoriesWithSub = useCategoryStore((state) => state.categoriesWithSub);

  const renderCategory = () => {
    return (
      <Row justify="between">
        {categoriesWithSub.map((category) => {
          const items: BreadcrumbItems = [...category.subCategories].map((subcategory) => ({
            id: subcategory.id as string,
            label: subcategory.name,
          }));
          return (
            <Col key={category.id} lg={12} span={6}>
              <Paragraph strong>{category.name}</Paragraph>
              <Breadcrumb items={items} separator="|" style={{ marginTop: "10px" }} />
            </Col>
          );
        })}
      </Row>
    );
  };

  return <div className="footer-top">{renderCategory()}</div>;
};

export default FooterTop;
