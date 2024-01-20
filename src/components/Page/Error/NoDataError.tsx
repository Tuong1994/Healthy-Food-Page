import { FC, Fragment } from "react";
import { useLang } from "@/hooks";
import { Typography } from "@/components/UI";
import type { ParagraphProps } from "@/components/UI/Typography/Paragraph";

const { Paragraph } = Typography;

interface NoDataErrorProps extends ParagraphProps {
  message?: string;
}

const NoDataError: FC<NoDataErrorProps> = ({ message, ...restProps }) => {
  const { lang } = useLang();

  const paragraphDefaultProps: ParagraphProps = {
    align: "center",
    variant: "secondary",
    italic: true,
    ...restProps,
  };

  return (
    <Fragment>
      <Paragraph {...paragraphDefaultProps}>{message ?? lang.common.description.noData}</Paragraph>
    </Fragment>
  );
};

export default NoDataError;
