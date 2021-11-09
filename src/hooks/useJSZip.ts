// export type RootInstance = InstanceType<typeof RootS>;

import { useContext } from "react";
import { JsZipContext } from "../context/JsZipContext";

const useJSZip = () => {
  const jsZip = useContext(JsZipContext);
  if (jsZip === null) {
    throw new Error("JSZip 컨텍스트 프로바이더 내부에서만 사용할 수 있습니다.");
  }

  return jsZip;
};

export default useJSZip;
