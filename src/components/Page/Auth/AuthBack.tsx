import React from "react";
import { UI } from "@/components";
import { HiChevronLeft } from "react-icons/hi2";
import { Lang } from "@/common/type";
import Link from "next/link";

const { Space, Typography } = UI;

const { Paragraph } = Typography;

interface AuthBackProps {
  lang: Lang;
}

const AuthBack: React.FC<AuthBackProps> = ({ lang }) => {
  return (
    <div className="auth-back">
      <Link href="/">
        <Space size="md" align="middle">
          <HiChevronLeft size={25} className="back-icon" />
          <Paragraph rootClassName="back-text" size={16}>{lang.auth.common.return}</Paragraph>
        </Space>
      </Link>
    </div>
  );
};

export default AuthBack;
