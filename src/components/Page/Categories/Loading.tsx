import { FC } from "react";
import { Loading, Space } from "@/components/UI";

const { Skeleton } = Loading;

const CategoriesLoading: FC<{}> = () => {
  return (
    <div className="categories-loading">
      {[...Array(8)].map((_, idx) => (
        <Space align="middle" key={idx} rootClassName="loading-line">
          <Skeleton type="image" options={{ size: 25 }} />
          <Skeleton type="paragraph" options={{ lines: 1, width: 130 }} />
        </Space>
      ))}
    </div>
  );
};

export default CategoriesLoading;
