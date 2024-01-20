import { FC } from "react";
import { Select } from "@/components/Control";
import { ELang } from "@/common/enum";
import { useLang } from "@/hooks";
import type { SelectOptions } from "@/components/Control/type";

interface AuthHeaderProps {}

const AuthHeader: FC<AuthHeaderProps> = () => {
  const { locale, handleSwitchLang } = useLang();

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
        defaultValue={locale}
        options={options}
        onChangeSelect={handleSelect}
      />
    </div>
  );
};

export default AuthHeader;
