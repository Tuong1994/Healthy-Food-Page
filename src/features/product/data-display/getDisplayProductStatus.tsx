import { EProductStatus } from "@/services/product/enum";
import { Badge } from "@/components/UI";
import { Lang } from "@/common/type";

const getDisplayProductStatus = (lang: Lang, status: EProductStatus) => {
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

export default getDisplayProductStatus;
