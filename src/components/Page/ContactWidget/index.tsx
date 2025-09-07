import { FC, useState } from "react";
import { Badge, Image, Typography, Space } from "@/components/UI";
import utils from "@/utils";

const { Paragraph } = Typography;

const ContactWidget: FC = () => {
  const [trigger, setTrigger] = useState<boolean>(false);

  const triggerClassName = trigger ? "contact-widget-active" : "";

  const className = utils.formatClassName("contact-widget", triggerClassName);

  const iconSize = 50;

  const FBMsgIcon = (
    <svg
      width={iconSize}
      height={iconSize}
      viewBox="0 0 256 256"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <circle cx="128" cy="128" r="120" fill="#1877F2" />
      <path fill="#fff" d="M72 176 L120 140 L148 164 L204 88 L148 132 L120 108 L72 148 Z" />
    </svg>
  );

  const PhoneIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={iconSize}
      height={iconSize}
      viewBox="0 0 24 24"
      role="img"
      aria-labelledby="phoneFilledTitle"
    >
      <title id="phoneFilledTitle">Phone icon (filled)</title>
      <path
        d="M21 15.46c-1.2 0-2.39-.2-3.48-.58-.34-.12-.73-.02-1 .25l-1.9 1.9c-3.06-1.6-5.57-4.1-7.18-7.16l1.9-1.9c.27-.27.36-.66.24-1C8.74 6.39 8.54 5.2 8.54 4c0-.55-.45-1-1-1H5.5A2.5 2.5 0 0 0 3 5.5C3 14.16 9.84 21 18.5 21A2.5 2.5 0 0 0 21 18.5v-2.04c0-.55-.45-1-1-1z"
        fill="#10b981"
      />
    </svg>
  );

  const handleTrigger = () => setTrigger(!trigger);

  return (
    <div className={className}>
      <div className="widget-item widget-trigger" onClick={handleTrigger}>
        <Image imgWidth={45} imgHeight={45} src="/contact.svg" />
      </div>
      <a href="https://m.me/61580340425091" target="_blank" className="widget-item widget-fb">
        <Space align="middle">
          <div className="item-icon">{FBMsgIcon}</div>
          <Badge color="black" shape="square">
            <Paragraph size={16}>Chat Messager</Paragraph>
          </Badge>
        </Space>
      </a>
      <a href="tel:02839753186" className="widget-item widget-hotline">
        <Space align="middle">
          <div className="item-icon">{PhoneIcon}</div>
          <Badge color="black" shape="square">
            <Paragraph size={16}>Hotline</Paragraph>
          </Badge>
        </Space>
      </a>
    </div>
  );
};

export default ContactWidget;
