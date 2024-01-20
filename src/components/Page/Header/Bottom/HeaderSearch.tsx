import { FC } from "react";
import { Input } from "@/components/Control";
import { FaSearch } from "react-icons/fa";
import Link from "next/link";
import url from "@/common/constant/url";

const { SEARCH } = url;

interface HeaderSearchProps {}

const HeaderSearch: FC<HeaderSearchProps> = () => {
  const searchIcon = (
    <Link href={SEARCH} className="search-icon">
      <FaSearch />
    </Link>
  );

  return <Input rootClassName="bottom-search" color="green" addonAfter={searchIcon} />;
};

export default HeaderSearch;
