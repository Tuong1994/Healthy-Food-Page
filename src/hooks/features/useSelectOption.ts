import useLang from "./useLang";
import { EGender } from "@/services/customer/enum";
import type { SelectOptions } from "@/components/Control/type";

const useSelectOption = () => {
  const { lang } = useLang();

  const gender: SelectOptions = [
    { label: lang.options.gender.male, value: EGender.MALE },
    { label: lang.options.gender.female, value: EGender.FEMALE },
  ];

  return { gender };
};

export default useSelectOption;
