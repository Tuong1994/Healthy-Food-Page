import { FC, Fragment } from "react";
import { Space, Avatar, Button, Dropdown, Image, Grid, Typography, Loading } from "@/components/UI";
import type { Lang } from "@/common/type";
import type { DropdownItems } from "@/components/UI/Dropdown/type";
import { BsGear } from "react-icons/bs";
import { HiUser } from "react-icons/hi2";
import { HiLogout } from "react-icons/hi";
import { useLang, useLogout, useMounted } from "@/hooks";
import Link from "next/link";
import url, { ADMIN_PATH } from "@/common/constant/url";
import useAuthStore from "@/store/AuthStore";

const { AUTH_SIGN_IN, AUTH_SIGN_UP, USER } = url;

const { Row, Col } = Grid;

const { Spinner } = Loading;

const { Paragraph } = Typography;

interface HeaderAuthProps {
  lang: Lang;
}

const HeaderAuth: FC<HeaderAuthProps> = ({ lang }) => {
  const isMounted = useMounted();

  const auth = useAuthStore((state) => state.auth);

  const { isAuth, info } = auth;

  const { locale } = useLang();

  const { loading, onLogout } = useLogout(info.id as string);

  const handleLogout = async () => {
    await onLogout();
  };

  const items: DropdownItems = [
    {
      id: "1",
      label: (
        <Space align="middle">
          <HiUser />
          <Link href={{ pathname: USER, query: { id: info.id, langCode: locale } }}>
            {lang.pageComponent.header.profile.customer}
          </Link>
        </Space>
      ),
    },
    {
      id: "2",
      label: (
        <Space align="middle">
          <BsGear />
          <a href={ADMIN_PATH} target="_blank">
            {lang.pageComponent.header.profile.admin}
          </a>
        </Space>
      ),
    },
    {
      id: "3",
      label: (
        <Space align="middle" onClick={handleLogout}>
          {loading ? <Spinner /> : <HiLogout />}
          <span>{lang.pageComponent.header.profile.logout}</span>
        </Space>
      ),
    },
  ];

  if (!isMounted) return null;

  return (
    <Row align="middle" justify={isAuth ? "end" : "between"} rootClassName="bottom-auth">
      {!isAuth ? (
        <Fragment>
          <Col span={12}>
            <Link href={{ pathname: AUTH_SIGN_IN, query: { langCode: locale } }}>
              <Button sizes="lg" ghost rootClassName="auth-btn">
                {lang.auth.signIn.title}
              </Button>
            </Link>
          </Col>
          <Col span={12}>
            <Link href={{ pathname: AUTH_SIGN_UP, query: { langCode: locale } }}>
              <Button sizes="lg" color="green" rootClassName="auth-btn">
                {lang.auth.signUp.title}
              </Button>
            </Link>
          </Col>
        </Fragment>
      ) : (
        <Col>
          <Dropdown items={items} placement="right">
            <Space align="middle">
              <Avatar color="green">
                <Image imgWidth="100%" imgHeight="100%" src={info.image?.path} />
              </Avatar>
              <Paragraph strong>{info.fullName ?? "Customer"}</Paragraph>
            </Space>
          </Dropdown>
        </Col>
      )}
    </Row>
  );
};

export default HeaderAuth;
