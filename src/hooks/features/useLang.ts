import { ELang } from "@/common/enum";
import { useRouter } from "next/router";
import useLangStore from "@/store/LangStore";

const useLang = () => {
  const [lang, type, switchLang] = useLangStore((state) => [state.lang, state.type, state.switchLang]);

  const router = useRouter();

  const handleSwitchLang = (type: ELang) => {
    switchLang(type);
    router.push({ pathname: router.pathname, query: { ...router.query, locale: type } });
  };

  return { lang, type, handleSwitchLang };
};

export default useLang;
