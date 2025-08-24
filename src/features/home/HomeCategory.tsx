import { FC } from "react";
import { Empty, Typography, Grid } from "@/components/UI";
import type { Product } from "@/services/product/type";
import type { Category } from "@/services/category/type";
import { LIST_LIMIT_ITEMS } from "@/services/helper";
import { ESort } from "@/common/enum";
import { useLang } from "@/hooks";
import { useRouter } from "next/router";
import Link from "next/link";
import ProductCard from "@/components/Page/ProductCard";
import NoDataError from "@/components/Page/Error/NoDataError";
import url from "@/common/constant/url";

const { PRODUCT_LIST } = url;

const { Title } = Typography;

const { Row, Col } = Grid;

interface HomeCategoryProps {
  loading: boolean;
  error: boolean;
  products: Product[];
}

const HomeCategory: FC<HomeCategoryProps> = ({ loading, error, products = [] }) => {
  const { lang } = useLang();

  const { query } = useRouter();

  const category = products.length > 0 ? (products[0].category as Category) : null;

  const renderProducts = () => {
    if (error)
      return (
        <div className="error-wrapper">
          <NoDataError />
        </div>
      );
    if (!products.length) return <Empty text={lang.common.description.empty} />;
    return products.map((product) => (
      <ProductCard
        key={product.id}
        product={product}
        loading={loading}
        cardWidth={230}
        rootClassName="products-item"
      />
    ));
  };

  return (
    <div className="home-category">
      <Row justify="between" align="middle">
        <Col>
          <Title level={5} weight={600} rootClassName="category-name">
            {category?.name}
          </Title>
        </Col>
        <Col>
          <Link
            href={{
              pathname: PRODUCT_LIST,
              query: { page: 1, limit: LIST_LIMIT_ITEMS, categoryId: category?.id, sortBy: ESort.PRICE_GO_UP, ...query },
            }}
            className="category-link"
          >
            {lang.home.link}
          </Link>
        </Col>
      </Row>

      <div className="category-products">{renderProducts()}</div>
    </div>
  );
};

export default HomeCategory;
