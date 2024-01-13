import useLangStore from "@/store/LangStore";

const useLang = () => {
  const [lang, type] = useLangStore((state) => [state.lang, state.type]);
  return { lang, type };
};

export default useLang;
