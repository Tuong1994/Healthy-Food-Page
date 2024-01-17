import { ELang } from "@/common/enum";
import { useRouter } from "next/router";
import useLangStore from "@/store/LangStore";

const useLang = () => {
  const [lang, locale, switchLang] = useLangStore((state) => [state.lang, state.locale, state.switchLang]);

  const router = useRouter();

  const handleSwitchLang = (locale: ELang) => {
    switchLang(locale);
    router.push({ pathname: router.pathname, query: { ...router.query, locale: locale } });
  };

  return { lang, locale, handleSwitchLang };
};

export default useLang;
