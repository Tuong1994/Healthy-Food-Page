import React from "react";
import { UI } from "@/components";
import { BreadcrumbItems } from "@/components/UI/Breadcrumb/type";
import { useCategoriesData } from "../AppWrapper/AppData/Provider";
import FooterLoading from "./FooterLoading";
import NoDataError from "../Error/NoDataError";

const { Breadcrumb, Typography, Grid } = UI;

const { Row, Col } = Grid;

const { Paragraph } = Typography;

interface FooterTopProps {}

const FooterTop: React.FC<FooterTopProps> = () => {
  const { data: categoriesWithSubs, loading, error } = useCategoriesData();

  const renderCategories = () => {
    return (
      <Row justify="between">
        {categoriesWithSubs.map((category) => {
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

  const renderContent = () => {
    if (loading) return <FooterLoading />;
    if (error) return <NoDataError />;
    return renderCategories();
  };

  return <div className="footer-top">{renderContent()}</div>;
};

export default FooterTop;
