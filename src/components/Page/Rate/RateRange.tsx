import React from "react";
import { UI } from "@/components";
import { HiStar } from "react-icons/hi2";
import useLangStore from "@/store/LangStore";

const { Space, Tooltip } = UI;

interface RateRangeProps {}

const RateRange: React.FC<RateRangeProps> = () => {
  const lang = useLangStore((state) => state.lang);

  const [point, setPoint] = React.useState<number>(0);

  const [hoverIdx, setHoverIdx] = React.useState<number>(0);

  const descriptions = [
    lang.pageComponent.rate.wonderful,
    lang.pageComponent.rate.good,
    lang.pageComponent.rate.normal,
    lang.pageComponent.rate.bad,
    lang.pageComponent.rate.terrible,
  ];

  const renderColor = (ratePoint: number) => {
    if (ratePoint <= (point || hoverIdx)) return "item-star-selected";
    return "";
  };

  const handleSelect = (ratePoint: number) => setPoint(ratePoint);

  const handleHover = (e: React.MouseEvent, point: number) => {
    if (e.type === "mouseenter") return setHoverIdx(point);
    return setHoverIdx(0);
  };

  return (
    <div className="rate-range">
      <Space size={5} justify="center">
        {[...Array(5)].map((_, idx) => {
          const ratePoint = idx + 1;
          return (
            <Tooltip label={descriptions[idx]} key={idx}>
              <label className="range-item">
                <input
                  type="radio"
                  value={ratePoint}
                  className="item-input"
                  onClick={() => handleSelect(ratePoint)}
                />
                <HiStar
                  size={35}
                  className={`item-star ${renderColor(ratePoint)}`}
                  onMouseEnter={(e: React.MouseEvent) => handleHover(e, ratePoint)}
                  onMouseLeave={(e: React.MouseEvent) => handleHover(e, ratePoint)}
                />
              </label>
            </Tooltip>
          );
        })}
      </Space>
    </div>
  );
};

export default RateRange;
