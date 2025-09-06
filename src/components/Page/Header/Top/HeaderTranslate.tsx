import { FC, useEffect, useState } from "react";
import { Dropdown, Space } from "@/components/UI";
import { useLang } from "@/hooks";
import { ELang } from "@/common/enum";
import type { DropdownItems } from "@/components/UI/Dropdown/type";

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

  const enFlag = <span className="fi fi-gb"></span>;

  const vnFlag = <span className="fi fi-vn"></span>;

  const items: DropdownItems = [
    {
      id: ELang.EN,
      label: (
        <Space align="middle" onClick={() => handleSelect(ELang.EN)}>
          {enFlag}
          <span>{lang.pageComponent.header.translate.en}</span>
        </Space>
      ),
    },
    {
      id: ELang.VN,
      label: (
        <Space align="middle" onClick={() => handleSelect(ELang.VN)}>
          {vnFlag}
          <span>{lang.pageComponent.header.translate.vn}</span>
        </Space>
      ),
    },
  ];

  const renderLabel = () => {
    if (locale === ELang.EN) return enFlag;
    return vnFlag;
  };

  return (
    <Dropdown
      items={items}
      defaultSelectedId={selectedLocale}
      placement="right"
      rootClassName="top-translate"
    >
      {renderLabel()}
    </Dropdown>
  );
};

export default HeaderTranslate;
