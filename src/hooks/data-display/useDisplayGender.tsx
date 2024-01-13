import { Badge } from "@/components/UI";
import { useLang } from "@/hooks";
import { EGender } from "@/services/customer/enum";

const useDisplayGender = (gender: EGender) => {
  const { lang } = useLang();

  const genders: Record<number, string> = {
    [EGender.MALE]: lang.options.gender.male,
    [EGender.FEMALE]: lang.options.gender.female,
  };

  const color: Record<number, any> = {
    [EGender.MALE]: "blue",
    [EGender.FEMALE]: "pink",
  };
  return (
    <Badge shape="square" color={color[gender]}>
      {genders[gender]}
    </Badge>
  );
};

export default useDisplayGender;
