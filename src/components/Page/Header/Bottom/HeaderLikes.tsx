import { FC } from "react";
import { CgHeart } from "react-icons/cg";
import { useMounted } from "@/hooks";
import useAuthStore from "@/store/AuthStore";
import Link from "next/link";
import url from "@/common/constant/url";

const { AUTH_SIGN_IN, FAVORITE } = url;

interface HeaderLikesProps {}

const HeaderLikes: FC<HeaderLikesProps> = () => {
  const auth = useAuthStore((state) => state.auth);

  const isMounted = useMounted();

  if (!isMounted) return null;

  return (
    <Link href={{ pathname: !auth.isAuth ? AUTH_SIGN_IN : FAVORITE }}>
      <button className="bottom-likes">
        <CgHeart size={25} />
      </button>
    </Link>
  );
};

export default HeaderLikes;
