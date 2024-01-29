import { FC, Fragment } from "react";
import { Space, Avatar, Button, Dropdown, Image, Grid, Typography, Loading } from "@/components/UI";
import type { Lang } from "@/common/type";
import type { DropdownItems } from "@/components/UI/Dropdown/type";
import type { ApiQuery } from "@/services/type";
import { BsGear } from "react-icons/bs";
import { HiUser } from "react-icons/hi2";
import { HiLogout } from "react-icons/hi";
import { useAsync, useMounted } from "@/hooks";
import { useRouter } from "next/router";
import { logout } from "@/services/auth/api";
import { HttpStatus } from "@/services/axios";
import useAuthStore from "@/store/AuthStore";
import useMessage from "@/components/UI/ToastMessage/useMessage";
import useProductStore from "@/store/ProductStore";
import Link from "next/link";
import url from "@/common/constant/url";

const { HOME, AUTH_SIGN_IN, AUTH_SIGN_UP, CUSTOMER } = url;

const { Row, Col } = Grid;

const { Spinner } = Loading;

const { Paragraph } = Typography;

interface HeaderAuthProps {
  lang: Lang;
}

const HeaderAuth: FC<HeaderAuthProps> = ({ lang }) => {
  const messageApi = useMessage();

  const isMounted = useMounted();

  const { query, pathname, push: routerPush, reload: routerReload } = useRouter();

  const [auth, resetAuth] = useAuthStore((state) => [state.auth, state.resetAuth]);

  const { loading, call: onLogout } = useAsync<any>(logout);

  const { isAuth, info } = auth;

  const handleLogout = async () => {
    const apiQuery: ApiQuery = { customerId: info.id };
    const response = await onLogout(apiQuery);
    if (!response.success) {
      let message = lang.common.message.error.api;
      const status = response.error?.status;
      if (status === HttpStatus.FORBIDDEN) message = lang.common.message.error.logout;
      return messageApi.error(message);
    }
    messageApi.success(lang.common.message.success.logout);
    resetAuth();
    if (pathname === HOME) routerReload();
    setTimeout(() => routerPush({ pathname: HOME, query: { langCode: query.langCode } }), 200);
  };

  const items: DropdownItems = [
    {
      id: "1",
      label: (
        <Space align="middle">
          <HiUser />
          <Link href={{ pathname: CUSTOMER, query: { id: info.id, langCode: query.langCode } }}>
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
          <a href="#">{lang.pageComponent.header.profile.admin}</a>
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
