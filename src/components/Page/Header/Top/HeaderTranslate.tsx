import { FC, useEffect, useState } from "react";
import { Dropdown, Space } from "@/components/UI";
import { useLang } from "@/hooks";
import { ELang } from "@/common/enum";
import type { DropdownItems } from "@/components/UI/Dropdown/type";
import Image from "next/image";

interface HeaderTranslateProps {}

const HeaderTranslate: FC<HeaderTranslateProps> = () => {
  const { locale, lang, handleSwitchLang } = useLang();

  const [selectedLocale, setSelectedLocale] = useState<ELang>(locale);

  useEffect(() => setSelectedLocale(locale), [locale]);

  const handleSelect = (locale: ELang) => {
    handleSwitchLang(locale);
    if (locale === ELang.EN) setSelectedLocale(ELang.EN);
    else setSelectedLocale(ELang.VN);
  };

  const items: DropdownItems = [
    {
      id: ELang.EN,
      label: (
        <Space onClick={() => handleSelect(ELang.EN)}>
          <Image width={20} height={20} src="/flag/en_flag.svg" alt="flag" priority />
          <span>{lang.pageComponent.header.translate.en}</span>
        </Space>
      ),
    },
    {
      id: ELang.VN,
      label: (
        <Space onClick={() => handleSelect(ELang.VN)}>
          <Image width={20} height={20} src="/flag/vn_flag.svg" alt="flag" priority />
          <span>{lang.pageComponent.header.translate.vn}</span>
        </Space>
      ),
    },
  ];

  const renderLabel = () => {
    if (locale === ELang.EN) return "/flag/en_flag.svg";
    return "/flag/vn_flag.svg";
  };

  return (
    <Dropdown
      items={items}
      defaultSelectedId={selectedLocale}
      placement="right"
      rootClassName="top-translate"
    >
      <Image width={20} height={20} src={renderLabel()} alt="flag" priority />
    </Dropdown>
  );
};

export default HeaderTranslate;
