import { FC, useState } from "react";
import { Space, Button, Typography } from "@/components/UI";
import { useLang, useMounted } from "@/hooks";
import { useRouter } from "next/router";
import type { Product } from "@/services/product/type";
import RateModal from "./RateModal";
import RateStars from "./RateStars";
import useAuthStore from "@/store/AuthStore";
import url from "@/common/constant/url";

const { AUTH_SIGN_IN } = url;

const { Paragraph } = Typography;

interface RateProps {
  product: Product;
}

const Rate: FC<RateProps> = ({ product }) => {
  const auth = useAuthStore((state) => state.auth);

  const isMounted = useMounted();

  const router = useRouter();

  const { lang } = useLang();

  const { isAuth } = auth;

  const [open, setOpen] = useState<boolean>(false);

  const point = product.point ?? 0;

  const handleOpen = () => {
    if (!isAuth) return router.push(AUTH_SIGN_IN);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  if (!isMounted) return null;

  return (
    <div className="rate">
      <Space align="middle">
        <RateStars point={point} />
        <Paragraph variant="secondary">
          ({product.totalVoted} {lang.pageComponent.rate.voted})
        </Paragraph>
        <Button color="green" ghost onClick={handleOpen}>
          {lang.pageComponent.rate.action}
        </Button>
      </Space>

      <RateModal lang={lang} productId={product.id as string} open={open} onCancel={handleClose} />
    </div>
  );
};

export default Rate;
