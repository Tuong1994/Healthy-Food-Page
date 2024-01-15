import React from "react";
import { NextPage } from "next";
import CategoriesMobile from "@/components/Mobile/CategoriesMobile";
import HomeBanner from "@/features/home/HomeBanner";
import HomeCategory from "@/features/home/HomeCategory";

const Home: NextPage = () => {
  return (
    <div className="home">
      <HomeBanner />
      <CategoriesMobile />
      <HomeCategory />
      <HomeCategory />
      <HomeCategory />
      <HomeCategory />
      <HomeCategory />
      <HomeCategory />
      <HomeCategory />
      <HomeCategory />
    </div>
  );
};

export default Home;
