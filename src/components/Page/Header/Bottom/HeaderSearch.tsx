import { FC, KeyboardEvent, useState } from "react";
import { Input } from "@/components/Control";
import { FaSearch } from "react-icons/fa";
import { useRouter } from "next/router";
import { useLang, useViewpoint } from "@/hooks";
import { LIST_LIMIT_ITEMS } from "@/services/helper";
import url from "@/common/constant/url";
import utils from "@/utils";

const { SEARCH } = url;

interface HeaderSearchProps {}

const HeaderSearch: FC<HeaderSearchProps> = () => {
  const { locale, lang } = useLang();

  const { isPhone, isSmTablet } = useViewpoint();

  const [keywords, setKeywords] = useState<string>("");

  const router = useRouter();

  const responsive = isPhone || isSmTablet

  const inputSize = responsive ? 'md' : 'lg'

  const disabledClassName = !keywords ? "search-icon-disabled" : "";

  const handleNavigate = () => {
    router.push({ pathname: SEARCH, query: { page: 1, limit: LIST_LIMIT_ITEMS, keywords, langCode: locale } });
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
      sizes={inputSize}
      value={keywords}
      addonAfter={searchIcon}
      placeholder={lang.common.form.placeholder.search}
      onKeyDown={handleKeyPress}
      onChangeInput={handleChangeInput}
    />
  );
};

export default HeaderSearch;
