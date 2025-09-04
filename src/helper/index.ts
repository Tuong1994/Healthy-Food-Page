import { ApiResponse } from "@/services/type";

const helper = {
  isAbort(response: ApiResponse<any>) {
    return response.error?.status === 0;
  },

  defaultPagingCollection() {
    return { totalItems: 0, page: 0, limit: 0, items: [] };
  },
};

export default helper;
