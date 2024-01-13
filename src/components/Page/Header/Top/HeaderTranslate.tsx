import React from "react";
import { UI } from "@/components";
import { DropdownItems } from "@/components/UI/Dropdown/type";
import { ELang } from "@/common/enum";
import Image from "next/image";
import useLangStore from "@/store/LangStore";

const { Dropdown, Space } = UI;

interface HeaderTranslateProps {}

const HeaderTranslate: React.FC<HeaderTranslateProps> = () => {
  const [type, lang, switchLang] = useLangStore((state) => [state.type, state.lang, state.switchLang]);

  const items: DropdownItems = [
    {
      id: "1",
      label: (
        <Space onClick={() => switchLang(ELang.EN)}>
          <Image width={20} height={20} src="/flag/en_flag.svg" alt="flag" priority />
          <span>{lang.pageComponent.header.translate.en}</span>
        </Space>
      ),
    },
    {
      id: "2",
      label: (
        <Space onClick={() => switchLang(ELang.VN)}>
          <Image width={20} height={20} src="/flag/vn_flag.svg" alt="flag" priority />
          <span>{lang.pageComponent.header.translate.vn}</span>
        </Space>
      ),
    },
  ];

  const renderLabel = () => {
    if (type === ELang.EN) return "/flag/en_flag.svg";
    return "/flag/vn_flag.svg";
  };

  return (
    <Dropdown items={items} placement="right" rootClassName="top-translate">
      <Image width={20} height={20} src={renderLabel()} alt="flag" priority />
    </Dropdown>
  );
};

export default HeaderTranslate;
