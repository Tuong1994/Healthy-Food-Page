import { FormHTMLAttributes, ReactNode, ForwardedRef, useEffect, forwardRef } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { ComponentSize } from "@/common/type";
import { ControlColor, ControlShape } from "../type";
import FormContext, { FormContextState } from "./FormContext";
import useFormStore, { FormMethods } from "./FormStore";

export interface FormProps<M> extends FormHTMLAttributes<HTMLFormElement> {
  initialData: M;
  disabled?: boolean;
  color?: ControlColor;
  shape?: ControlShape;
  sizes?: ComponentSize;
  children?: ReactNode | ReactNode[];
  onFinish?: (formData: M) => void;
}

const Form = <M extends object>(
  {
    initialData,
    disabled,
    color = "blue",
    sizes = "md",
    shape = "square",
    children,
    onFinish,
    ...restProps
  }: FormProps<M>,
  ref: ForwardedRef<HTMLFormElement>
) => {
  const setForm = useFormStore((state) => state.setForm);

  const rhfMethods = useForm<M>({ values: initialData, mode: "all" });

  const formContextState: FormContextState = { isForm: true, color, sizes, shape, disabled };

  const onSubmit = (formData: M) => onFinish?.(formData);

  useEffect(() => {
    const { handleSubmit, watch } = rhfMethods;
    const methods: FormMethods = {
      watchField: watch,
      handleSubmit: handleSubmit(onSubmit),
    };
    setForm(methods);
  }, []);

  return (
    <FormProvider {...rhfMethods}>
      <FormContext.Provider value={formContextState}>
        <form ref={ref} {...restProps} onSubmit={rhfMethods.handleSubmit(onSubmit)}>
          {children}
        </form>
      </FormContext.Provider>
    </FormProvider>
  );
};

export default forwardRef(Form);
