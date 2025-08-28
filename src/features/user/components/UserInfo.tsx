import { FC } from "react";
import { Card, Avatar, Space, Divider, InfoRow, Tooltip, Button, Image, Typography } from "@/components/UI";
import type { Lang } from "@/common/type";
import type { InfoRowProps } from "@/components/UI/InfoRow";
import type { User } from "@/services/user/type";
import { ERole } from "@/services/user/enum";
import { HiCalendar, HiPhone } from "react-icons/hi2";
import { HiLocationMarker, HiMail, HiPencilAlt } from "react-icons/hi";
import { FaTransgender } from "react-icons/fa";
import { ADMIN_PATH } from "@/common/constant/url";
import { useLogout } from "@/hooks";
import getDisplayGender from "../data-display/getDisplayGender";
import utils from "@/utils";
import moment from "moment";

const { Paragraph } = Typography;

interface UserInfoProps {
  lang: Lang;
  user: User;
  handleOpenEdit: () => void;
}

const UserInfo: FC<UserInfoProps> = ({ lang, user, handleOpenEdit }) => {
  const { loading, onLogout } = useLogout(user.id as string);

  const iconSize = 20

  const commonProps: InfoRowProps = {
    rootClassName: "info-item",
    hasColon: false,
    labelProps: { style: { width: "auto" } },
    textProps: { size: 16, weight: 400, strong: false },
    labelSpanProps: { xs: 2, md: 2, lg: 2, span: 2 },
    textSpanProps: { xs: 20, md: 20, lg: 20, span: 20 },
  };

  const hasAdmin = user.role === ERole.MANAGER || user.role === ERole.LEADER || user.role === ERole.STAFF;

  const handleLogout = async () => {
    await onLogout();
  };

  return (
    <Card bodyClassName="user-info">
      <Space align="middle">
        <Avatar color="black" size={50}>
          <Image imgWidth="100%" imgHeight="100%" src={user.image?.path} />
        </Avatar>
        <div className="info-group">
          <Paragraph strong size={16}>
            {lang.user.greeting}, {user.fullName ?? 'Customer'}
          </Paragraph>
          {hasAdmin && (
            <a href={ADMIN_PATH} target="_blank">
              <Button sizes="sm" color="black">
                {lang.user.admin}
              </Button>
            </a>
          )}
        </div>
      </Space>

      <Divider />

      <Space justify="end">
        <Tooltip label={lang.common.actions.edit} placement="left" onClick={handleOpenEdit}>
          <HiPencilAlt className="info-edit-icon" size={iconSize} />
        </Tooltip>
      </Space>

      <InfoRow {...commonProps} labelElement={<HiMail size={iconSize} />} text={user.email} />
      {user.phone && (
        <InfoRow
          {...commonProps}
          labelElement={<HiPhone size={iconSize} />}
          text={utils.formatPhoneNumber(user.phone ?? "")}
        />
      )}
      {user.gender && (
        <InfoRow
          {...commonProps}
          labelElement={<FaTransgender size={iconSize} />}
          textElement={getDisplayGender(lang, user.gender)}
        />
      )}
      {user.birthday && (
        <InfoRow
          {...commonProps}
          labelElement={<HiCalendar size={iconSize} />}
          text={moment(user.birthday).format("DD/MM/YYYY")}
        />
      )}
      {user.address?.fullAddress && (
        <InfoRow {...commonProps} labelElement={<HiLocationMarker size={iconSize} />} text={user.address?.fullAddress} />
      )}
      
      <Button ghost loading={loading} disabled={loading} color="green" onClick={handleLogout}>
        {lang.pageComponent.auth.logout}
      </Button>
    </Card>
  );
};

export default UserInfo;
