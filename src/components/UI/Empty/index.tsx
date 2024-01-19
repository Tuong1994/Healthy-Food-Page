import React from "react";
import Paragraph, { ParagraphProps } from "../Typography/Paragraph";
import { HiOutlineDocumentSearch } from "react-icons/hi";
import utils from "@/utils";

type EmptyType = "";

export interface EmptyProps extends React.HTMLAttributes<HTMLDivElement> {
  rootClassName?: string;
  icon?: React.ReactNode;
  text?: string;
  textProps?: ParagraphProps;
  children?: React.ReactNode;
}

const Empty: React.ForwardRefRenderFunction<HTMLDivElement, EmptyProps> = (
  {
    rootClassName = "",
    children,
    icon = <HiOutlineDocumentSearch size={30} />,
    text = "Empty",
    textProps,
    ...restProps
  },
  ref
) => {
  const textDefaultProps: ParagraphProps = {
    variant: "secondary",
    italic: true,
    align: "center",
    weight: 400,
    ...textProps,
  };

  const className = utils.formatClassName("empty", rootClassName);

  return (
    <div ref={ref} {...restProps} className={className}>
      <div className="empty-icon">{icon}</div>
      {text && !children && <Paragraph {...textDefaultProps}>{text}</Paragraph>}
      {children}
    </div>
  );
};

export default React.forwardRef(Empty);
