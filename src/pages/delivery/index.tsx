import { NextPage } from "next";
import { Card, Typography } from "@/components/UI";
import { useLang } from "@/hooks";

const { Title, Paragraph } = Typography;

const Delivery: NextPage = () => {
  const { lang } = useLang();

  return (
    <div className="page delivery">
      <Title weight={600}>{lang.delivery.title}</Title>
      <Card rootClassName="card-container">
        <div className="delivery-content">
          <Paragraph size={18} strong variant="success" rootClassName="content-title">
            {lang.delivery.area.title}
          </Paragraph>
          <Paragraph size={16} align="justify">
            {lang.delivery.area.content}
          </Paragraph>
        </div>

        <div className="delivery-content">
          <Paragraph size={18} strong variant="success" rootClassName="content-title">
            {lang.delivery.fee.title}
          </Paragraph>
          <Paragraph size={16} align="justify">
            {lang.delivery.fee.content}
          </Paragraph>
        </div>

        <div className="delivery-content">
          <Paragraph size={18} strong variant="success" rootClassName="content-title">
            {lang.delivery.time.title}
          </Paragraph>
          <Paragraph size={16} align="justify">
            {lang.delivery.time.content}
          </Paragraph>
        </div>

        <Paragraph size={16}>{lang.delivery.note}</Paragraph>
      </Card>
    </div>
  );
};

export default Delivery;
