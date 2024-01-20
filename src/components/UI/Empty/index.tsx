import { HTMLAttributes, ReactNode, ForwardRefRenderFunction, forwardRef } from "react";
import { HiOutlineDocumentSearch } from "react-icons/hi";
import Paragraph, { ParagraphProps } from "../Typography/Paragraph";
import utils from "@/utils";

export interface EmptyProps extends HTMLAttributes<HTMLDivElement> {
  rootClassName?: string;
  icon?: ReactNode;
  text?: string;
  textProps?: ParagraphProps;
  children?: ReactNode;
}

const Empty: ForwardRefRenderFunction<HTMLDivElement, EmptyProps> = (
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

export default forwardRef(Empty);
