import { FC, Fragment, useState, useRef } from "react";
import { Space, Button, Divider, Grid, Tooltip } from "@/components/UI";
import { Form, FormItem, Upload, Input, InputPhone, Select, DatePicker } from "@/components/Control";
import { HiOutlineXCircle } from "react-icons/hi";
import type { Lang } from "@/common/type";
import type { GridRowProps } from "@/components/UI/Grid/Row";
import type { GridColProps } from "@/components/UI/Grid/Col";
import type { User, UserFormData } from "@/services/user/type";
import type { City } from "@/services/city/type";
import type { District } from "@/services/district/type";
import type { Ward } from "@/services/ward/type";
import type { ApiQuery, List } from "@/services/type";
import type { SelectRef } from "@/components/Control/type";
import { ELang } from "@/common/enum";
import { getWards } from "@/services/ward/api";
import { getDistricts } from "@/services/district/api";
import { updateUser } from "@/services/user/api";
import { useRouter } from "next/router";
import { useAsync, useRule, useSelectOption } from "@/hooks";
import useLocationStore from "@/store/LocationStore";
import useMessage from "@/components/UI/ToastMessage/useMessage";
import utils from "@/utils";

const { Row, Col } = Grid;

const { ImageUpload } = Upload;

const { SingleImageUpload } = ImageUpload;

interface UserFormProps {
  lang: Lang;
  user: User;
  onReFetchUser: () => void;
  handleOpenPassword: () => void;
}

const UserForm: FC<UserFormProps> = ({ lang, user, onReFetchUser, handleOpenPassword }) => {
  const messageApi = useMessage();

  const { gender } = useSelectOption();

  const { query } = useRouter();

  const { common, phone } = useRule();

  const hasAddress = Boolean(user.address);

  const [cities, districts, wards, setDistricts, setWards] = useLocationStore((state) => [
    state.cities,
    state.districts,
    state.wards,
    state.setDistricts,
    state.setWards,
  ]);

  const [showMore, setShowMore] = useState<boolean>(hasAddress);

  const [image, setImage] = useState<File | null>(null);

  const [districtsEmpty, setDistrictsEmpty] = useState<string>(lang.user.form.select.districtsEmpty);

  const [wardsEmpty, setWardsEmpty] = useState<string>(lang.user.form.select.wardsEmpty);

  const selectDistrictsRef = useRef<SelectRef>(null);

  const selectWardsRef = useRef<SelectRef>(null);

  const { loading: districtsLoading, call: onGetDistricts } = useAsync<List<District>>(getDistricts);

  const { loading: wardsLoading, call: onGetWards } = useAsync<List<Ward>>(getWards);

  const { loading: updateLoading, call: onUpdate } = useAsync(updateUser);

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

  const initialData: UserFormData = {
    email: user.email ?? "",
    firstName: user.firstName ?? "",
    lastName: user.lastName ?? "",
    phone: user.phone ?? "",
    gender: user.gender ?? null,
    birthday: user.birthday ? new Date(user.birthday) : new Date(),
    role: user.role ?? null,
    address: {
      addressEn: user.address?.addressVn ?? "",
      addressVn: user.address?.addressEn ?? "",
      cityCode: user.address?.cityCode ?? 0,
      districtCode: user.address?.districtCode ?? 0,
      wardCode: user.address?.wardCode ?? 0,
    },
  };

  const handleShowMore = () => setShowMore(!showMore);

  const handleSelectCity = async (cityCode: any) => {
    selectDistrictsRef.current?.onResetInput();
    selectWardsRef.current?.onResetInput();

    setDistrictsEmpty(lang.user.form.select.districtsEmpty);
    setWardsEmpty(lang.user.form.select.wardsEmpty);
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
    selectWardsRef.current?.onResetInput();

    setWardsEmpty(lang.user.form.select.wardsEmpty);
    setWards([]);

    const apiQuery: ApiQuery = { districtCode, langCode: query.langCode as ELang };
    const response = await onGetWards(apiQuery);
    if (response.success) {
      setWards(response.data.items);
      setWardsEmpty("");
    }
  };

  const handleUpload = (file: File | null) => setImage(file);

  const handleSubmit = async (data: UserFormData) => {
    if (!showMore) delete data.address;
    const formData = new FormData();
    let key: keyof UserFormData;
    for (key in data) {
      if (key === "address") formData.append(key, JSON.stringify(data[key]));
      else formData.append(key, data[key] as string);
    }
    if (image) formData.append("image", image);
    const apiQuery: ApiQuery = { userId: user.id };
    const response = await onUpdate(apiQuery, formData);
    if (!response.success) return messageApi.error(lang.common.message.error.api);
    onReFetchUser();
    messageApi.success(lang.common.message.success.updateUser);
  };

  return (
    <Form<UserFormData>
      color="green"
      className="user-form"
      disabled={updateLoading}
      initialData={initialData}
      onFinish={handleSubmit}
    >
      <Row {...rowProps}>
        <Col xs={24} md={6} lg={6} span={4}>
          <Space justify="center">
            <SingleImageUpload defaultImageUrl={user.image?.path} onUpload={handleUpload} />
          </Space>
        </Col>
        <Col xs={24} md={18} lg={18} span={20}>
          <FormItem name="email" disabled>
            <Input label={lang.common.form.label.email} />
          </FormItem>
          <Button ghost color="red" type="button" onClick={handleOpenPassword}>
            {lang.user.form.action}
          </Button>
        </Col>
      </Row>

      <Divider>{lang.user.form.personal}</Divider>

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
          {lang.user.form.more}
        </button>
      )}

      {showMore && (
        <Fragment>
          <Divider>
            <Space align="middle">
              <span>{lang.user.form.location}</span>
              {!hasAddress && (
                <Tooltip label={lang.user.form.close} color="green" placement="right">
                  <button className="form-showmore form-showmore-close" onClick={handleShowMore}>
                    <HiOutlineXCircle size={18} />
                  </button>
                </Tooltip>
              )}
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

export default UserForm;
