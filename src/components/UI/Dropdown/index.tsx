import React from "react";
import { DropdownItems } from "./type";
import { ComponentPlacement } from "@/common/type";
import { useRender, useClickOutside } from "@/hooks";
import utils from "@/utils";
import useLayout from "../Layout/useLayout";

type TriggerType = "click" | "hover";

export interface DropdownProps {
  rootClassName?: string;
  titleClassName?: string;
  dropdownClassName?: string;
  style?: React.CSSProperties;
  titleStyle?: React.CSSProperties;
  dropdownStyle?: React.CSSProperties;
  children?: React.ReactNode | React.ReactNode[];
  items: DropdownItems;
  placement?: Exclude<ComponentPlacement, "top" | "bottom">;
  trigger?: TriggerType;
}

const Dropdown: React.ForwardRefRenderFunction<HTMLDivElement, DropdownProps> = (
  {
    rootClassName = "",
    titleClassName = "",
    dropdownClassName = "",
    style,
    titleStyle,
    dropdownStyle,
    children,
    items = [],
    placement = "left",
    trigger = "click",
  },
  ref
) => {
  const { layoutValue } = useLayout();

  const { layoutTheme: theme } = layoutValue;

  const [open, setOpen] = React.useState<boolean>(false);

  const render = useRender(open);

  const dropdownRef = React.useRef<HTMLDivElement>(null);

  useClickOutside(dropdownRef, setOpen);

  const placementClassName = `dropdown-${placement}`;

  const openClassName = open ? "dropdown-wrap-active" : "";

  const hoverClassName = trigger === "hover" ? "dropdown-hover" : "";

  const themeClassName = `dropdown-${theme}`;

  const mainClassName = utils.formatClassName(
    "dropdown",
    placementClassName,
    hoverClassName,
    themeClassName,
    rootClassName
  );

  const dropdownTitleClassName = utils.formatClassName("dropdown-title", titleClassName);

  const dropdownListClassName = utils.formatClassName("dropdown-wrap", openClassName, dropdownClassName);

  React.useImperativeHandle(ref, () => dropdownRef.current as HTMLDivElement);

  const renderItems = () => {
    return items.map((item) => (
      <div key={item.id} className="wrap-item">
        {item.label}
      </div>
    ));
  };

  const handleOpen = () => setOpen(!open);

  const handleClick = () => trigger === "click" && handleOpen();

  const handleHover = () => trigger === "hover" && handleOpen();

  return (
    <div
      ref={dropdownRef}
      style={style}
      className={mainClassName}
      onMouseEnter={handleHover}
      onMouseLeave={handleHover}
    >
      <div className={dropdownTitleClassName} style={titleStyle} onClick={handleClick}>
        {children}
      </div>

      {render && (
        <div style={dropdownStyle} className={dropdownListClassName}>
          {renderItems()}
        </div>
      )}
    </div>
  );
};

export default React.forwardRef(Dropdown);
