import { CSSProperties, ForwardRefRenderFunction, useContext, useState, forwardRef } from "react";
import { MenuItems } from "../type";
import LayoutContext, { LayoutColor } from "../../Context";
import MenuHorizontalItem from "./Item";
import utils from "@/utils";

export interface MenuHorizontalProps {
  rootClassName?: string;
  itemClassName?: string;
  itemStyle?: CSSProperties;
  items?: MenuItems;
  color?: LayoutColor;
}

const MenuHorizontal: ForwardRefRenderFunction<HTMLDivElement, MenuHorizontalProps> = (
  { rootClassName = "", itemClassName, itemStyle, items = [], color = "blue", ...restProps },
  ref
) => {
  const { layouted, color: layoutColor } = useContext(LayoutContext);

  const [activeId, setActiveId] = useState<string[]>([]);

  const colorClassName = `menu-horizontal-${layouted ? layoutColor : color}`;

  const layoutClassName = layouted ? "menu-horizontal-layout" : "";

  const className = utils.formatClassName("menu-horizontal", colorClassName, layoutClassName, rootClassName);

  const handleOpenMenu = (id: string) => {
    const idx = activeId.indexOf(id);
    if (idx === -1) setActiveId((prev) => [...prev, id]);
    else setActiveId((prev) => [...prev].filter((active) => active !== id));
  };

  return (
    <div ref={ref} {...restProps} className={className}>
      {items.map((item) => (
        <MenuHorizontalItem
          key={item.id}
          item={item}
          activeId={activeId}
          itemClassName={itemClassName}
          itemStyle={itemStyle}
          handleOpenMenu={handleOpenMenu}
        />
      ))}
    </div>
  );
};

export default forwardRef(MenuHorizontal);
