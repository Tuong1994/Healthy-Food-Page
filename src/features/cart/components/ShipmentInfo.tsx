import { FC } from "react";
import { Divider, InfoRow } from "@/components/UI";
import type { Lang } from "@/common/type";
import type { InfoRowProps } from "@/components/UI/InfoRow";

interface ShipmentInfoProps {
  lang: Lang;
}

const ShipmentInfo: FC<ShipmentInfoProps> = ({ lang }) => {
  const commonProps: InfoRowProps = {
    labelSpanProps: { xs: 8, md: 4, lg: 5, span: 4 },
    textSpanProps: { xs: 16, md: 18 },
  };

  return (
    <div className="shipment-info">
      <Divider>{lang.cart.shipment.title}</Divider>
      <InfoRow {...commonProps} label={lang.common.form.label.fullName} text="Jack Anderson" />
      <InfoRow {...commonProps} label={lang.common.form.label.phone} text="079 322 9970" />
      <InfoRow {...commonProps} label={lang.common.form.label.email} text="jack@example.com" />
      <InfoRow
        {...commonProps}
        label={lang.common.form.label.fullAddress}
        text="79/24/13 Au Co Str, Ward 14, District 11, HCMC"
      />
    </div>
  );
};

export default ShipmentInfo;
