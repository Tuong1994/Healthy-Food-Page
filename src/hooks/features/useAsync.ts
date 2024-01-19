import React from "react";
import { ApiResponse } from "@/services/type";

const useAsync = <T>(func: (...params: any) => Promise<ApiResponse<T>>, dependencies = []) => {
  const [loading, setLoading] = React.useState(false);

  const call = React.useCallback(async (...params: any) => {
    setLoading(true);
    const response = (await func(...params)) as ApiResponse<T>;
    setLoading(false);
    return response;
  }, dependencies);

  return { loading, call };
};

export default useAsync;
