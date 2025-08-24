import { useEffect, useState } from "react";
import { GetServerSideProps, NextPage } from "next";
import { Breadcrumb, Tabs, Grid, Typography } from "@/components/UI";
import type { BreadcrumbItems } from "@/components/UI/Breadcrumb/type";
import type { TabsItems } from "@/components/UI/Tabs/type";
import type { ApiQuery, ApiResponse, List } from "@/services/type";
import type { User } from "@/services/user/type";
import type { City } from "@/services/city/type";
import type { District } from "@/services/district/type";
import type { Ward } from "@/services/ward/type";
import type { Auth } from "@/services/auth/type";
import { ELang } from "@/common/enum";
import { getCities } from "@/services/city/api";
import { getUser } from "@/services/user/api";
import { getDistricts } from "@/services/district/api";
import { getWards } from "@/services/ward/api";
import { useAppGrid } from "@/components/UI/Grid/Provider";
import { useLang, useMounted } from "@/hooks";
import { defaultApiResponse } from "@/services";
import Link from "next/link";
import UserInfo from "@/features/user/components/UserInfo";
import UserOrder from "@/features/user/components/UserOrder";
import UserComment from "@/features/user/components/UserComment";
import UserRate from "@/features/user/components/UserRate";
import UserEdit from "@/features/user/components/UserEdit";
import UserEditMobile from "@/features/user/components/Mobile/UserEditMobile";
import UserForm from "@/features/user/components/UserForm";
import UserPasswordModal from "@/features/user/components/UserPasswordModal";
import ProtectedRoute from "@/components/Page/ProtectedRoute";
import NoDataError from "@/components/Page/Error/NoDataError";
import localStorageKey from "@/common/constant/storage";
import useLocationStore from "@/store/LocationStore";
import useMessage from "@/components/UI/ToastMessage/useMessage";
import useAuthStore from "@/store/AuthStore";
import url from "@/common/constant/url";

const { HOME } = url;

const { Row, Col } = Grid;

const { Title } = Typography;

interface UserProps {
  userResponse: ApiResponse<User>;
  citiesResponse: ApiResponse<List<City>>;
  districtsResponse: ApiResponse<List<District>>;
  wardsResponse: ApiResponse<List<Ward>>;
}

const User: NextPage<UserProps> = ({ userResponse, citiesResponse, districtsResponse, wardsResponse }) => {
  const messageApi = useMessage();

  const { locale, lang } = useLang();

  const { isPhone } = useAppGrid();

  const isMounted = useMounted();

  const { success: userResponseSuccess, data: userData } = userResponse;

  const [setCities, setDistricts, setWards] = useLocationStore((state) => [
    state.setCities,
    state.setDistricts,
    state.setWards,
  ]);

  const [auth, setAuth] = useAuthStore((state) => [state.auth, state.setAuth]);

  const [user, setUser] = useState<User>(userData);

  const [selectedTab, setSelectedTab] = useState<string>("order");

  const [isEdit, setIsEdit] = useState<boolean>(false);

  const [isMobileEdit, setIsMobileEdit] = useState<boolean>(false);

  const [openPassword, setOpenPassword] = useState<boolean>(false);

  const items: BreadcrumbItems = [
    {
      id: "1",
      label: <Link href={{ pathname: HOME, query: { langCode: locale } }}>{lang.common.menu.home}</Link>,
    },
    { id: "2", label: user.fullName ?? "Customer", actived: true },
  ];

  const tabs: TabsItems = [
    { id: "order", title: lang.user.order.title, content: <UserOrder selectedTab={selectedTab} /> },
    {
      id: "comment",
      title: lang.user.comment.title,
      content: <UserComment lang={lang} selectedTab={selectedTab} />,
    },
    {
      id: "rate",
      title: lang.user.rate.title,
      content: <UserRate lang={lang} selectedTab={selectedTab} />,
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
    if (!wardsResponse.success) return;
    setWards(wardsResponse.data.items);
  }, [wardsResponse]);

  const onReFetchUser = async () => {
    const apiQuery: ApiQuery = { userId: user.id, langCode: locale };
    const response = await getUser(apiQuery);
    if (!response.success) return messageApi.error(lang.common.message.error.api);
    const updateAuth: Auth = { ...auth, info: response.data };
    localStorage.setItem(localStorageKey.AUTH, JSON.stringify(updateAuth));
    setAuth(updateAuth);
    setUser(response.data);
  };

  const handleSelectTab = (id: string) => setSelectedTab(id);

  const handleEdit = () => (!isPhone ? setIsEdit(!isEdit) : setIsMobileEdit(!isMobileEdit));

  const handlePassword = () => setOpenPassword(!openPassword);

  const renderContent = () => {
    if (!userResponseSuccess) return <NoDataError />;
    const formProps = {
      lang,
      user,
      onReFetchUser,
      handleOpenPassword: handlePassword,
    };
    return (
      <Row justify="between">
        <Col xs={24} md={24} lg={8} span={8}>
          <UserInfo lang={lang} user={user} handleOpenEdit={handleEdit} />
        </Col>
        <Col xs={24} md={24} lg={16} span={16}>
          {!isEdit ? (
            <Tabs color="green" items={tabs} onSelectTab={handleSelectTab} />
          ) : (
            !isPhone && (
              <UserEdit lang={lang} handleCloseEdit={handleEdit}>
                <UserForm {...formProps} />
              </UserEdit>
            )
          )}
          {isPhone && (
            <UserEditMobile open={isMobileEdit} onClose={handleEdit}>
              <UserForm {...formProps} />
            </UserEditMobile>
          )}
        </Col>
      </Row>
    );
  };

  if (!isMounted) return null;

  return (
    <ProtectedRoute>
      <div className="page user">
        <Breadcrumb items={items} />
        <Title>{lang.user.title}</Title>
        {renderContent()}
        <UserPasswordModal lang={lang} open={openPassword} onCancel={handlePassword} />
      </div>
    </ProtectedRoute>
  );
};

export default User;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { query } = context;

  const apiUserQuery: ApiQuery = { userId: query.id as string, langCode: query.langCode as ELang };
  const apiLocationQuery: ApiQuery = { langCode: query.langCode as ELang };

  const userResponse = await getUser(apiUserQuery);
  const citiesResponse = await getCities(apiLocationQuery);

  let districtsResponse = defaultApiResponse<List<District>>();
  let wardsResponse = defaultApiResponse<List<Ward>>();

  if (userResponse.success) {
    const { data: user } = userResponse;
    const { address } = user;
    if (address) {
      districtsResponse = await getDistricts({ ...apiLocationQuery, cityCode: String(address.cityCode) });
      wardsResponse = await getWards({ ...apiLocationQuery, districtCode: String(address.districtCode) });
    }
  }

  if (!Boolean(query.id)) {
    return {
      redirect: {
        destination: "/auth/signIn",
        permanent: false,
      },
    };
  }

  return {
    props: {
      userResponse,
      citiesResponse,
      districtsResponse,
      wardsResponse,
    },
  };
};
