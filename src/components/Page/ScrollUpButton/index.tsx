import { FC, ButtonHTMLAttributes, useState, useEffect } from "react";
import { HiChevronUp } from "react-icons/hi2";
import utils from "@/utils";
import { useMounted, useRender } from "@/hooks";

interface ScrollUpButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  rootClassName?: string;
}

const ScrollUpButton: FC<ScrollUpButtonProps> = ({ rootClassName = "", type = "button", ...restProps }) => {
  const isMounted = useMounted();

  const [isShow, setIsShow] = useState<boolean>(false);

  const render = useRender(isShow);

  const showClassName = isShow ? "scroll-up-button-show" : "";

  const mainClassName = utils.formatClassName("scroll-up-button", showClassName, rootClassName);

  useEffect(() => {
    if (!window) return;
    const toggleVisibility = () => {
      if (window.scrollY > 0) setIsShow(true);
      else setIsShow(false);
    };
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const handleScroll = () => {
    if (!window) return;
    window.scrollTo(0, 0);
  };

  if (!isMounted) return null;

  return render ? (
    <button {...restProps} type={type} className={mainClassName} onClick={handleScroll}>
      <HiChevronUp size={20} />
    </button>
  ) : null;
};

export default ScrollUpButton;
