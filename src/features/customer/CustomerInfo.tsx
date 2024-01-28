import { FC } from "react";
import { Card, Avatar, Space, Divider, InfoRow, Tooltip, Button, Image, Typography } from "@/components/UI";
import type { Lang } from "@/common/type";
import type { InfoRowProps } from "@/components/UI/InfoRow";
import type { Customer } from "@/services/customer/type";
import { ERole } from "@/services/customer/enum";
import { HiCalendar, HiPhone } from "react-icons/hi2";
import { HiLocationMarker, HiMail, HiPencilAlt } from "react-icons/hi";
import { FaTransgender } from "react-icons/fa";
import { useDisplayGender } from "@/hooks";
import utils from "@/utils";
import moment from "moment";

const { Paragraph } = Typography;

interface CustomerInfoProps {
  lang: Lang;
  customer: Customer;
  handleOpenEdit: () => void;
}

const CustomerInfo: FC<CustomerInfoProps> = ({ lang, customer, handleOpenEdit }) => {
  const commonProps: InfoRowProps = {
    rootClassName: "info-item",
    hasColon: false,
    labelProps: { style: { width: "auto" } },
    textProps: { weight: 400, strong: false },
    labelSpanProps: { xs: 2, md: 2, lg: 2, span: 2 },
    textSpanProps: { xs: 20, md: 20, lg: 20, span: 20 },
  };

  const hasAdmin = customer.role === ERole.ADMIN || customer.role === ERole.SUPER_ADMIN;

  return (
    <Card bodyClassName="customer-info">
      <Space align="middle">
        <Avatar color="black" size={50}>
          <Image imgWidth="100%" imgHeight="100%" src={customer.image?.path} />
        </Avatar>
        <div className="info-group">
          <Paragraph strong size={16}>
            {lang.customer.greeting}, {customer.fullName}
          </Paragraph>
          {hasAdmin && (
            <a href="#">
              <Button sizes="sm" color="black">
                {lang.customer.admin}
              </Button>
            </a>
          )}
        </div>
      </Space>

      <Divider />

      <Space justify="end">
        <Tooltip label={lang.common.actions.edit} placement="left" onClick={handleOpenEdit}>
          <HiPencilAlt className="info-edit-icon" size={18} />
        </Tooltip>
      </Space>

      <InfoRow {...commonProps} labelElement={<HiMail />} text={customer.email} />
      {customer.phone && (
        <InfoRow
          {...commonProps}
          labelElement={<HiPhone />}
          text={utils.formatPhoneNumber(customer.phone ?? "")}
        />
      )}
      {customer.gender && (
        <InfoRow
          {...commonProps}
          labelElement={<FaTransgender />}
          textElement={useDisplayGender(customer.gender)}
        />
      )}
      {customer.birthday && (
        <InfoRow
          {...commonProps}
          labelElement={<HiCalendar />}
          text={moment(customer.birthday).format("DD/MM/YYYY")}
        />
      )}
      {customer.address?.fullAddress && (
        <InfoRow {...commonProps} labelElement={<HiLocationMarker />} text={customer.address?.fullAddress} />
      )}
    </Card>
  );
};

export default CustomerInfo;
