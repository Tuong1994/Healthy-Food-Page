import { FC, useState } from "react";
import { Empty, Typography, Grid, Button } from "@/components/UI";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { LIST_LIMIT_ITEMS } from "@/services/helper";
import { ESort } from "@/common/enum";
import { useLang } from "@/hooks";
import { useRouter } from "next/router";
import { useKeenSlider } from "keen-slider/react";
import type { Product } from "@/services/product/type";
import type { Category } from "@/services/category/type";
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
  const [currentSlide, setCurrentSlide] = useState<number>(0);

  const [loaded, setLoaded] = useState<boolean>(false);

  const { lang } = useLang();

  const { query } = useRouter();

  const [sliderRef, instanceRef] = useKeenSlider({
    loop: false,
    mode: "free",
    slides: {
      perView: 6,
      spacing: 10,
    },
    breakpoints: {
      "(max-width: 1024px)": {
        slides: { perView: 4, spacing: 10 },
      },
      "(max-width: 992px)": {
        slides: { perView: 3, spacing: 10 },
      },
      "(max-width: 768px)": {
        slides: { perView: 3, spacing: 5 },
      },
      "(max-width: 667px)": {
        slides: { perView: 2, spacing: 5 },
      },
      "(max-width: 480px)": {
        slides: { perView: 1, spacing: 5 },
      },
      "(max-width: 375px)": {
        slides: { perView: 1, spacing: 5 },
      },
    },
    initial: 0,
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    created() {
      setLoaded(true);
    },
  });

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
      <div key={product.id} className="keen-slider__slide">
        <ProductCard product={product} loading={loading} cardWidth={230} rootClassName="products-item" />
      </div>
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
              query: {
                page: 1,
                limit: LIST_LIMIT_ITEMS,
                categoryId: category?.id,
                sortBy: ESort.PRICE_GO_UP,
                ...query,
              },
            }}
            className="category-link"
          >
            {lang.home.link}
          </Link>
        </Col>
      </Row>

      <div ref={sliderRef} className="category-products keen-slider">
        {renderProducts()}
        {loaded && instanceRef.current && (
          <>
            <Button
              shape="round"
              color="green"
              rootClassName="products-button"
              disabled={currentSlide === 0}
              onClick={(e: any) => e.stopPropagation() || instanceRef.current?.prev()}
            >
              <FaAngleLeft size={18} />
            </Button>
            <Button
              shape="round"
              color="green"
              rootClassName="products-button"
              disabled={currentSlide === instanceRef.current.track.details.slides.length - 1}
              onClick={(e: any) => e.stopPropagation() || instanceRef.current?.next()}
            >
              <FaAngleRight size={18} />
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default HomeCategory;
