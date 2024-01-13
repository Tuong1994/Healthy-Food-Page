import { NextPage } from "next";
import { UI } from "@/components";
import { useLang } from "@/hooks";

const { UList, Typography } = UI;

const { Title, Paragraph } = Typography;

const { List, ListItem } = UList;

const Exchange: NextPage = () => {
  const { lang } = useLang();

  return (
    <div className="page exchange">
      <Title weight={600}>{lang.exchange.title}</Title>
      <div className="exchange-content">
        <Paragraph strong size={18} variant="success" rootClassName="content-title">
          {lang.exchange.request.title}
        </Paragraph>
        <div className="content-group">
          <Paragraph strong size={16} rootClassName="group-title">
            {lang.exchange.request.notDelivery.title}
          </Paragraph>
          <Paragraph size={16}>{lang.exchange.request.notDelivery.content}</Paragraph>
        </div>
        <div className="content-group">
          <Paragraph strong size={16} rootClassName="group-title">
            {lang.exchange.request.deliveried.title}
          </Paragraph>
          <Paragraph size={16}>{lang.exchange.request.deliveried.content}</Paragraph>
        </div>
      </div>

      <List
        head={
          <Paragraph strong size={18} variant="success" rootClassName="content-title">
            {lang.exchange.condition.title}
          </Paragraph>
        }
      >
        <ListItem>
          <Paragraph size={16}>{lang.exchange.condition.content_1}</Paragraph>
        </ListItem>
        <ListItem>
          <Paragraph size={16}>{lang.exchange.condition.content_2}</Paragraph>
        </ListItem>
      </List>
    </div>
  );
};

export default Exchange;
