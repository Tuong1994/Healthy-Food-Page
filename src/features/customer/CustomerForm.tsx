import { FC, Fragment, useState, useRef } from "react";
import { Space, Button, Divider, Grid } from "@/components/UI";
import { Form, FormItem, Upload, Input, InputPhone, Select, DatePicker } from "@/components/Control";
import { HiOutlineXCircle } from "react-icons/hi";
import type { Lang } from "@/common/type";
import type { GridRowProps } from "@/components/UI/Grid/Row";
import type { GridColProps } from "@/components/UI/Grid/Col";
import type { Customer, CustomerFormData } from "@/services/customer/type";
import type { City } from "@/services/city/type";
import type { District } from "@/services/district/type";
import type { Ward } from "@/services/ward/type";
import type { ApiQuery } from "@/services/type";
import type { SelectRef } from "@/components/Control/type";
import { ELang } from "@/common/enum";
import { getWards } from "@/services/ward/api";
import { getDistricts } from "@/services/district/api";
import { updateCustomer } from "@/services/customer/api";
import { useRouter } from "next/router";
import { useAsync, useRule, useSelectOption } from "@/hooks";
import useLocationStore from "@/store/LocationStore";
import useMessage from "@/components/UI/ToastMessage/useMessage";
import utils from "@/utils";

const { Row, Col } = Grid;

const { ImageUpload } = Upload;

const { SingleImageUpload } = ImageUpload;

interface CustomerFormProps {
  lang: Lang;
  customer: Customer;
  onReFetchCustomer: () => void;
  handleOpenPassword: () => void;
}

const CustomerForm: FC<CustomerFormProps> = ({ lang, customer, onReFetchCustomer, handleOpenPassword }) => {
  const messageApi = useMessage();

  const { gender } = useSelectOption();

  const { query } = useRouter();

  const { common, phone } = useRule();

  const [cities, districts, wards, setDistricts, setWards] = useLocationStore((state) => [
    state.cities,
    state.districts,
    state.wards,
    state.setDistricts,
    state.setWards,
  ]);

  const [showMore, setShowMore] = useState<boolean>(false);

  const [image, setImage] = useState<File | null>(null);

  const [districtsEmpty, setDistrictsEmpty] = useState<string>("");

  const [wardsEmpty, setWardsEmpty] = useState<string>("");

  const selectDistrictsRef = useRef<SelectRef>(null);

  const selectWardsRef = useRef<SelectRef>(null);

  const { loading: districtsLoading, call: onGetDistricts } = useAsync(getDistricts);

  const { loading: wardsLoading, call: onGetWards } = useAsync(getWards);

  const { loading: updateLoading, call: onUpdate } = useAsync(updateCustomer);

  const citiesOptions = utils.mapDataToOptions<City>(cities, "name", "code");

  const districtsOptions = utils.mapDataToOptions<District>(districts, "name", "code");

  const wardsOptions = utils.mapDataToOptions<Ward>(wards, "name", "code");

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
    gender: customer.gender ?? null,
    birthday: new Date(customer.birthday ?? ""),
    role: customer.role ?? null,
    address: {
      addressEn: customer.address?.addressVn ?? "",
      addressVn: customer.address?.addressEn ?? "",
      cityCode: customer.address?.cityCode ?? 0,
      districtCode: customer.address?.districtCode ?? 0,
      wardCode: customer.address?.wardCode ?? 0,
    },
  };

  const handleShowMore = () => setShowMore(!showMore);

  const handleSelectCity = async (cityCode: any) => {
    selectDistrictsRef.current?.onResetInput();
    selectWardsRef.current?.onResetInput();

    setDistrictsEmpty(lang.customer.form.select.districtsEmpty);
    setWardsEmpty(lang.customer.form.select.wardsEmpty);
    setDistricts([]);
    setWards([]);

    const apiQuery: ApiQuery = { cityCode, langCode: query.langCode as ELang };
    const response = await onGetDistricts(apiQuery);
    if (response.success) {
      setDistricts(response.data.items);
      setDistrictsEmpty("");
    }
  };

  const handleSelectDistrict = async (districtCode: any) => {
    setWards([]);
    setWardsEmpty(lang.customer.form.select.wardsEmpty);
    selectWardsRef.current?.onResetInput();

    const apiQuery: ApiQuery = { districtCode, langCode: query.langCode as ELang };
    const response = await onGetWards(apiQuery);
    if (response.success) {
      setWards(response.data.items);
      setWardsEmpty("");
    }
  };

  const handleUpload = (file: File | null) => setImage(file);

  const handleSubmit = async (data: CustomerFormData) => {
    const formData = new FormData();
    let key: keyof CustomerFormData;
    for (key in data) {
      if (key === "address") formData.append(key, JSON.stringify(data[key]));
      else formData.append(key, data[key] as string);
    }
    if (image) formData.append("image", image);
    const apiQuery: ApiQuery = { customerId: customer.id };
    const response = await onUpdate(apiQuery, formData);
    if (!response.success) return messageApi.error(lang.common.message.error.api);
    onReFetchCustomer();
    messageApi.success(lang.common.message.success.updateCustomer);
  };

  return (
    <Form<Customer> color="green" initialData={initialData} className="customer-form" onFinish={handleSubmit}>
      <Row {...rowProps}>
        <Col xs={24} md={6} lg={6} span={6}>
          <Space justify="center">
            <SingleImageUpload defaultImageUrl={customer.image?.path} onUpload={handleUpload} />
          </Space>
        </Col>
        <Col xs={24} md={18} lg={18} span={18}>
          <FormItem name="email" disabled>
            <Input label={lang.common.form.label.email} />
          </FormItem>
          <Button ghost color="red" type="button" onClick={handleOpenPassword}>
            {lang.customer.form.action}
          </Button>
        </Col>
      </Row>

      <Divider>{lang.customer.form.personal}</Divider>

      <Row {...rowProps}>
        <Col {...colProps}>
          <FormItem name="firstName" rules={common()}>
            <Input required label={lang.common.form.label.firstName} />
          </FormItem>
        </Col>
        <Col {...colProps}>
          <FormItem name="lastName" rules={common()}>
            <Input required label={lang.common.form.label.lastName} />
          </FormItem>
        </Col>
      </Row>

      <Row {...rowProps}>
        <Col {...colProps}>
          <FormItem name="phone" rules={phone().concat(common())}>
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
              <FormItem name="address.addressEn" rules={showMore ? common() : undefined}>
                <Input required label={lang.common.form.label.address_en} />
              </FormItem>
            </Col>
            <Col {...colProps}>
              <FormItem name="address.addressVn" rules={showMore ? common() : undefined}>
                <Input required label={lang.common.form.label.address_vn} />
              </FormItem>
            </Col>
          </Row>

          <Row {...rowProps}>
            <Col xs={24} md={8} lg={8} span={8}>
              <FormItem name="address.cityCode" rules={showMore ? common() : undefined}>
                <Select
                  async
                  required
                  options={citiesOptions}
                  label={lang.common.form.label.city}
                  onChangeSelect={handleSelectCity}
                />
              </FormItem>
            </Col>
            <Col xs={24} md={8} lg={8} span={8}>
              <FormItem name="address.districtCode" rules={showMore ? common() : undefined}>
                <Select
                  async
                  required
                  ref={selectDistrictsRef}
                  loading={districtsLoading}
                  options={districtsOptions}
                  emptyContent={districtsEmpty}
                  label={lang.common.form.label.district}
                  onChangeSelect={handleSelectDistrict}
                />
              </FormItem>
            </Col>
            <Col xs={24} md={8} lg={8} span={8}>
              <FormItem name="address.wardCode" rules={showMore ? common() : undefined}>
                <Select
                  async
                  required
                  ref={selectWardsRef}
                  loading={wardsLoading}
                  options={wardsOptions}
                  emptyContent={wardsEmpty}
                  label={lang.common.form.label.ward}
                />
              </FormItem>
            </Col>
          </Row>
        </Fragment>
      )}
      <Space justify="end">
        <Button loading={updateLoading}>{lang.common.actions.save}</Button>
      </Space>
    </Form>
  );
};

export default CustomerForm;
