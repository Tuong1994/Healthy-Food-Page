import React from "react";
import type { ParagraphProps } from "@/components/UI/Typography/Paragraph";
import type { GridColProps } from "../Grid/Col";
import type { GridRowProps } from "../Grid/Row";
import { Grid, Typography } from "..";
import useLayout from "../Layout/useLayout";
import utils from "@/utils";

const { Row, Col } = Grid;

const { Paragraph } = Typography;

export interface InfoRowProps extends GridRowProps {
  label?: string;
  labelElement?: React.ReactNode;
  text?: string;
  textElement?: React.ReactNode;
  labelProps?: ParagraphProps;
  textProps?: ParagraphProps;
  labelSpanProps?: GridColProps;
  textSpanProps?: GridColProps;
  hasColon?: boolean;
}

const InfoRow: React.ForwardRefRenderFunction<HTMLDivElement, InfoRowProps> = (
  {
    label,
    labelElement,
    text,
    textElement,
    labelProps,
    textProps,
    labelSpanProps,
    textSpanProps,
    hasColon = true,
    ...restProps
  },
  ref
) => {
  const { layoutValue } = useLayout();

  const { layoutTheme: theme } = layoutValue;

  const themeClassName = `info-row-${theme}`;

  const labelSpanDefaultProps: GridColProps = { span: 6, ...labelSpanProps };

  const textSpanDefaultProps: GridColProps = { span: 16, ...textSpanProps };

  const labelDefaultProps: ParagraphProps = { rootClassName: "row-label", ...labelProps };

  const textDefaultProps: ParagraphProps = { strong: true, ...textProps };

  const mainClassName = utils.formatClassName("info-row", themeClassName);
  return (
    <Row ref={ref} rootClassName={mainClassName} {...restProps}>
      <Col {...labelSpanDefaultProps}>
        {!labelElement && (
          <Paragraph {...labelDefaultProps}>
            {label} {hasColon ? ":" : ""}
          </Paragraph>
        )}
        {labelElement}
      </Col>
      <Col {...textSpanDefaultProps}>
        {!textElement && <Paragraph {...textDefaultProps}>{text}</Paragraph>}
        {textElement}
      </Col>
    </Row>
  );
};

export default React.forwardRef(InfoRow);
