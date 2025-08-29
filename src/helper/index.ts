import { ApiResponse } from "@/services/type";

const helper = {
  isAbort(response: ApiResponse<any>) {
    return response.error?.status === 0
  },
};

export default helper;
