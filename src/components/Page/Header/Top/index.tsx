import { FC } from "react";
import { Grid, Space } from "@/components/UI";
import { FaPhone } from "react-icons/fa";
import { useLang } from "@/hooks";
import Link from "next/link";
import HeaderTranslate from "./HeaderTranslate";
import url from "@/common/constant/url";

const { ABOUT } = url;

const { Row, Col } = Grid;

interface HeaderTopProps {}

const HeaderTop: FC<HeaderTopProps> = () => {
  const { locale, lang } = useLang();

  return (
    <Row rootClassName="header-top" justify="between" align="middle">
      <Col>
        <Link href={{ pathname: ABOUT, query: { langCode: locale } }} className="top-about">
          {lang.common.menu.about}
        </Link>
      </Col>
      <Col>
        <Space size="md" align="middle">
          <a href="tel:02839753186" className="top-contact">
            <Space>
              <FaPhone />
              <span>028 3975 3186</span>
            </Space>
          </a>
          <HeaderTranslate />
        </Space>
      </Col>
    </Row>
  );
};

export default HeaderTop;
