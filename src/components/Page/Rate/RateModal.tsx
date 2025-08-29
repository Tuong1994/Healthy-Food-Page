import { FC, useState } from "react";
import { Divider, Modal } from "@/components/UI";
import { Form, FormItem, Input, TextArea } from "@/components/Control";
import type { ModalProps } from "@/components/UI/Modal";
import type { Lang } from "@/common/type";
import type { RateFormData } from "@/services/rate/type";
import { ELang } from "@/common/enum";
import { getProduct } from "@/services/product/api";
import { createRate } from "@/services/rate/api";
import { useAsync } from "@/hooks";
import { useRouter } from "next/router";
import RateRange from "./RateRange";
import useAuthStore from "@/store/AuthStore";
import useFormStore from "@/components/Control/Form/FormStore";
import useMessage from "@/components/UI/ToastMessage/useMessage";
import useProductStore from "@/store/ProductStore";
import helper from "@/helper";

type VoterInfo = {
  name: string;
  email: string;
  phone: string;
};

type RateData = RateFormData & VoterInfo;

interface RateModalProps extends ModalProps {
  lang: Lang;
  productId: string;
}

const RateModal: FC<RateModalProps> = ({
  sizes = "sm",
  color = "green",
  lang,
  productId,
  onCancel,
  ...restProps
}) => {
  const messageApi = useMessage();

  const form = useFormStore((state) => state.form);

  const auth = useAuthStore((state) => state.auth);

  const setProduct = useProductStore((state) => state.setProduct);

  const { query } = useRouter();

  const { loading, call: onRate } = useAsync(createRate);

  const [point, setPoint] = useState<number>(0);

  const { info } = auth;

  const initialData: RateData = {
    name: info?.fullName ?? "",
    phone: info?.phone ?? "",
    email: info?.email ?? "",
    userId: info?.id ?? "",
    productId,
    point,
    note: "",
  };

  const handleSelectPoint = (point: number) => setPoint(point);

  const handleSubmit = async (formData: RateData) => {
    const { point, userId, productId, note } = formData;
    const requestData: RateFormData = { point, userId, productId, note };
    const rateResponse = await onRate(requestData);
    if (!rateResponse.success) {
      if (helper.isAbort(rateResponse)) return;
      return messageApi.error(lang.common.message.error.api);
    }
    const productRespone = await getProduct({ productId, langCode: query.langCode as ELang });
    setProduct(productRespone.data);
    onCancel?.();
    messageApi.success(lang.common.message.success.rate);
  };

  return (
    <Modal
      {...restProps}
      sizes={sizes}
      color={color}
      head={lang.pageComponent.rate.modalTitle}
      okButtonProps={{ type: "submit", loading, disabled: loading }}
      onOk={form?.handleSubmit}
      onCancel={onCancel}
    >
      <RateRange onSelectPoint={handleSelectPoint} />

      <Divider />

      <Form<RateData> disabled={loading} initialData={initialData} onFinish={handleSubmit}>
        <FormItem name="name" disabled>
          <Input label={lang.common.form.label.fullName} />
        </FormItem>
        <FormItem name="phone" disabled>
          <Input label={lang.common.form.label.phone} />
        </FormItem>
        <FormItem name="email" disabled>
          <Input label={lang.common.form.label.email} />
        </FormItem>
        <FormItem name="note">
          <TextArea rows={3} label={lang.common.form.label.note} />
        </FormItem>
      </Form>
    </Modal>
  );
};

export default RateModal;
