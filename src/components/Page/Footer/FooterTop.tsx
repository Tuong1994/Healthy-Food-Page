import React from "react";
import { UI } from "@/components";
import { BreadcrumbItems } from "@/components/UI/Breadcrumb/type";
import { ESort } from "@/common/enum";
import { useCategoriesData } from "../AppWrapper/AppData/Provider";
import { useRouter } from "next/router";
import FooterLoading from "./FooterLoading";
import NoDataError from "../Error/NoDataError";
import Link from "next/link";
import url from "@/common/constant/url";

const { PRODUCT_LIST } = url;

const { Breadcrumb, Typography, Grid } = UI;

const { Row, Col } = Grid;

const { Paragraph } = Typography;

interface FooterTopProps {}

const FooterTop: React.FC<FooterTopProps> = () => {
  const { data: categoriesWithSubs, loading, error } = useCategoriesData();

  const { query } = useRouter();

  const renderCategories = () => {
    const commonQuery = { page: 1, limit: 12, sortBy: ESort.PRICE_GO_UP, ...query };
    return (
      <Row justify="between">
        {categoriesWithSubs.map((category) => {
          const items: BreadcrumbItems = [...category.subCategories].map((subcategory) => ({
            id: subcategory.id as string,
            label: (
              <Link
                href={{
                  pathname: PRODUCT_LIST,
                  query: { categoryId: category.id, subCategoryId: subcategory.id, ...commonQuery },
                }}
              >
                {subcategory.name}
              </Link>
            ),
          }));
          return (
            <Col key={category.id} lg={12} span={6}>
              <Link
                href={{
                  pathname: PRODUCT_LIST,
                  query: { categoryId: category.id, ...commonQuery },
                }}
              >
                <Paragraph strong rootClassName="top-category">{category.name}</Paragraph>
              </Link>
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
