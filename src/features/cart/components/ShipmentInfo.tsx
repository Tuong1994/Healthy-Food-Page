import { FC } from "react";
import { Divider, InfoRow, Space, Tooltip } from "@/components/UI";
import type { Lang } from "@/common/type";
import type { InfoRowProps } from "@/components/UI/InfoRow";
import type { ShipmentFormData } from "@/services/shipment/type";
import { HiPencilAlt } from "react-icons/hi";
import { HiTrash } from "react-icons/hi2";
import utils from "@/utils";

interface ShipmentInfoProps {
  lang: Lang;
  hasEdit?: boolean;
  shipment: ShipmentFormData | undefined;
  onEdit?: (shipment: ShipmentFormData | undefined) => void;
  onRemove?: () => void;
}

const ShipmentInfo: FC<ShipmentInfoProps> = ({ lang, hasEdit = true, shipment, onEdit, onRemove }) => {
  const commonProps: InfoRowProps = {
    labelSpanProps: { xs: 8, md: 4, lg: 5, span: 4 },
    textSpanProps: { xs: 16, md: 18 },
  };

  const handleEdit = () => onEdit?.(shipment);

  const handleRemove = () => onRemove?.()

  if (!shipment) return null;

  return (
    <div className="shipment-info">
      <Divider>{lang.cart.shipment.title}</Divider>
      <InfoRow {...commonProps} label={lang.common.form.label.fullName} text={shipment.fullName} />
      <InfoRow
        {...commonProps}
        label={lang.common.form.label.phone}
        text={utils.formatPhoneNumber(shipment.phone)}
      />
      <InfoRow {...commonProps} label={lang.common.form.label.email} text={shipment.email} />
      <InfoRow {...commonProps} label={lang.common.form.label.fullAddress} text={shipment.address} />
      {hasEdit && (
        <Space rootClassName="info-edit-action">
          <Tooltip
            color="green"
            placement="left"
            rootClassName="action-icon"
            label={lang.cart.shipment.editLabel}
            onClick={handleEdit}
          >
            <HiPencilAlt size={16} />
          </Tooltip>
          <Tooltip
            color="green"
            placement="left"
            rootClassName="action-icon"
            label={lang.cart.shipment.removeLabel}
            onClick={handleRemove}
          >
            <HiTrash size={16} />
          </Tooltip>
        </Space>
      )}
    </div>
  );
};

export default ShipmentInfo;
