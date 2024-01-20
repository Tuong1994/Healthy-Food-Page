import { Dispatch, SetStateAction, FC } from "react";
import { TabsItem } from "./type";
import utils from "@/utils";

interface TabsHeadProps {
  item: TabsItem;
  tabActiveClassName: string;
  setTabActive: Dispatch<SetStateAction<string>>;
}

const TabsHead: FC<TabsHeadProps> = ({ item, tabActiveClassName, setTabActive }) => {
  const className = utils.formatClassName("head-item", tabActiveClassName);

  return (
    <div className={className} onClick={() => setTabActive(item.id)}>
      <div className="item-inner">{item.title}</div>
    </div>
  );
};

export default TabsHead;
