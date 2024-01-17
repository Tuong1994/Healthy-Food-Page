import { EProductStatus } from "@/services/product/enum";
import { Badge } from "@/components/UI";
import { useLang } from "@/hooks";

const useDisplayProductStatus = (status: EProductStatus) => {
  const { lang } = useLang();

  const productStatuses: Record<number, string> = {
    [EProductStatus.DRAFT]: lang.options.productStatus.draft,
    [EProductStatus.ACTIVE]: lang.options.productStatus.active,
  };

  const colors: Record<number, any> = {
    [EProductStatus.DRAFT]: "orange",
    [EProductStatus.ACTIVE]: "blue",
  };

  return (
    <Badge shape="square" color={colors[status]}>
      {productStatuses[status]}
    </Badge>
  );
};

export default useDisplayProductStatus;
