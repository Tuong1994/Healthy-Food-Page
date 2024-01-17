import React from "react";
import type { GetServerSideProps, NextPage } from "next";
import type { ApiQuery, ApiResponse, Paging } from "@/services/type";
import type { Product } from "@/services/product/type";
import { ELang } from "@/common/enum";
import { getCategories } from "@/services/category/api";
import { getProductsPaging } from "@/services/product/api";
import CategoriesMobile from "@/components/Mobile/CategoriesMobile";
import HomeBanner from "@/features/home/HomeBanner";
import HomeCategory from "@/features/home/HomeCategory";

interface HomeProps {
  items: ApiResponse<Paging<Product>>[];
}

const Home: NextPage<HomeProps> = ({ items = [] }) => {
  const renderProducts = () => {
    return items.map((item, idx) => {
      const products: Product[] = item.data.items ? item.data.items : [];
      return <HomeCategory key={idx} loading={false} error={item.success === false} products={products} />;
    });
  };

  return (
    <div className="home">
      <HomeBanner />
      <CategoriesMobile />
      {renderProducts()}
    </div>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { query } = context;
  const commonQuery: ApiQuery = { page: 1, limit: 10, langCode: query.langCode as ELang };
  const categories = await getCategories({ langCode: query.langCode as ELang });
  const products =
    categories.data.items?.map(async (category) => {
      const data = await getProductsPaging({ ...commonQuery, categoryId: category.id });
      return data;
    }) || [];
  const items = await Promise.all(products);
  return {
    props: {
      items,
    },
  };
};
