import { HTMLAttributes, ForwardRefRenderFunction, forwardRef } from "react";
import { Image } from "@/components/UI";
import utils from "@/utils";

interface MonitorProps extends HTMLAttributes<HTMLDivElement> {
  rootClassName?: string;
  screenImg?: string;
}

const Monitor: ForwardRefRenderFunction<HTMLDivElement, MonitorProps> = (
  { rootClassName = "", screenImg = "/about/about-monitor-screen.png", ...restProps },
  ref
) => {
  const mainClassName = utils.formatClassName("monitor", rootClassName);

  return (
    <div ref={ref} {...restProps} className={mainClassName}>
      <div className="monitor-body">
        <div className="body-screen">
          <Image src={screenImg} imgWidth="100%" imgHeight="100%" />
        </div>
      </div>
      <div className="monitor-foot">
        <div className="foot-part" />
        <div className="foot-part" />
      </div>
    </div>
  );
};

export default forwardRef(Monitor);
