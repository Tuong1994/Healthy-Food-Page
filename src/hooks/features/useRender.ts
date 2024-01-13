import React from "react";

const useRender = (trigger: boolean, time = 300) => {
  const [render, setRender] = React.useState<boolean>(false);

  const debouncedSetRender = React.useCallback(
    (value: boolean) => {
      const timeout = setTimeout(() => setRender(value), time);
      return () => clearTimeout(timeout);
    },
    [time]
  );

  React.useEffect(() => {
    if (!render && trigger) setRender(true);
    else if (render && !trigger) debouncedSetRender(false);
  }, [trigger, render, debouncedSetRender]);

  return render;
};

export default useRender;
