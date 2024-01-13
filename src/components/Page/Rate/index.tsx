import React from "react";
import { UI } from "@/components";
import { useLang } from "@/hooks";
import RateModal from "./RateModal";
import RateStars from "./RateStars";

const { Space, Button, Typography } = UI;

const { Paragraph } = Typography;

interface RateProps {}

const Rate: React.FC<RateProps> = () => {
  const { lang } = useLang();

  const [open, setOpen] = React.useState<boolean>(false);

  const handleOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

  return (
    <div className="rate">
      <Space align="middle">
        <RateStars point={0} />
        <Paragraph>1 / 5 ({lang.pageComponent.rate.voted})</Paragraph>
        <Button color="green" ghost onClick={handleOpen}>
          {lang.pageComponent.rate.action}
        </Button>
      </Space>

      <RateModal lang={lang} open={open} onCancel={handleClose} />
    </div>
  );
};

export default Rate;
