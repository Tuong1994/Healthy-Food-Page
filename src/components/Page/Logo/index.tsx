import { ForwardRefRenderFunction, forwardRef } from "react";
import Image from "next/image";

interface LogoProps {
  width?: number;
  height?: number;
}

const Logo: ForwardRefRenderFunction<HTMLImageElement, LogoProps> = ({ width = 130, height = 30 }, ref) => {
  return (
    <div className="logo">
      <Image ref={ref} width={width} height={height} src="/logo/logo-no-background.svg" alt="logo" priority />
    </div>
  );
};

export default forwardRef(Logo);
