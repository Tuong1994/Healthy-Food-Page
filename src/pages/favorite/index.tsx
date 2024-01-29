import { Fragment, useEffect } from "react";
import { GetServerSideProps, NextPage } from "next";
import { Breadcrumb, Card, Pagination, Typography, Empty } from "@/components/UI";
import type { BreadcrumbItems } from "@/components/UI/Breadcrumb/type";
import type { Product } from "@/services/product/type";
import type { ApiQuery, ApiResponse, Paging } from "@/services/type";
import type { Like } from "@/services/like/type";
import { getLikesPaging } from "@/services/like/api";
import { useLang } from "@/hooks";
import { useRouter } from "next/router";
import NoDataError from "@/components/Page/Error/NoDataError";
import ProductCard from "@/components/Page/ProductCard";
import Link from "next/link";
import useLikeStore from "@/store/LikeStore";
import url from "@/common/constant/url";

const { HOME, FAVORITE } = url;

const { Title } = Typography;

interface FavoriteProps {
  likesResponse: ApiResponse<Paging<Like>>;
}

const Favorite: NextPage<FavoriteProps> = ({ likesResponse }) => {
  const { locale, lang } = useLang();

  const { query, push: routerPush } = useRouter();

  const [likesPaging, setLikesPaging] = useLikeStore((state) => [state.likesPaging, state.setLikesPaging]);

  const items: BreadcrumbItems = [
    {
      id: "1",
      label: <Link href={{ pathname: HOME, query: { langCode: locale } }}>{lang.common.menu.home}</Link>,
    },
    { id: "2", label: lang.favorite.title, actived: true },
  ];

  useEffect(() => {
    if (likesResponse && likesResponse.success) setLikesPaging(likesResponse.data);
  }, [likesResponse]);

  const handleChangePage = (page: number) => {
    routerPush({ pathname: FAVORITE, query: { ...query, page } });
  };

  const renderContent = () => {
    if (!likesResponse) return <NoDataError />;
    const { success, data } = likesResponse;
    if (!success) return <NoDataError />;
    if (likesPaging && likesPaging.items && !likesPaging.items.length)
      return <Empty text={lang.favorite.empty} />;
    return (
      <Fragment>
        <div className="wrap-list">
          {likesPaging.items.map((like) => (
            <ProductCard
              responsive
              key={like.id}
              imgHeight={200}
              like={like}
              product={like.product as Product}
            />
          ))}
        </div>
        <Pagination
          ghost
          color="green"
          shape="square"
          rootClassName="list-pagination"
          total={data.totalItems ?? 0}
          onChangePage={handleChangePage}
        />
      </Fragment>
    );
  };

  return (
    <div className="page favorite">
      <Breadcrumb items={items} />
      <Title level={4} weight={600}>
        {lang.favorite.title}
      </Title>
      <Card bodyClassName="favorite-wrap">{renderContent()}</Card>
    </div>
  );
};

export default Favorite;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { query } = context;
  const apiQuery: ApiQuery = { customerId: query.id as string, ...query };
  const likesResponse = await getLikesPaging(apiQuery);
  return {
    props: {
      likesResponse,
    },
  };
};
