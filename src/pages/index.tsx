import { useEffect } from "react";
import type { GetServerSideProps, NextPage } from "next";
import type { ApiResponse, Paging } from "@/services/type";
import type { Product } from "@/services/product/type";
import { getProductsByCategories } from "@/common/actions/getProductsByCategories";
import CategoriesMobile from "@/components/Mobile/CategoriesMobile";
import HomeBanner from "@/features/home/HomeBanner";
import HomeCategory from "@/features/home/HomeCategory";
import useProductStore from "@/store/ProductStore";

interface HomeProps {
  items: ApiResponse<Paging<Product>>[];
}

const Home: NextPage<HomeProps> = ({ items = [] }) => {
  const [productsByCategories, setProductsByCategories] = useProductStore((state) => [
    state.productsByCategories,
    state.setProductsByCategories,
  ]);

  useEffect(() => {
    if (items.length > 0) setProductsByCategories(items);
  }, [items]);

  const renderProducts = () => {
    return productsByCategories.map((item, idx) => {
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
  const items = await getProductsByCategories(query);
  return {
    props: {
      items,
    },
  };
};
