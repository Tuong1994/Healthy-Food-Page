import { FC, Fragment, useState } from "react";
import { Space, Button, Divider, Grid } from "@/components/UI";
import { Form, FormItem, Upload, Input, InputPhone, Select, DatePicker } from "@/components/Control";
import type { Lang } from "@/common/type";
import type { GridRowProps } from "@/components/UI/Grid/Row";
import type { GridColProps } from "@/components/UI/Grid/Col";
import type { Customer, CustomerFormData } from "@/services/customer/type";
import { EGender, ERole } from "@/services/customer/enum";
import { HiOutlineXCircle } from "react-icons/hi";
import { useSelectOption } from "@/hooks";

const { Row, Col } = Grid;

const { ImageUpload } = Upload;

const { SingleImageUpload } = ImageUpload;

interface CustomerFormProps {
  lang: Lang;
  customer: Customer;
  handleOpenPassword: () => void;
}

const CustomerForm: FC<CustomerFormProps> = ({ lang, customer, handleOpenPassword }) => {
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

  const initialData: CustomerFormData = {
    email: customer.email ?? "",
    firstName: customer.firstName ?? "",
    lastName: customer.lastName ?? "",
    phone: customer.phone ?? "",
    gender: customer.gender ?? undefined,
    birthday: new Date(customer.birthday ?? ""),
    role: customer.role ?? undefined,
    address: {
      addressEn: customer.address?.addressVn ?? "",
      addressVn: customer.address?.addressEn ?? "",
      cityCode: customer.address?.cityCode ?? undefined,
      districtCode: customer.address?.districtCode ?? undefined,
      wardCode: customer.address?.wardCode ?? undefined,
    },
  };

  const handleShowMore = () => setShowMore(!showMore);

  const handleSubmit = async (formData: CustomerFormData) => {
    console.log(formData);
  };

  return (
    <Form<Customer> color="green" initialData={initialData} className="customer-form" onFinish={handleSubmit}>
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
            {lang.customer.form.action}
          </Button>
        </Col>
      </Row>

      <Divider>{lang.customer.form.personal}</Divider>

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
        <button className="form-showmore" onClick={handleShowMore}>
          {lang.customer.form.more}
        </button>
      )}

      {showMore && (
        <Fragment>
          <Divider>
            <Space align="middle">
              <span>{lang.customer.form.location}</span>
              <button className="form-showmore form-showmore-close" onClick={handleShowMore}>
                <HiOutlineXCircle size={16} />
              </button>
            </Space>
          </Divider>

          <Row {...rowProps}>
            <Col {...colProps}>
              <FormItem name="address.addressEn">
                <Input label={lang.common.form.label.address_en} />
              </FormItem>
            </Col>
            <Col {...colProps}>
              <FormItem name="address.addressVn">
                <Input label={lang.common.form.label.address_vn} />
              </FormItem>
            </Col>
          </Row>

          <Row {...rowProps}>
            <Col xs={24} md={8} lg={8} span={8}>
              <FormItem name="address.cityCode">
                <Select label={lang.common.form.label.city} />
              </FormItem>
            </Col>
            <Col xs={24} md={8} lg={8} span={8}>
              <FormItem name="address.districtCode">
                <Select label={lang.common.form.label.district} />
              </FormItem>
            </Col>
            <Col xs={24} md={8} lg={8} span={8}>
              <FormItem name="address.wardCode">
                <Select label={lang.common.form.label.ward} />
              </FormItem>
            </Col>
          </Row>
        </Fragment>
      )}
      <Space justify="end">
        <Button>{lang.common.actions.save}</Button>
      </Space>
    </Form>
  );
};

export default CustomerForm;
