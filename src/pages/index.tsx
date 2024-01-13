import { NextPage } from "next";
import CategoryMobile from "@/components/Mobile/CategoryMobile";
import HomeBanner from "@/features/home/HomeBanner";
import HomeCategory from "@/features/home/HomeCategory";

const Home: NextPage = () => {
  return (
    <div className="home">
      <HomeBanner />
      <CategoryMobile />
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
