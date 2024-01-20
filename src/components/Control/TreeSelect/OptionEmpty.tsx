import { FC } from "react";

interface OptionEmptyProps {}

const OptionEmpty: FC<OptionEmptyProps> = () => {
  return <div className="list-empty">No option</div>;
};

export default OptionEmpty;
