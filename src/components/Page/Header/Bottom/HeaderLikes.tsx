import React from "react";
import { CgHeart } from "react-icons/cg";
import Link from "next/link";
import url from "@/common/constant/url";

const { FAVORITE } = url;

interface HeaderLikesProps {}

const HeaderLikes: React.FC<HeaderLikesProps> = () => {
  return (
    <Link href={FAVORITE}>
      <button className="bottom-likes">
        <CgHeart size={25} />
      </button>
    </Link>
  );
};

export default HeaderLikes;
