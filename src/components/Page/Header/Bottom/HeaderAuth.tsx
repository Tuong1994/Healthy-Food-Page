import React from "react";
import { UI } from "@/components";
import type { Lang } from "@/common/type";
import type { DropdownItems } from "@/components/UI/Dropdown/type";
import { BsGear } from "react-icons/bs";
import { HiUser } from "react-icons/hi2";
import { HiLogout } from "react-icons/hi";
import Link from "next/link";
import url from "@/common/constant/url";

const { AUTH_SIGN_IN, AUTH_SIGN_UP, CUSTOMER } = url;

const { Space, Avatar, Button, Dropdown, Grid, Typography } = UI;

const { Row, Col } = Grid;

const { Paragraph } = Typography;

const isAuth = false;

interface HeaderAuthProps {
  lang: Lang;
}

const HeaderAuth: React.FC<HeaderAuthProps> = ({ lang }) => {
  const items: DropdownItems = [
    {
      id: "1",
      label: (
        <Space align="middle">
          <HiUser />
          <Link href={`${CUSTOMER}/1`}>{lang.pageComponent.header.profile.customer}</Link>
        </Space>
      ),
    },
    {
      id: "2",
      label: (
        <Space align="middle">
          <BsGear />
          <a href="#">{lang.pageComponent.header.profile.admin}</a>
        </Space>
      ),
    },
    {
      id: "3",
      label: (
        <Space align="middle">
          <HiLogout />
          <span>{lang.pageComponent.header.profile.logout}</span>
        </Space>
      ),
    },
  ];

  return (
    <Row align="middle" justify={isAuth ? "end" : "between"} rootClassName="bottom-auth">
      {!isAuth ? (
        <React.Fragment>
          <Col span={12}>
            <Link href={AUTH_SIGN_IN}>
              <Button sizes="lg" ghost rootClassName="auth-btn">
                {lang.auth.signIn.title}
              </Button>
            </Link>
          </Col>
          <Col span={12}>
            <Link href={AUTH_SIGN_UP}>
              <Button sizes="lg" color="green" rootClassName="auth-btn">
                {lang.auth.signUp.title}
              </Button>
            </Link>
          </Col>
        </React.Fragment>
      ) : (
        <Col>
          <Dropdown items={items} placement="right">
            <Space align="middle">
              <Avatar color="green" />
              <Paragraph strong>User name</Paragraph>
            </Space>
          </Dropdown>
        </Col>
      )}
    </Row>
  );
};

export default HeaderAuth;
