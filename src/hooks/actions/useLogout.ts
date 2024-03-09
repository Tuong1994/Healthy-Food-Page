import { ApiQuery } from "@/services/type";
import { useAsync, useLang } from "..";
import { HttpStatus } from "@/services/axios";
import { useRouter } from "next/router";
import { logout } from "@/services/auth/api";
import useMessage from "@/components/UI/ToastMessage/useMessage";
import useAuthStore from "@/store/AuthStore";
import url from "@/common/constant/url";

const { HOME } = url;

const useLogout = (userId: string) => {
  const messageApi = useMessage();

  const { lang } = useLang();

  const { query, pathname, push: routerPush, reload: routerReload } = useRouter();

  const { loading, call: onLogoutApi } = useAsync<any>(logout);

  const resetAuth = useAuthStore((state) => state.resetAuth);

  const onLogout = async () => {
    const apiQuery: ApiQuery = { userId };
    const response = await onLogoutApi(apiQuery);
    if (!response.success) {
      let message = lang.common.message.error.api;
      const status = response.error?.status;
      if (status === HttpStatus.FORBIDDEN) message = lang.common.message.error.logout;
      return messageApi.error(message);
    }
    messageApi.success(lang.common.message.success.logout);
    resetAuth();
    if (pathname === HOME) routerReload();
    setTimeout(() => routerPush({ pathname: HOME, query: { langCode: query.langCode } }), 200);
  };

  return { onLogout, loading };
};

export default useLogout;
