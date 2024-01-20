import { FC, Fragment, useState } from "react";
import { Space, Modal, Button, Divider, Grid } from "@/components/UI";
import { Form, FormItem, Upload, Input, InputPhone, Select, DatePicker } from "@/components/Control";
import type { Lang } from "@/common/type";
import type { ModalProps } from "@/components/UI/Modal";
import type { GridRowProps } from "@/components/UI/Grid/Row";
import type { GridColProps } from "@/components/UI/Grid/Col";
import type { Customer } from "@/services/customer/type";
import { EGender, ERole } from "@/services/customer/enum";
import { useSelectOption } from "@/hooks";

const { Row, Col } = Grid;

const { ImageUpload } = Upload;

const { SingleImageUpload } = ImageUpload;

interface CustomerFormModalProps extends ModalProps {
  lang: Lang;
  handleOpenPassword: () => void;
}

const CustomerFormModal: FC<CustomerFormModalProps> = ({ lang, handleOpenPassword, ...restProps }) => {
  const { gender } = useSelectOption();

  const [showMore, setShowMore] = useState<boolean>(false);

  const rowProps: GridRowProps = {
    gutters: [5, 5],
    justify: "between",
  };

  const colProps: GridColProps = {
    xs: 24,
    md: 12,
    lg: 12,
    span: 12,
  };

  const initialData: Customer = {
    email: "jack@example.com",
    firstName: "Jack",
    lastName: "Williams",
    phone: "0793229970",
    gender: EGender.MALE,
    birthday: new Date("1994-11-28"),
    address_en: "79/24/13 Au Co str",
    address_vn: "79/24/13 Au Co",
    cityCode: 0,
    districtCode: 0,
    wardCode: 0,
    role: ERole.CUSTOMER,
  };

  const handleShowMore = () => setShowMore(!showMore);

  return (
    <Modal
      color="green"
      rootClassName="customer-modal"
      head={lang.customer.modal.title}
      okButtonTitle={lang.common.actions.save}
      {...restProps}
    >
      <Form<Customer> color="green" initialData={initialData}>
        <Row {...rowProps}>
          <Col xs={24} md={6} lg={6} span={6}>
            <Space justify="center">
              <SingleImageUpload />
            </Space>
          </Col>
          <Col xs={24} md={18} lg={18} span={18}>
            <FormItem name="email" disabled>
              <Input label={lang.common.form.label.email} />
            </FormItem>
            <Button ghost color="red" onClick={handleOpenPassword}>
              {lang.customer.modal.action}
            </Button>
          </Col>
        </Row>

        <Divider>{lang.customer.modal.personal}</Divider>

        <Row {...rowProps}>
          <Col {...colProps}>
            <FormItem name="firstName">
              <Input required label={lang.common.form.label.firstName} />
            </FormItem>
          </Col>
          <Col {...colProps}>
            <FormItem name="lastName">
              <Input required label={lang.common.form.label.lastName} />
            </FormItem>
          </Col>
        </Row>

        <Row {...rowProps}>
          <Col {...colProps}>
            <FormItem name="phone">
              <InputPhone required label={lang.common.form.label.phone} />
            </FormItem>
          </Col>
          <Col {...colProps}>
            <FormItem name="gender">
              <Select optional options={gender} label={lang.common.form.label.gender} />
            </FormItem>
          </Col>
        </Row>

        <Row {...rowProps}>
          <Col {...colProps}>
            <FormItem name="birthday">
              <DatePicker optional label={lang.common.form.label.birthday} />
            </FormItem>
          </Col>
        </Row>

        {!showMore && (
          <button className="modal-showmore" onClick={handleShowMore}>
            {lang.customer.modal.more}
          </button>
        )}

        {showMore && (
          <Fragment>
            <Divider>
              <Space align="middle">
                <span>{lang.customer.modal.location}</span>
                <button className="modal-showmore" onClick={handleShowMore}>
                  ({lang.customer.modal.close})
                </button>
              </Space>
            </Divider>

            <Row {...rowProps}>
              <Col {...colProps}>
                <FormItem name="address_en">
                  <Input label={lang.common.form.label.address_en} />
                </FormItem>
              </Col>
              <Col {...colProps}>
                <FormItem name="address_vn">
                  <Input label={lang.common.form.label.address_vn} />
                </FormItem>
              </Col>
            </Row>

            <Row {...rowProps}>
              <Col xs={24} md={8} lg={8} span={8}>
                <FormItem name="cityCode">
                  <Select label={lang.common.form.label.city} />
                </FormItem>
              </Col>
              <Col xs={24} md={8} lg={8} span={8}>
                <FormItem name="districtCode">
                  <Select label={lang.common.form.label.district} />
                </FormItem>
              </Col>
              <Col xs={24} md={8} lg={8} span={8}>
                <FormItem name="wardCode">
                  <Select label={lang.common.form.label.ward} />
                </FormItem>
              </Col>
            </Row>
          </Fragment>
        )}
      </Form>
    </Modal>
  );
};

export default CustomerFormModal;
