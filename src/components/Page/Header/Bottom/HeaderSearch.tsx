import { FC, KeyboardEvent, useState } from "react";
import { Input } from "@/components/Control";
import { FaSearch } from "react-icons/fa";
import { useRouter } from "next/router";
import type { Lang } from "@/common/type";
import url from "@/common/constant/url";
import utils from "@/utils";

const { SEARCH } = url;

interface HeaderSearchProps {
  lang: Lang;
}

const HeaderSearch: FC<HeaderSearchProps> = ({ lang }) => {
  const [keywords, setKeywords] = useState<string>("");

  const router = useRouter();

  const disabledClassName = !keywords ? "search-icon-disabled" : "";

  const handleNavigate = () => {
    router.push({ pathname: SEARCH, query: { page: 1, limit: 12, keywords } });
    setKeywords("");
  };

  const handleChangeInput = (text: string) => setKeywords(text);

  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.key === "Enter") handleNavigate();
  };

  const searchIcon = (
    <button
      type="button"
      disabled={!keywords}
      className={utils.formatClassName("search-icon", disabledClassName)}
      onClick={handleNavigate}
    >
      <FaSearch />
    </button>
  );

  return (
    <Input
      color="green"
      rootClassName="bottom-search"
      placeholder={lang.common.form.placeholder.search}
      value={keywords}
      addonAfter={searchIcon}
      onKeyDown={handleKeyPress}
      onChangeInput={handleChangeInput}
    />
  );
};

export default HeaderSearch;
