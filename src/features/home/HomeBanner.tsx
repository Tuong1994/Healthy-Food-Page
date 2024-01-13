import React from "react";
import { UI } from "@/components";
import { CarouselItems } from "@/components/UI/Carousel/type";
import Categories from "@/components/Page/Categories";
import useCategoryStore from "@/store/CategoryStore";

const { Grid, Carousel } = UI;

const { Row, Col } = Grid;

const { Horizontal } = Carousel;

interface HomeBannerProps {}

const HomeBanner: React.FC<HomeBannerProps> = () => {
  const show = useCategoryStore((state) => state.show);

  const slides: CarouselItems = [
    { id: "1", content: <div style={{ width: "100%", height: "100%", background: "lightcoral" }}></div> },
    { id: "2", content: <div style={{ width: "100%", height: "100%", background: "lightblue" }}></div> },
    { id: "3", content: <div style={{ width: "100%", height: "100%", background: "lightgreen" }}></div> },
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
