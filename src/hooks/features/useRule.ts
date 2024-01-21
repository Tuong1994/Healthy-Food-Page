import { FormRule } from "@/components/Control/type";
import {
  EMAIL_REGEX,
  PHONE_REGEX,
  REPLACE_MAX_NUM_REGEX,
  REPLACE_MIN_NUM_REGEX,
  WHITE_SPACE_REGEX,
} from "@/common/constant/regex";
import { useLang } from "..";

const useRule = () => {
  const { lang } = useLang();

  const common = (): FormRule[] => {
    return [{ required: true, message: lang.common.form.rule.required }];
  };

  const email = (): FormRule[] => {
    return [
      { required: true, message: lang.common.form.rule.required },
      { whiteSpace: true, pattern: WHITE_SPACE_REGEX, message: lang.common.form.rule.whiteSpace },
      { email: true, pattern: EMAIL_REGEX, message: lang.common.form.rule.email },
    ];
  };

  const password = (min = 6, max = 20): FormRule[] => {
    return [
      { required: true, message: lang.common.form.rule.required },
      { whiteSpace: true, pattern: WHITE_SPACE_REGEX, message: lang.common.form.rule.whiteSpace },
      {
        minLength: min,
        message: lang.common.form.rule.minLength.replace(REPLACE_MIN_NUM_REGEX, String(min)),
      },
      {
        maxLength: max,
        message: lang.common.form.rule.maxLength.replace(REPLACE_MAX_NUM_REGEX, String(max)),
      },
    ];
  };

  const phone = (): FormRule[] => {
    return [
      { whiteSpace: true, pattern: WHITE_SPACE_REGEX, message: lang.common.form.rule.whiteSpace },
      { phone: true, pattern: PHONE_REGEX, message: lang.common.form.rule.phone },
    ];
  };

  return { common, email, password, phone };
};

export default useRule;
