import { FC } from "react";
import { Space, Typography } from "@/components/UI";
import { HiChevronLeft } from "react-icons/hi2";
import { useRouter } from "next/router";
import type { Lang } from "@/common/type";
import Link from "next/link";
import url from "@/common/constant/url";

const { HOME } = url;

const { Paragraph } = Typography;

interface FormLayoutBackProps {
  lang: Lang;
}

const FormLayoutBack: FC<FormLayoutBackProps> = ({ lang }) => {
  const { query } = useRouter();

  return (
    <div className="form-layout-back">
      <Link href={{ pathname: HOME, query: { langCode: query.langCode } }}>
        <Space size="md" align="middle">
          <HiChevronLeft size={25} className="back-icon" />
          <Paragraph rootClassName="back-text" size={16}>
            {lang.pageComponent.formLayout.return}
          </Paragraph>
        </Space>
      </Link>
    </div>
  );
};

export default FormLayoutBack;
