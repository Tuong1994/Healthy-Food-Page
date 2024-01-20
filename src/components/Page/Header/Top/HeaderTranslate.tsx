import { FC } from "react";
import { Dropdown, Space } from "@/components/UI";
import type { DropdownItems } from "@/components/UI/Dropdown/type";
import { useLang } from "@/hooks";
import { ELang } from "@/common/enum";
import Image from "next/image";

interface HeaderTranslateProps {}

const HeaderTranslate: FC<HeaderTranslateProps> = () => {
  const { locale, lang, handleSwitchLang } = useLang();

  const items: DropdownItems = [
    {
      id: "1",
      label: (
        <Space onClick={() => handleSwitchLang(ELang.EN)}>
          <Image width={20} height={20} src="/flag/en_flag.svg" alt="flag" priority />
          <span>{lang.pageComponent.header.translate.en}</span>
        </Space>
      ),
    },
    {
      id: "2",
      label: (
        <Space onClick={() => handleSwitchLang(ELang.VN)}>
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
    <Dropdown items={items} defaultSelectedId="1" placement="right" rootClassName="top-translate">
      <Image width={20} height={20} src={renderLabel()} alt="flag" priority />
    </Dropdown>
  );
};

export default HeaderTranslate;
