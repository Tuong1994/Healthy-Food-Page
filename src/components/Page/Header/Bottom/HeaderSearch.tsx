import { FC, KeyboardEvent, useEffect, useMemo, useRef, useState } from "react";
import { Image, Typography, Loading, Space } from "@/components/UI";
import { Input } from "@/components/Control";
import { FaSearch } from "react-icons/fa";
import { useRouter } from "next/router";
import { Url } from "next/dist/shared/lib/router/router";
import { useAsync, useClickOutside, useDebounce, useLang, useRender, useViewpoint } from "@/hooks";
import { Product } from "@/services/product/type";
import { ApiQuery, Paging } from "@/services/type";
import { getProductsPaging } from "@/services/product/api";
import { LIST_LIMIT_ITEMS } from "@/services/helper";
import NoDataError from "../../Error/NoDataError";
import Link from "next/link";
import url from "@/common/constant/url";
import utils from "@/utils";
import helper from "@/helper";

const { Paragraph } = Typography;

const { Skeleton } = Loading;

const { SEARCH, PRODUCT_DETAIL } = url;

interface HeaderSearchProps {}

const HeaderSearch: FC<HeaderSearchProps> = () => {
  const { locale, lang } = useLang();

  const { isPhone, isSmTablet } = useViewpoint();

  const [productsSearched, setProductsSearched] = useState<Paging<Product>>(helper.defaultPagingCollection());

  const [keywords, setKeywords] = useState<string>("");

  const [dropdown, setDropdown] = useState<boolean>(false);

  const searchRef = useRef<HTMLDivElement | null>(null);

  const debounce = useDebounce(keywords);

  const render = useRender(dropdown);

  useClickOutside(searchRef, setDropdown);

  const { query, push: routerPush } = useRouter();

  const { loading, call: searchProducts } = useAsync<Paging<Product>>(getProductsPaging);

  const responsive = isPhone || isSmTablet;

  const inputSize = responsive ? "md" : "lg";

  const disabledClassName = !keywords ? "search-icon-disabled" : "";

  const activeClassName = dropdown ? "search-dropdown-active" : "";

  const dropdownClassName = utils.formatClassName("search-dropdown", activeClassName);

  const apiQuery = useMemo<ApiQuery>(
    () => ({ page: 1, limit: LIST_LIMIT_ITEMS, keywords: debounce, langCode: locale }),
    [debounce, locale]
  );

  const getProducts = async () => {
    const response = await searchProducts({ ...apiQuery });
    if (response.success) setProductsSearched(response.data);
  };

  useEffect(() => {
    if (keywords) handleTriggerDropdown();
  }, [keywords]);

  useEffect(() => {
    getProducts();
  }, [debounce]);

  const handleChangeInput = async (text: string) => setKeywords(text);

  const handleNavigate = () => {
    routerPush({ pathname: SEARCH, query: apiQuery });
    setKeywords("");
  };

  const handleTriggerDropdown = () => {
    if (keywords) setDropdown(true);
  };

  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.key === "Enter") handleNavigate();
  };

  const renderDropdownContent = () => {
    if (loading) {
      return [...Array(10)].map((_, idx) => (
        <Space key={idx} align="middle" style={{ marginBottom: "1rem" }}>
          <Skeleton type="image" options={{ width: 60, height: 60 }} />
          <Skeleton type="title" options={{ width: "80%" }} />
        </Space>
      ));
    }
    if (!productsSearched.items.length) return <NoDataError message="No products were founded" />;
    return productsSearched.items.map((product) => {
      const link: Url = { pathname: PRODUCT_DETAIL, query: { id: product.id, langCode: query.langCode } };
      return (
        <Link key={product.id} href={link} className="dropdown-item">
          <Image imgWidth={60} imgHeight={60} src={product.image?.path} alt={product.name} />
          <Paragraph rootClassName="item-name">{product.name}</Paragraph>
        </Link>
      );
    });
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
    <div ref={searchRef} className="bottom-search" onClick={handleTriggerDropdown}>
      <Input
        color="green"
        sizes={inputSize}
        value={keywords}
        addonAfter={searchIcon}
        placeholder={lang.common.form.placeholder.search}
        onKeyDown={handleKeyPress}
        onChangeInput={handleChangeInput}
      />
      {render && <div className={dropdownClassName}>{renderDropdownContent()}</div>}
    </div>
  );
};

export default HeaderSearch;
