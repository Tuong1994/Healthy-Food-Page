import { useRouter } from "next/router";
import { ELang } from "@/common/enum";
import useLangStore from "@/store/LangStore";

const useLang = () => {
  const [lang, locale, switchLang] = useLangStore((state) => [state.lang, state.locale, state.switchLang]);

  const router = useRouter();

  const { query, pathname, push: routerPush } = router;

  const handleSwitchLang = (locale: ELang) => {
    switchLang(locale);
    routerPush({ pathname: pathname, query: { ...query, langCode: locale } });
  };

  return { lang, locale, handleSwitchLang };
};

export default useLang;
