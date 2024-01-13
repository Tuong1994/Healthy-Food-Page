"use client";

import React from "react";
import LayoutContext from "../Context";
import useLayout from "../useLayout";
import utils from "@/utils";

export interface LayoutHeadProps extends React.HTMLAttributes<HTMLDivElement> {
  rootClassName?: string;
  children?: React.ReactNode | React.ReactNode[];
  fixed?: boolean;
}

const LayoutHead: React.ForwardRefRenderFunction<HTMLDivElement, LayoutHeadProps> = (
  { rootClassName = "", children, fixed, ...restProps },
  ref
) => {
  const { layouted } = React.useContext(LayoutContext);

  const { layoutValue } = useLayout();

  const { layoutTheme: theme } = layoutValue;

  const themeClassName = `head-${theme}`;

  const fixedClassName = fixed || layouted ? `head-fixed` : "";

  const className = utils.formatClassName("head", fixedClassName, themeClassName, rootClassName);

  return (
    <header ref={ref} {...restProps} className={className}>
      {children}
    </header>
  );
};

export default React.forwardRef(LayoutHead);
