import {
  TextareaHTMLAttributes,
  CSSProperties,
  ReactNode,
  ForwardRefRenderFunction,
  ChangeEvent,
  useContext,
  useEffect,
  useState,
  useRef,
  forwardRef,
} from "react";
import { HiXCircle } from "react-icons/hi2";
import { useFormContext } from "react-hook-form";
import { ControlColor, ControlShape, InputValue } from "../type";
import { ComponentSize } from "@/common/type";
import { useLang } from "@/hooks";
import FormItemContext from "../Form/FormItemContext";
import FormContext from "../Form/FormContext";
import useLayout from "@/components/UI/Layout/useLayout";
import utils from "@/utils";

export interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  rootClassName?: string;
  labelClassName?: string;
  inputClassName?: string;
  rootStyle?: CSSProperties;
  labelStyle?: CSSProperties;
  label?: ReactNode | ReactNode[];
  sizes?: ComponentSize;
  color?: ControlColor;
  shape?: ControlShape;
  required?: boolean;
  optional?: boolean;
  hasClear?: boolean;
  onChangeInput?: (text: string) => void;
}

const TextArea: ForwardRefRenderFunction<HTMLTextAreaElement, TextAreaProps> = (
  {
    rootClassName = "",
    labelClassName = "",
    inputClassName = "",
    rootStyle,
    labelStyle,
    label,
    value = "",
    sizes = "md",
    color = "blue",
    shape = "square",
    placeholder,
    rows = 5,
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

  const { lang } = useLang();

  const { layoutTheme: theme } = layoutValue;

  const { color: rhfColor, sizes: rhfSizes, shape: rhfShape } = useContext(FormContext);

  const { isRhf, rhfName, rhfError, rhfValue, rhfDisabled, rhfOnChange, rhfOnBlur } =
    useContext(FormItemContext);

  const [inputValue, setInputValue] = useState<InputValue>(value);

  const inputRef = useRef<HTMLDivElement>(null);

  const controlDisabled = rhfDisabled ? rhfDisabled : disabled;

  const controlColor = isRhf ? rhfColor : color;

  const controlSize = isRhf ? rhfSizes : sizes;

  const controlShape = isRhf ? rhfShape : shape;

  const controlPlaceHolder = placeholder ?? lang.common.form.placeholder.enter;

  const showClearIcon = hasClear && inputValue && !controlDisabled;

  const showOptional = required ? false : optional;

  const themClassName = `textarea-${theme}`;

  const sizeClassName = `textarea-${controlSize}`;

  const colorClassName = `textarea-${controlColor}`;

  const shapeClassName = `textarea-${controlShape}`;

  const disabledClassName = controlDisabled ? "textarea-disabled" : "";

  const errorClassName = rhfError ? "textarea-error" : "";

  const mainClassName = utils.formatClassName(
    "textarea",
    colorClassName,
    sizeClassName,
    shapeClassName,
    errorClassName,
    themClassName,
    rootClassName,
    disabledClassName
  );

  const controlLabelClassName = utils.formatClassName("textarea-label", labelClassName);

  const controlInputClassName = utils.formatClassName("control-box", inputClassName);

  // Focus input when error is trigger
  useEffect(() => {
    if (rhfError) inputRef.current?.click();
  }, [rhfError]);

  // Set default value
  useEffect(() => {
    if (isRhf) return setInputValue(rhfValue);
    setInputValue(value);
  }, [value, isRhf, rhfValue]);

  const iconSize = () => {
    if (controlSize === "sm") return 14;
    if (controlSize === "md") return 16;
    if (controlSize === "lg") return 18;
  };

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setInputValue(value);
    onChangeInput?.(value);
  };

  const handleClearInput = () => {
    if (isRhf) return rhfMethods.setValue(rhfName, "");
    setInputValue("");
    onChangeInput?.("");
  };

  const onChangeFn = rhfOnChange ? rhfOnChange : handleChange;

  const onBlurFn = rhfOnBlur ? rhfOnBlur : onBlur;

  return (
    <div style={rootStyle} className={mainClassName}>
      <label>
        {label && (
          <div style={labelStyle} className={controlLabelClassName}>
            {required && <span className="label-required">*</span>}
            <span>{label}</span>
            {showOptional && <span className="label-optional">({lang.common.form.others.optional})</span>}
          </div>
        )}

        <div ref={inputRef} className="textarea-group">
          <div className="group-control">
            <textarea
              ref={ref}
              {...restProps}
              rows={rows}
              value={inputValue}
              disabled={controlDisabled}
              placeholder={controlPlaceHolder}
              className={controlInputClassName}
              onChange={onChangeFn}
              onBlur={onBlurFn}
            />
            {showClearIcon && (
              <div className="control-action" onClick={handleClearInput}>
                <HiXCircle size={iconSize()} />
              </div>
            )}
          </div>
        </div>
      </label>
    </div>
  );
};

export default forwardRef(TextArea);
