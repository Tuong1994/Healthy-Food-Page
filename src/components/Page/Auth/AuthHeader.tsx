import React from "react";
import { Control } from "@/components";
import { SelectOptions } from "@/components/Control/type";
import { ELang } from "@/common/enum";
import { useLang } from "@/hooks";

const { Select } = Control;

interface AuthHeaderProps {}

const AuthHeader: React.FC<AuthHeaderProps> = () => {
  const { type, handleSwitchLang } = useLang();

  const options: SelectOptions = [
    { label: "EN", value: ELang.EN },
    { label: "VN", value: ELang.VN },
  ];

  const handleSelect = (value: any) => handleSwitchLang(value);

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
