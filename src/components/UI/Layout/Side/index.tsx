"use client";

import React from "react";
import { CgArrowsShrinkH as ShrinkIcon } from "react-icons/cg";
import { HiBars3, HiXMark } from "react-icons/hi2";
import { GridAppContext } from "../../Grid/Context";
import { useOverflow, useRender } from "@/hooks";
import LayoutContext from "../Context";
import Button from "@/components/UI/Button";
import useLayoutStore from "../LayoutStore";
import useLayout from "../useLayout";
import utils from "@/utils";

const ICON_SIZE = 20;

export interface LayoutSideProps extends React.HTMLAttributes<HTMLDivElement> {
  rootClassName?: string;
  children?: React.ReactNode | React.ReactNode[];
  collapsable?: boolean;
  hasCollapseButton?: boolean;
  onCollapse?: (collapse: boolean) => void;
}

const LayoutSide: React.ForwardRefRenderFunction<HTMLDivElement, LayoutSideProps> = (
  { rootClassName = "", collapsable = false, hasCollapseButton = true, children, onCollapse, ...restProps },
  ref
) => {
  const { color, layouted } = React.useContext(LayoutContext);

  const { isPhone, isTablet } = React.useContext(GridAppContext);

  const { layoutValue } = useLayout();

  const { layoutTheme: theme } = layoutValue;

  const [shrinked, show, onShrinked, onResizeContent, onShowSide, onHideSide] = useLayoutStore((state) => [
    state.shrinked,
    state.show,
    state.onShrinked,
    state.onResizeContent,
    state.onShowSide,
    state.onHideSide,
  ]);

  const render = useRender(show);

  useOverflow(show);

  const isResponsive = isPhone || isTablet;

  const themeClassName = `side-${theme}`;

  const shrinkClassName = shrinked ? `side-shrinked` : "";

  const layoutClassName = layouted ? "side-layout" : "";

  const collapsableClassName = collapsable ? "side-collapsable" : "";

  const mobileShowClassName = show ? "side-show" : "";

  const mobileBtnMoveDownClassName = layouted ? "side-mobile-btn-top" : "";

  const backdropShowClassName = show ? "side-mobile-backdrop-active" : "";

  const className = utils.formatClassName(
    "side",
    shrinkClassName,
    themeClassName,
    layoutClassName,
    collapsableClassName,
    mobileShowClassName,
    rootClassName
  );

  const mobileBtnClassName = utils.formatClassName("side-mobile-btn", mobileBtnMoveDownClassName);

  const mobileBackDropClassName = utils.formatClassName("side-mobile-backdrop", backdropShowClassName);

  React.useEffect(() => onResizeContent(), []);

  React.useEffect(() => onCollapse?.(shrinked), [shrinked]);

  return (
    <React.Fragment>
      <aside ref={ref} {...restProps} className={className}>
        <div className="side-content">{children}</div>
        {!isResponsive && collapsable && (
          <div className="side-action">
            <Button color={color} rootClassName="action-btn" onClick={onShrinked}>
              <ShrinkIcon size={ICON_SIZE} />
            </Button>
          </div>
        )}
      </aside>

      {render && isResponsive && (
        <div className={mobileBackDropClassName} onClick={onHideSide}>
          <button className="backdrop-close-btn">
            <HiXMark size={ICON_SIZE} />
          </button>
        </div>
      )}

      {isResponsive && hasCollapseButton && (
        <Button sizes="sm" color={color} rootClassName={mobileBtnClassName} onClick={onShowSide}>
          <HiBars3 size={12} />
        </Button>
      )}
    </React.Fragment>
  );
};

export default React.forwardRef(LayoutSide);
