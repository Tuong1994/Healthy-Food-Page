import React from "react";
import { Control } from "@/components";
import { FaSearch } from "react-icons/fa";
import Link from "next/link";
import url from "@/common/constant/url";

const { SEARCH } = url;

const { Input } = Control;

interface HeaderSearchProps {}

const HeaderSearch: React.FC<HeaderSearchProps> = () => {
  const searchIcon = (
    <Link href={SEARCH} className="search-icon">
      <FaSearch />
    </Link>
  );

  return <Input rootClassName="bottom-search" color="green" addonAfter={searchIcon} />;
};

export default HeaderSearch;
