import React from "react";
import { Control } from "@/components";
import { SelectOptions } from "@/components/Control/type";
import { ELang } from "@/common/enum";
import useLangStore from "@/store/LangStore";

const { Select } = Control;

interface AuthHeaderProps {}

const AuthHeader: React.FC<AuthHeaderProps> = () => {
  const [type, switchLang] = useLangStore((state) => [
    state.type,
    state.switchLang,
  ]);

  const options: SelectOptions = [
    { label: "VN", value: ELang.VN },
    { label: "EN", value: ELang.EN },
  ];

  const handleSelect = (value: any) => switchLang(value);

  return (
    <div className="auth-header">
      <Select
        color="green"
        hasSearch={false}
        hasClear={false}
        defaultValue={type}
        options={options}
        onChangeSelect={handleSelect}
      />
    </div>
  );
};

export default AuthHeader;
