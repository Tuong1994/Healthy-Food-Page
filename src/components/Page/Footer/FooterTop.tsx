import { FC } from "react";
import { Breadcrumb, Typography, Grid } from "@/components/UI";
import type { BreadcrumbItems } from "@/components/UI/Breadcrumb/type";
import { ESort } from "@/common/enum";
import { useRouter } from "next/router";
import useCategoryStore from "@/store/CategoryStore";
import FooterLoading from "./FooterLoading";
import NoDataError from "../Error/NoDataError";
import Link from "next/link";
import url from "@/common/constant/url";

const { PRODUCT_LIST } = url;

const { Row, Col } = Grid;

const { Paragraph } = Typography;

interface FooterTopProps {}

const FooterTop: FC<FooterTopProps> = () => {
  const categories = useCategoryStore((state) => state.categories);

  const { data: categoriesWithSubs, loading, error } = categories;

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
                <Paragraph strong rootClassName="top-category">
                  {category.name}
                </Paragraph>
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
