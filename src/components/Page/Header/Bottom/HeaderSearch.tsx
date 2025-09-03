import { FC, KeyboardEvent, useRef, useState } from "react";
import { Image, Typography } from "@/components/UI";
import { Input } from "@/components/Control";
import { FaSearch } from "react-icons/fa";
import { useRouter } from "next/router";
import { useClickOutside, useLang, useRender, useViewpoint } from "@/hooks";
import { LIST_LIMIT_ITEMS } from "@/services/helper";
import url from "@/common/constant/url";
import utils from "@/utils";

const { Paragraph } = Typography;

const { SEARCH } = url;

interface HeaderSearchProps {}

const HeaderSearch: FC<HeaderSearchProps> = () => {
  const { locale, lang } = useLang();

  const { isPhone, isSmTablet } = useViewpoint();

  const [keywords, setKeywords] = useState<string>("");

  const [dropdown, setDropdown] = useState<boolean>(false);

  const searchRef = useRef<HTMLDivElement | null>(null)

  const router = useRouter();

  const render = useRender(dropdown)

  useClickOutside(searchRef, setDropdown)

  const responsive = isPhone || isSmTablet;

  const inputSize = responsive ? "md" : "lg";

  const disabledClassName = !keywords ? "search-icon-disabled" : "";

  const activeClassName = dropdown ? "search-dropdown-active" : "";

  const dropdownClassName = utils.formatClassName("search-dropdown", activeClassName);

  const handleNavigate = () => {
    router.push({
      pathname: SEARCH,
      query: { page: 1, limit: LIST_LIMIT_ITEMS, keywords, langCode: locale },
    });
    setKeywords("");
  };

  const handleChangeInput = (text: string) => setKeywords(text);

  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.key === "Enter") handleNavigate();
  };

  const handleOpenDropdown = () => setDropdown(true);

  const renderProductItems = () => {
    return [...Array(10)].map((_, idx) => (
      <div key={idx} className="dropdown-item">
        <Image imgWidth={60} imgHeight={60} />
        <Paragraph rootClassName="item-name">Product name</Paragraph>
      </div>
    ));
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
    <div ref={searchRef} className="bottom-search" onFocus={handleOpenDropdown}>
      <Input
        color="green"
        sizes={inputSize}
        value={keywords}
        addonAfter={searchIcon}
        placeholder={lang.common.form.placeholder.search}
        onKeyDown={handleKeyPress}
        onChangeInput={handleChangeInput}
      />
      {render && <div className={dropdownClassName}>{renderProductItems()}</div>}
    </div>
  );
};

export default HeaderSearch;
