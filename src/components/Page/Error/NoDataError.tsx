import React from "react";
import { useLang } from "@/hooks";
import { Typography } from "@/components/UI";
import { ParagraphProps } from "@/components/UI/Typography/Paragraph";

const { Paragraph } = Typography;

interface NoDataErrorProps extends ParagraphProps {
  message?: string;
}

const NoDataError: React.FC<NoDataErrorProps> = ({ message, ...restProps }) => {
  const { lang } = useLang();

  const paragraphDefaultProps: ParagraphProps = {
    align: "center",
    variant: "secondary",
    italic: true,
    ...restProps,
  };

  return (
    <React.Fragment>
      <Paragraph {...paragraphDefaultProps}>{message ?? lang.common.message.error.noData}</Paragraph>
    </React.Fragment>
  );
};

export default NoDataError;
