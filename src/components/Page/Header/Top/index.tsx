import React from "react";
import { UI } from "@/components";
import { Lang } from "@/common/type";
import { FaPhone } from "react-icons/fa";
import Link from "next/link";
import HeaderTranslate from "./HeaderTranslate";
import url from "@/common/constant/url";

const { ABOUT } = url;

const { Grid, Space } = UI;

const { Row, Col } = Grid;

interface HeaderTopProps {
  lang: Lang;
}

const HeaderTop: React.FC<HeaderTopProps> = ({ lang }) => {
  return (
    <Row rootClassName="header-top" justify="between" align="middle">
      <Col>
        <Link href={ABOUT} className="top-about">
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
