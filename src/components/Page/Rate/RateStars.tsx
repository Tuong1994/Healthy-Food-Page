import { FC } from "react";
import { Space } from "@/components/UI";
import { HiStar } from "react-icons/hi";
import type { SpaceProps } from "@/components/UI/Space";

interface RateStarsProps extends SpaceProps {
  point: number;
}

const RateStars: FC<RateStarsProps> = ({ point, ...restProps }) => {
  const renderColor = (ratePoint: number) => {
    if (ratePoint <= point) return "rate-star-yellow";
    return "";
  };

  return (
    <Space size={5} {...restProps}>
      {[...Array(5)].map((_, idx) => {
        const ratePoint = idx + 1;
        return <HiStar key={idx} size={25} className={`rate-star ${renderColor(ratePoint)}`} />;
      })}
    </Space>
  );
};

export default RateStars;
