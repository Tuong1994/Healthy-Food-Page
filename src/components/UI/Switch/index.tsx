'use client'

import React from "react";
import { ComponentColor, ComponentSize } from "@/common/type";
import utils from "@/utils";

export interface SwitchProps extends React.InputHTMLAttributes<HTMLInputElement> {
  rootClassName?: string;
  sizes?: ComponentSize;
  color?: Exclude<ComponentColor, "black" | "white" | "gray">;
  onSwitch?: (switched: boolean) => void;
}

const Switch: React.ForwardRefRenderFunction<HTMLInputElement, SwitchProps> = (
  { rootClassName = "", sizes = "md", color = "blue", onSwitch, ...restProps },
  ref
) => {
  const sizeClassName = `switch-${sizes}`;

  const colorClassName = `switch-${color}`;

  const className = utils.formatClassName("switch", colorClassName, sizeClassName, rootClassName);

  const handleSwitch = (e: React.ChangeEvent<HTMLInputElement>) => onSwitch?.(e.target.checked);

  return <input ref={ref} type="checkbox" {...restProps} className={className} onChange={handleSwitch} />;
};

export default React.forwardRef(Switch);
