"use client";

import React from "react";
import { ComponentColor, ComponentSize } from "@/common/type";
import { ControlShape } from "@/components/Control/type";
import Spinner from "../Loading/Spinner";
import FormContext from "@/components/Control/Form/FormContext";
import useLayout from "../Layout/useLayout";
import utils from "@/utils";

type ButtonColor = Exclude<ComponentColor, "white" | "gray">;

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  rootClassName?: string;
  children?: React.ReactNode | React.ReactNode[];
  loading?: boolean;
  ghost?: boolean;
  disabled?: boolean;
  text?: boolean;
  sizes?: ComponentSize;
  shape?: ControlShape;
  color?: ButtonColor;
}

const Button: React.ForwardRefRenderFunction<HTMLButtonElement, ButtonProps> = (
  {
    rootClassName = "",
    children,
    loading,
    sizes = "md",
    shape = "square",
    ghost,
    color,
    disabled,
    text,
    ...restProps
  },
  ref
) => {
  const { color: rhfColor, sizes: rhfSizes, shape: rhfShape } = React.useContext(FormContext);

  const { layoutValue } = useLayout();

  const { layoutTheme: theme } = layoutValue;

  const btnDisabled = disabled || loading;

  const buttonColor = color ? color : rhfColor;

  const buttonSize = rhfSizes ? rhfSizes : sizes;

  const buttonShape = rhfShape ? rhfShape : shape;

  const sizeClassName = `button-${buttonSize}`;

  const shapeClassName = `button-${buttonShape}`;
  
  const textClassName = text ? "button-text" : "";

  const disabledClassName = disabled ? "button-disabled" : "";

  const loadingClassName = loading ? "button-loading" : "";

  const themeClassName = `button-${theme}`;

  const colorClassName = () => {
    if (!ghost && !buttonColor) return "";
    if (ghost && !buttonColor) return `button-ghost`;
    if (!ghost && buttonColor) return `button-color button-${buttonColor}`;
    if (ghost && buttonColor) return `button-ghost button-ghost-${buttonColor}`;
    return "";
  };

  const className = utils.formatClassName(
    "button",
    sizeClassName,
    shapeClassName,
    colorClassName(),
    loadingClassName,
    textClassName,
    themeClassName,
    disabledClassName,
    rootClassName
  );

  return (
    <button ref={ref} {...restProps} disabled={btnDisabled} className={className}>
      {loading && <Spinner rootClassName="button-icon" />}
      <span>{children}</span>
    </button>
  );
};

export default React.forwardRef(Button);
