import { FC } from "react";
import { Typography, Space, Card } from "@/components/UI";
import { CiFaceFrown } from "react-icons/ci";
import { useLang } from "@/hooks";

const { Paragraph } = Typography;

interface AppErrorProps {}

const AppError: FC<AppErrorProps> = () => {
  const { lang } = useLang();

  return (
    <div className="app-error">
      <Card hoverable rootClassName="error-card">
        <Space justify="center">
          <CiFaceFrown size={100} />
        </Space>
        <Paragraph align="center" size={18}>
          {lang.pageComponent.appError.message}
        </Paragraph>
      </Card>
    </div>
  );
};

export default AppError;
