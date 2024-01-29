import { useEffect, useState } from "react";
import { GetServerSideProps, NextPage } from "next";
import { Breadcrumb, Tabs, Grid } from "@/components/UI";
import type { BreadcrumbItems } from "@/components/UI/Breadcrumb/type";
import type { TabsItems } from "@/components/UI/Tabs/type";
import type { ApiQuery, ApiResponse, List } from "@/services/type";
import type { Customer } from "@/services/customer/type";
import type { City } from "@/services/city/type";
import type { District } from "@/services/district/type";
import type { Ward } from "@/services/ward/type";
import { ELang } from "@/common/enum";
import { getCities } from "@/services/city/api";
import { getCustomer } from "@/services/customer/api";
import { getDistricts } from "@/services/district/api";
import { getWards } from "@/services/ward/api";
import { useAppGrid } from "@/components/UI/Grid/Provider";
import { useLang, useMounted } from "@/hooks";
import { defaultApiResponse } from "@/services";
import Link from "next/link";
import CustomerInfo from "@/features/customer/CustomerInfo";
import CustomerOrder from "@/features/customer/CustomerOrder";
import CustomerComment from "@/features/customer/CustomerComment";
import CustomerRate from "@/features/customer/CustomerRate";
import CustomerEdit from "@/features/customer/CustomerEdit";
import CustomerEditMobile from "@/features/customer/Mobile/CustomerEditMobile";
import CustomerForm from "@/features/customer/CustomerForm";
import CustomerPasswordModal from "@/features/customer/CustomerPasswordModal";
import NoDataError from "@/components/Page/Error/NoDataError";
import useLocationStore from "@/store/LocationStore";
import useMessage from "@/components/UI/ToastMessage/useMessage";
import url from "@/common/constant/url";

const { HOME } = url;

const { Row, Col } = Grid;

interface CustomerProps {
  customerResponse: ApiResponse<Customer>;
  citiesResponse: ApiResponse<List<City>>;
  districtsResponse: ApiResponse<List<District>>;
  wardsResponse: ApiResponse<List<Ward>>;
}

const Customer: NextPage<CustomerProps> = ({
  customerResponse,
  citiesResponse,
  districtsResponse,
  wardsResponse,
}) => {
  const messageApi = useMessage();

  const { locale, lang } = useLang();

  const { isPhone } = useAppGrid();

  const isMounted = useMounted();

  const { success, data } = customerResponse;

  const [setCities, setDistricts, setWards] = useLocationStore((state) => [
    state.setCities,
    state.setDistricts,
    state.setWards,
  ]);

  const [customer, setCustomer] = useState<Customer>(data);

  const [selectedTab, setSelectedTab] = useState<string>("order");

  const [isEdit, setIsEdit] = useState<boolean>(false);

  const [isMobileEdit, setIsMobileEdit] = useState<boolean>(false);

  const [openPassword, setOpenPassword] = useState<boolean>(false);

  const items: BreadcrumbItems = [
    {
      id: "1",
      label: <Link href={{ pathname: HOME, query: { langCode: locale } }}>{lang.common.menu.home}</Link>,
    },
    { id: "2", label: "User name", actived: true },
  ];

  const tabs: TabsItems = [
    { id: "order", title: lang.customer.order.title, content: <CustomerOrder selectedTab={selectedTab} /> },
    {
      id: "comment",
      title: lang.customer.comment.title,
      content: <CustomerComment lang={lang} selectedTab={selectedTab} />,
    },
    {
      id: "rate",
      title: lang.customer.rate.title,
      content: <CustomerRate lang={lang} selectedTab={selectedTab} />,
    },
  ];

  useEffect(() => {
    if (!citiesResponse.success) return;
    setCities(citiesResponse.data.items);
  }, [citiesResponse]);

  useEffect(() => {
    if (!districtsResponse.success) return;
    setDistricts(districtsResponse.data.items);
  }, [districtsResponse]);

  useEffect(() => {
    if (!wardsResponse) return;
    setWards(wardsResponse.data.items);
  }, [wardsResponse]);

  const onReFetchCustomer = async () => {
    const apiQuery: ApiQuery = { customerId: customer.id, langCode: locale };
    const response = await getCustomer(apiQuery);
    if (!response.success) return messageApi.error(lang.common.message.error.api);
    setCustomer(response.data);
  };

  const handleSelectTab = (id: string) => setSelectedTab(id);

  const handleEdit = () => (!isPhone ? setIsEdit(!isEdit) : setIsMobileEdit(!isMobileEdit));

  const handlePassword = () => setOpenPassword(!openPassword);

  const renderContent = () => {
    if (!success) return <NoDataError />;
    const formProps = {
      lang,
      customer,
      onReFetchCustomer,
      handleOpenPassword: handlePassword,
    };
    return (
      <Row justify="between">
        <Col xs={24} md={24} lg={8} span={8}>
          <CustomerInfo lang={lang} customer={customer} handleOpenEdit={handleEdit} />
        </Col>
        <Col xs={24} md={24} lg={16} span={16}>
          {!isEdit ? (
            <Tabs color="green" items={tabs} onSelectTab={handleSelectTab} />
          ) : (
            !isPhone && (
              <CustomerEdit lang={lang} handleCloseEdit={handleEdit}>
                <CustomerForm {...formProps} />
              </CustomerEdit>
            )
          )}
          {isPhone && (
            <CustomerEditMobile open={isMobileEdit} onClose={handleEdit}>
              <CustomerForm {...formProps} />
            </CustomerEditMobile>
          )}
        </Col>
      </Row>
    );
  };

  if (!isMounted) return null;

  return (
    <div className="page customer">
      <Breadcrumb items={items} />
      {renderContent()}
      <CustomerPasswordModal lang={lang} open={openPassword} onCancel={handlePassword} />
    </div>
  );
};

export default Customer;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { query } = context;

  const apiCustomerQuery: ApiQuery = { customerId: query.id as string, langCode: query.langCode as ELang };
  const apiLocationQuery: ApiQuery = { langCode: query.langCode as ELang };

  const customerResponse = await getCustomer(apiCustomerQuery);
  const citiesResponse = await getCities(apiLocationQuery);

  let districtsResponse = defaultApiResponse<List<District>>();
  let wardsResponse = defaultApiResponse<List<Ward>>();

  if (customerResponse.success) {
    const { data: customer } = customerResponse;
    const { address } = customer;
    districtsResponse = await getDistricts({ ...apiLocationQuery, cityCode: String(address?.cityCode) });
    wardsResponse = await getWards({ ...apiLocationQuery, districtCode: String(address?.districtCode) });
  }
  return {
    props: {
      customerResponse,
      citiesResponse,
      districtsResponse,
      wardsResponse,
    },
  };
};
