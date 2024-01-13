'use client'

import React from "react";
import { HiXCircle } from "react-icons/hi2";
import { useFormContext } from "react-hook-form";
import { ControlColor, ControlShape, InputValue } from "../type";
import { ComponentSize } from "@/common/type";
import { ONLY_DIGIT_REGEX } from "../regex";
import FormItemContext from "../Form/FormItemContext";
import FormContext from "../Form/FormContext";
import formatNumber from "./formatNumber";
import useLayout from "@/components/UI/Layout/useLayout";
import utils from "@/utils";

export interface InputNumberProps extends React.InputHTMLAttributes<HTMLInputElement> {
  rootClassName?: string;
  labelClassName?: string;
  inputClassName?: string;
  rootStyle?: React.CSSProperties;
  labelStyle?: React.CSSProperties;
  label?: React.ReactNode | React.ReactNode[];
  addonBefore?: React.ReactNode | React.ReactNode[];
  addonAfter?: React.ReactNode | React.ReactNode[];
  sizes?: ComponentSize;
  color?: ControlColor;
  shape?: ControlShape;
  required?: boolean;
  optional?: boolean;
  hasClear?: boolean;
  onChangeInput?: (number: number) => void;
}

const InputNumber: React.ForwardRefRenderFunction<HTMLInputElement, InputNumberProps> = (
  {
    rootClassName = "",
    labelClassName = "",
    inputClassName = "",
    rootStyle,
    labelStyle,
    label,
    addonBefore,
    addonAfter,
    value = "",
    sizes = "md",
    color = "blue",
    shape = "square",
    placeholder = "Enter information...",
    disabled,
    required,
    optional,
    hasClear = true,
    onBlur,
    onChangeInput,
    ...restProps
  },
  ref
) => {
  const rhfMethods = useFormContext();

  const { layoutValue } = useLayout();

  const { layoutTheme: theme } = layoutValue;

  const { color: rhfColor, sizes: rhfSizes, shape: rhfShape } = React.useContext(FormContext);

  const { isRhf, rhfName, rhfError, rhfValue, rhfDisabled } = React.useContext(FormItemContext);

  const [inputValue, setInputValue] = React.useState<InputValue>(value);

  const [touched, setTouched] = React.useState<boolean>(false);

  const inputRef = React.useRef<HTMLDivElement>(null);

  const controlDisabled = rhfDisabled ? rhfDisabled : disabled;

  const controlColor = isRhf ? rhfColor : color;

  const controlSize = isRhf ? rhfSizes : sizes;

  const controlShape = isRhf ? rhfShape : shape;

  const showClearIcon = hasClear && inputValue && !controlDisabled;

  const showOptional = required ? false : optional;

  const themClassName = `input-${theme}`;

  const sizeClassName = `input-${controlSize}`;

  const colorClassName = `input-${controlColor}`;

  const shapeClassName = `input-${controlShape}`;

  const disabledClassName = controlDisabled ? "input-disabled" : "";

  const errorClassName = rhfError ? "input-error" : "";

  const mainClassName = utils.formatClassName(
    "input",
    colorClassName,
    sizeClassName,
    shapeClassName,
    errorClassName,
    themClassName,
    rootClassName,
    disabledClassName
  );

  const controlLabelClassName = utils.formatClassName("input-label", labelClassName);

  const controlInputClassName = utils.formatClassName("control-box", inputClassName);

  const triggerValidation = React.useCallback(() => {
    if (touched && !rhfValue) rhfMethods.trigger(rhfName);
    else if (touched && rhfValue) rhfMethods.trigger(rhfName);
  }, [touched, rhfMethods, rhfName, rhfValue]);

  // Trigger validation
  React.useEffect(() => {
    if (!isRhf) return;
    triggerValidation();
  }, [isRhf, triggerValidation]);

  // Focus input when error is trigger
  React.useEffect(() => {
    if (rhfError) inputRef.current?.click();
  }, [rhfError]);

  // Set default value
  React.useEffect(() => {
    if (isRhf) {
      const numberFormatRhfValue = formatNumber(String(rhfValue));
      return setInputValue(numberFormatRhfValue);
    }
    const numberFormatValue = formatNumber(String(value));
    setInputValue(numberFormatValue);
  }, [value, isRhf, rhfValue]);

  const iconSize = () => {
    if (controlSize === "sm") return 14;
    if (controlSize === "md") return 16;
    if (controlSize === "lg") return 18;
  };

  const handleFocus = () => setTouched(true);

  const handleBlur = () => setTouched(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const inputFormatValue = formatNumber(value);
    const numberValue = value.replace(ONLY_DIGIT_REGEX, "");
    setInputValue(inputFormatValue);
    onChangeInput?.(Number(numberValue));
    if (isRhf) rhfMethods.setValue(rhfName, Number(numberValue));
  };

  const handleClearInput = () => {
    if (isRhf) return rhfMethods.setValue(rhfName, 0);
    setInputValue(0);
    onChangeInput?.(0);
  };

  return (
    <div style={rootStyle} className={mainClassName}>
      <label>
        {label && (
          <div style={labelStyle} className={controlLabelClassName}>
            {required && <span className="label-required">*</span>}
            <span>{label}</span>
            {showOptional && <span className="label-optional">(Optional)</span>}
          </div>
        )}

        <div ref={inputRef} className="input-group">
          {addonBefore && <div className="group-addon group-addon-before">{addonBefore}</div>}

          <div className="group-control">
            <input
              ref={ref}
              {...restProps}
              type="text"
              value={inputValue}
              disabled={controlDisabled}
              placeholder={placeholder}
              className={controlInputClassName}
              onChange={handleChange}
              onBlur={handleBlur}
              onFocus={handleFocus}
            />
            {showClearIcon && (
              <div className="control-action" onClick={handleClearInput}>
                <HiXCircle size={iconSize()} />
              </div>
            )}
          </div>

          {addonAfter && <div className="group-addon group-addon-after">{addonAfter}</div>}
        </div>
      </label>
    </div>
  );
};

export default React.forwardRef(InputNumber);
