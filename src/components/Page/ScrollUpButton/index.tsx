import { FC, ButtonHTMLAttributes, useState, useEffect } from "react";
import { HiChevronUp } from "react-icons/hi2";
import { useMounted, useRender } from "@/hooks";
import utils from "@/utils";

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
  let ticking = false;
  const toggleVisibility = () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        setIsShow(window.scrollY > 0);
        ticking = false;
      });
      ticking = true;
    }
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
      <HiChevronUp size={30} />
    </button>
  ) : null;
};

export default ScrollUpButton;
