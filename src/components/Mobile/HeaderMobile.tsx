import { FC, useState, useMemo, Fragment } from "react";
import { Button, Space, Drawer, Divider, Grid } from "@/components/UI";
import { FaBars } from "react-icons/fa";
import { ELang } from "@/common/enum";
import { useLang } from "@/hooks";
import Link from "next/link";
import Logo from "@/components/Page/Logo";
import url from "@/common/constant/url";
import utils from "@/utils";

const { HOME, ABOUT, PAYMENT, DELIVERY, EXCHANGE, AUTH_SIGN_UP } = url;

const { Row, Col } = Grid;

interface HeaderMobileProps {}

const HeaderMobile: FC<HeaderMobileProps> = () => {
  const { locale, lang, handleSwitchLang } = useLang();

  const [open, setOpen] = useState<boolean>(false);

  const menu = useMemo(
    () => [
      { id: "1", label: lang.common.menu.home, path: HOME },
      { id: "2", label: lang.common.menu.about, path: ABOUT },
      { id: "3", label: lang.common.menu.payment, path: PAYMENT },
      { id: "4", label: lang.common.menu.delivery, path: DELIVERY },
      { id: "5", label: lang.common.menu.exchange, path: EXCHANGE },
    ],
    [lang]
  );

  const activeClassName = (currentLocale: ELang) => (locale === currentLocale ? "side-lang-active" : "");

  const handleActiveDrawer = () => setOpen(!open);

  const renderMenu = () => {
    return menu.map((item) => (
      <Link
        key={item.id}
        className="side-link"
        href={{ pathname: item.path, query: { langCode: locale } }}
        onClick={handleActiveDrawer}
      >
        {item.label}
      </Link>
    ));
  };

  return (
    <Fragment>
      <Space rootClassName="bottom-mobile" align="middle" size="md">
        <Link href={AUTH_SIGN_UP}>
          <Button sizes="lg" rootClassName="mobile-auth-btn">
            {lang.auth.signUp.title}
          </Button>
        </Link>
        <button className="mobile-open-btn" onClick={handleActiveDrawer}>
          <FaBars size={18} />
        </button>
      </Space>

      <Drawer open={open} head={<Logo />} onClose={handleActiveDrawer} bodyClassName="header-mobile-side">
        {renderMenu()}

        <Divider />

        <Row justify="between">
          <Col>
            <span>{lang.pageComponent.header.translate.title}</span>
          </Col>
          <Col>
            <Space>
              <span
                className={utils.formatClassName("side-lang", activeClassName(ELang.EN))}
                onClick={() => handleSwitchLang(ELang.EN)}
              >
                EN
              </span>
              <span
                className={utils.formatClassName("side-lang", activeClassName(ELang.VN))}
                onClick={() => handleSwitchLang(ELang.VN)}
              >
                VN
              </span>
            </Space>
          </Col>
        </Row>
      </Drawer>
    </Fragment>
  );
};

export default HeaderMobile;
