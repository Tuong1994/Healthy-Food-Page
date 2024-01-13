import React from "react";
import { UI } from "@/components";
import { FaBars } from "react-icons/fa";
import { ELang } from "@/common/enum";
import Link from "next/link";
import Logo from "@/components/Page/Logo";
import useLangStore from "@/store/LangStore";
import url from "@/common/constant/url";

const { HOME, ABOUT, PAYMENT, DELIVERY, EXCHANGE, AUTH_SIGN_UP } = url;

const { Button, Space, Drawer, Divider, Grid } = UI;

const { Row, Col } = Grid;

interface HeaderMobileProps {}

const HeaderMobile: React.FC<HeaderMobileProps> = () => {
  const [type, lang, switchLang] = useLangStore((state) => [
    state.type,
    state.lang,
    state.switchLang,
  ]);

  const [open, setOpen] = React.useState<boolean>(false);

  const menu = React.useMemo(
    () => [
      { id: "1", label: lang.common.menu.home, path: HOME },
      { id: "2", label: lang.common.menu.about, path: ABOUT },
      { id: "3", label: lang.common.menu.payment, path: PAYMENT },
      { id: "4", label: lang.common.menu.delivery, path: DELIVERY },
      { id: "5", label: lang.common.menu.exchange, path: EXCHANGE },
    ],
    [lang]
  );

  const renderMenu = () => {
    return menu.map((item) => (
      <Link key={item.id} href={item.path} className="side-link">
        {item.label}
      </Link>
    ));
  };

  const activeClassName = (currentType: ELang) =>
    type === currentType ? "side-lang-active" : "";

  const handleOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

  return (
    <React.Fragment>
      <Space rootClassName="bottom-mobile" align="middle" size="md">
        <Link href={AUTH_SIGN_UP}>
          <Button sizes="lg" rootClassName="mobile-auth-btn">
            {lang.auth.signUp.title}
          </Button>
        </Link>
        <button className="mobile-open-btn" onClick={handleOpen}>
          <FaBars size={18} />
        </button>
      </Space>

      <Drawer
        open={open}
        head={<Logo />}
        onClose={handleClose}
        bodyClassName="header-mobile-side"
      >
        {renderMenu()}

        <Divider />

        <Row justify="between">
          <Col>
            <span>{lang.pageComponent.header.translate.title}</span>
          </Col>
          <Col>
            <Space>
              <span
                className={`side-lang ${activeClassName(ELang.EN)}`}
                onClick={() => switchLang(ELang.EN)}
              >
                EN
              </span>
              <span
                className={`side-lang ${activeClassName(ELang.VN)}`}
                onClick={() => switchLang(ELang.VN)}
              >
                VN
              </span>
            </Space>
          </Col>
        </Row>
      </Drawer>
    </React.Fragment>
  );
};

export default HeaderMobile;
