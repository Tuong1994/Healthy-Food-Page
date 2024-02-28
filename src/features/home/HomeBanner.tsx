import { FC } from "react";
import { Grid, Carousel } from "@/components/UI";
import { ELang } from "@/common/enum";
import { useLang } from "@/hooks";
import type { CarouselItems } from "@/components/UI/Carousel/type";
import Categories from "@/components/Page/Categories";
import useCategoryStore from "@/store/CategoryStore";

const { Row, Col } = Grid;

const { Horizontal } = Carousel;

interface HomeBannerProps {}

const HomeBanner: FC<HomeBannerProps> = () => {
  const { locale } = useLang();

  const show = useCategoryStore((state) => state.show);

  const slides: CarouselItems = [
    {
      id: "1",
      content:
        locale === ELang.EN ? (
          <div className="slide-item slide-en-1" />
        ) : (
          <div className="slide-item slide-vn-1" />
        ),
    },
    {
      id: "2",
      content:
        locale === ELang.EN ? (
          <div className="slide-item slide-en-2" />
        ) : (
          <div className="slide-item slide-vn-2" />
        ),
    },
    {
      id: "3",
      content:
        locale === ELang.EN ? (
          <div className="slide-item slide-en-3" />
        ) : (
          <div className="slide-item slide-vn-3" />
        ),
    },
    {
      id: "4",
      content:
        locale === ELang.EN ? (
          <div className="slide-item slide-en-4" />
        ) : (
          <div className="slide-item slide-vn-4" />
        ),
    },
    {
      id: "5",
      content:
        locale === ELang.EN ? (
          <div className="slide-item slide-en-5" />
        ) : (
          <div className="slide-item slide-vn-5" />
        ),
    },
  ];

  return (
    <Row justify="end" rootClassName="home-banner">
      <Col xs={0} md={0} lg={6} span={4}>
        {!show && <Categories />}
      </Col>
      <Col xs={24} md={24} lg={18} span={20}>
        <div className="banner-carousel">
          <Horizontal items={slides} autoPlay infinite rootClassName="carousel-slide" />
        </div>
      </Col>
    </Row>
  );
};

export default HomeBanner;
