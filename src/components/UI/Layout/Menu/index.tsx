import { CSSProperties, ForwardRefRenderFunction, Fragment, forwardRef } from "react";
import { MenuItems } from "./type";
import { LayoutColor } from "../Context";
import Horizontal from "./Horizontal";
import Vertical from "./Vertical";

type MenuType = "horizontal" | "vertical";

export interface LayoutMenuProps {
  rootClassName?: string;
  itemClassName?: string;
  style?: CSSProperties;
  itemStyle?: CSSProperties;
  items?: MenuItems;
  type?: MenuType;
  color?: LayoutColor;
}

const LayoutMenu: ForwardRefRenderFunction<HTMLDivElement, LayoutMenuProps> = (
  { type = "horizontal", color = "blue", ...restProps },
  ref
) => {
  return (
    <Fragment>
      {type === "horizontal" && <Horizontal ref={ref} color={color} {...restProps} />}
      {type === "vertical" && <Vertical ref={ref} color={color} {...restProps} />}
    </Fragment>
  );
};

export default forwardRef(LayoutMenu);
