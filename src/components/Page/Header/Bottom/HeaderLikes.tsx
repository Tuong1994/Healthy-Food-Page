import { FC } from "react";
import { CgHeart } from "react-icons/cg";
import { useLang, useMounted } from "@/hooks";
import Link from "next/link";
import useAuthStore from "@/store/AuthStore";
import url from "@/common/constant/url";

const { FAVORITE } = url;

interface HeaderLikesProps {}

const HeaderLikes: FC<HeaderLikesProps> = () => {
  const { locale } = useLang();

  const auth = useAuthStore((state) => state.auth);

  const { info } = auth;

  const isMounted = useMounted();

  if (!isMounted) return null;

  return (
    <Link
      href={{
        pathname: FAVORITE,
        query: { page: 1, limit: 12, id: info.id, langCode: locale },
      }}
    >
      <button className="bottom-likes">
        <CgHeart size={25} />
      </button>
    </Link>
  );
};

export default HeaderLikes;
