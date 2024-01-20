import { InputHTMLAttributes, CSSProperties, ReactNode, ForwardRefRenderFunction, forwardRef } from "react";
import { BsCloudUpload } from "react-icons/bs";
import utils from "@/utils";

interface MultipleImageUploadControlProps extends InputHTMLAttributes<HTMLInputElement> {
  controlClassName?: string;
  controlStyle?: CSSProperties;
  label?: ReactNode | ReactNode[];
}

const MultipleImageUploadControl: ForwardRefRenderFunction<
  HTMLInputElement,
  MultipleImageUploadControlProps
> = ({ controlClassName = "", controlStyle, label, ...restProps }, ref) => {
  const controlInputClassName = utils.formatClassName("group-control", controlClassName);

  const renderLabel = () => {
    if (label) return label;
    return (
      <div className="control-label">
        <BsCloudUpload size={30} className="label-icon" />
        <p>Select or drag image here</p>
      </div>
    );
  };

  return (
    <label style={controlStyle} className={controlInputClassName}>
      <input ref={ref} {...restProps} type="file" multiple className="control-input" />
      {renderLabel()}
    </label>
  );
};

export default forwardRef(MultipleImageUploadControl);
