import { HTMLAttributes, ForwardRefRenderFunction, forwardRef } from "react";
import { Image } from "@/components/UI";
import utils from "@/utils";

interface PhoneProps extends HTMLAttributes<HTMLDivElement> {
  rootClassName?: string;
  screenImg?: string;
}

const Phone: ForwardRefRenderFunction<HTMLDivElement, PhoneProps> = (
  { rootClassName = "", screenImg = "/about/about-phone-screen.png", ...restProps },
  ref
) => {
  const mainClassName = utils.formatClassName("phone", rootClassName);

  return (
    <div ref={ref} {...restProps} className={mainClassName}>
      <div className="phone-screen">
        <div className="screen-head">
          <div className="head-camera"></div>
        </div>
        <Image src={screenImg} imgWidth="100%" imgHeight="100%" />
      </div>
    </div>
  );
};

export default forwardRef(Phone);
