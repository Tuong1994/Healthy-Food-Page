import { useEffect, useState } from "react";
import { connection } from "@/services/global/api";
import { HttpStatus } from "@/services/axios";

const useCheckConnection = () => {
  const [connected, setConnected] = useState<boolean>(true);

  const checkConnection = async () => {
    const response = await connection();
    if (!response.success) return setConnected(false);
    if (response.error?.status === HttpStatus.GATEWAY_TIME_OUT) return setConnected(false);
    setConnected(true);
  };

  useEffect(() => {
    checkConnection();
  }, []);

  return connected;
};

export default useCheckConnection;
