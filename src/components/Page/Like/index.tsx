import { FC, useMemo } from "react";
import { Loading } from "@/components/UI";
import { HiHeart } from "react-icons/hi2";
import { IoHeartDislike } from "react-icons/io5";
import type { Like as LikeType, LikeData } from "@/services/like/type";
import type { Product } from "@/services/product/type";
import type { ApiQuery } from "@/services/type";
import { createLike, getLikesPaging, removeLikes } from "@/services/like/api";
import { getProductsByCategories } from "@/common/actions/getProductsByCategories";
import { getProductsByCateAndSubcate } from "@/common/actions/getProductsByCateAndSubcate";
import { getProductDetail } from "@/common/actions/getProduct";
import { useAsync, useLang, useMounted } from "@/hooks";
import { useRouter } from "next/router";
import useAuthStore from "@/store/AuthStore";
import useMessage from "@/components/UI/ToastMessage/useMessage";
import useProductStore from "@/store/ProductStore";
import useLikeStore from "@/store/LikeStore";
import url from "@/common/constant/url";
import utils from "@/utils";

const { HOME, PRODUCT_LIST, PRODUCT_DETAIL, FAVORITE, AUTH_SIGN_IN } = url;

const { Spinner } = Loading;

const ICON_SIZE = 20;

interface LikeProps {
  product: Product;
  like?: LikeType;
}

const Like: FC<LikeProps> = ({ product, like }) => {
  const messageApi = useMessage();

  const isMounted = useMounted();

  const auth = useAuthStore((state) => state.auth);

  const [setProductsByCategories, setProductsPaging, setProduct] = useProductStore((state) => [
    state.setProductsByCategories,
    state.setProductsPaging,
    state.setProduct,
  ]);

  const setLikesPaging = useLikeStore((state) => state.setLikesPaging);

  const { query, pathname, push: routerPush } = useRouter();

  const { lang } = useLang();

  const { loading: createLoading, call: onCreate } = useAsync(createLike);

  const { loading: removeLoading, call: onRemove } = useAsync(removeLikes);

  const { isAuth, info } = auth;

  const isLiked = useMemo(() => {
    if (!product) return false;
    if (!product.likes || !product.likes.length) return false;
    return product.likes.findIndex((like) => like.userId === info.id) > -1;
  }, [JSON.stringify(product.likes)]);

  const likedClassName = isLiked ? "like-icon-active" : "";

  const iconClassName = utils.formatClassName("like-icon", likedClassName);

  const onReFetchProduct = async () => {
    switch (pathname) {
      case HOME: {
        const items = await getProductsByCategories(query);
        setProductsByCategories(items);
        break;
      }
      case PRODUCT_LIST: {
        const response = await getProductsByCateAndSubcate(query);
        setProductsPaging(response.data);
        break;
      }
      case PRODUCT_DETAIL: {
        const response = await getProductDetail(query);
        setProduct(response.data);
        break;
      }
    }
  };

  const onReFetchLikes = async () => {
    const apiQuery = { customerId: query.id as string, ...query } as ApiQuery;
    const response = await getLikesPaging(apiQuery);
    if (!response.success) return messageApi.error(lang.common.message.error.api);
    setLikesPaging(response.data);
  };

  const handleLike = async () => {
    if (!isAuth) return routerPush(AUTH_SIGN_IN);
    if (isLiked) return;
    const likeData: LikeData = {
      productId: product?.id ?? "",
      userId: info.id ?? "",
    };
    const response = await onCreate(likeData);
    if (!response.success) return messageApi.error(lang.common.message.error.api);
    onReFetchProduct();
    messageApi.success(lang.common.message.success.addLike);
  };

  const handleUnlike = async () => {
    if (!isAuth) return routerPush(AUTH_SIGN_IN);
    const apiQuery: ApiQuery = { ids: like?.id };
    const response = await onRemove(apiQuery);
    if (!response.success) return messageApi.error(lang.common.message.error.api);
    onReFetchLikes();
    messageApi.success(lang.common.message.success.removeLike);
  };

  if (!isMounted) return null;

  if (pathname === FAVORITE)
    return (
      <button className="like like-remove" onClick={handleUnlike}>
        {removeLoading ? <Spinner /> : <IoHeartDislike className="like-icon" size={ICON_SIZE} />}
      </button>
    );

  return (
    <button className="like like-add" onClick={handleLike}>
      {createLoading ? <Spinner /> : <HiHeart className={iconClassName} size={ICON_SIZE} />}
    </button>
  );
};

export default Like;
