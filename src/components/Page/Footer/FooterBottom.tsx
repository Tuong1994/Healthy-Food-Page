import React from "react";
import { UI } from "@/components";
import { FaFacebook, FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";
import { useLang } from "@/hooks";
import Link from "next/link";
import url from "@/common/constant/url";

const { HOME, ABOUT, PAYMENT, DELIVERY, EXCHANGE } = url;

const { Grid, UList, Typography, Space, Image } = UI;

const { Row, Col } = Grid;

const { List, ListItem } = UList;

const { Paragraph } = Typography;

interface FooterBottomProps {}

const ICON_SIZE = 20;

const FooterBottom: React.FC<FooterBottomProps> = () => {
  const { lang } = useLang();

  return (
    <div className="footer-bottom">
      <Row rootClassName="bottom-list" justify="between">
        <Col span={4}>
          <List head="HeaFood.vn" icon={""}>
            <ListItem rootClassName="list-link">
              <Link href={HOME}>{lang.common.menu.home}</Link>
            </ListItem>
            <ListItem rootClassName="list-link">
              <Link href={ABOUT}>{lang.common.menu.about}</Link>
            </ListItem>
          </List>
        </Col>
        <Col span={4}>
          <List head={lang.pageComponent.footer.support} icon={""}>
            <ListItem>
              <Space>
                <span>{lang.common.form.label.phone}:</span>
                <Paragraph strong>028 3975 3186</Paragraph>
              </Space>
            </ListItem>
            <ListItem>
              <Space>
                <span>{lang.common.form.label.email}:</span>
                <Paragraph strong>info@heafood.vn</Paragraph>
              </Space>
            </ListItem>
            <ListItem rootClassName="list-link">
              <Link href={PAYMENT}>{lang.common.menu.payment}</Link>
            </ListItem>
            <ListItem rootClassName="list-link">
              <Link href={DELIVERY}>{lang.common.menu.delivery}</Link>
            </ListItem>
            <ListItem rootClassName="list-link">
              <Link href={EXCHANGE}>{lang.common.menu.exchange}</Link>
            </ListItem>
          </List>
        </Col>
        <Col lg={6} span={7}>
          <Image src="/store.svg" />
        </Col>
        <Col span={5}>
          <List head={lang.pageComponent.footer.connect}></List>
          <Space>
            <div className="list-icon">
              <FaFacebook size={ICON_SIZE} />
            </div>
            <div className="list-icon">
              <FaYoutube size={ICON_SIZE} />
            </div>
            <div className="list-icon">
              <FaInstagram size={ICON_SIZE} />
            </div>
            <div className="list-icon">
              <FaLinkedin size={ICON_SIZE} />
            </div>
          </Space>
        </Col>
      </Row>

      <Paragraph align="center" variant="secondary">
        {lang.pageComponent.footer.content}
      </Paragraph>
      <Paragraph align="center" variant="secondary">
        {lang.common.form.label.fullAddress}: {lang.pageComponent.footer.address}
      </Paragraph>
    </div>
  );
};

export default FooterBottom;
