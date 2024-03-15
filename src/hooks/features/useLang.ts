import { useEffect } from "react";
import { useRouter } from "next/router";
import { ELang } from "@/common/enum";
import useLangStore from "@/store/LangStore";

const useLang = () => {
  const [lang, locale, switchLang] = useLangStore((state) => [state.lang, state.locale, state.switchLang]);

  const router = useRouter();

  const { query, pathname, push: routerPush } = router;

  useEffect(() => {
    const locale = window.location.search.split("langCode")[1]?.slice(1, 3);
    if (locale) sessionStorage.setItem("locale", JSON.stringify(locale ?? ELang.EN));
  }, []);

  const handleSwitchLang = (locale: ELang) => {
    switchLang(locale);
    routerPush({ pathname: pathname, query: { ...query, langCode: locale } });
  };

  return { lang, locale, handleSwitchLang };
};

export default useLang;
