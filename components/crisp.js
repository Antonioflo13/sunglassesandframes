import { Crisp } from "crisp-sdk-web";
import { useEffect } from "react";
const CrispAssistance = () => {
  useEffect(() => {
    Crisp.configure(process.env.NEXT_PUBLIC_CRISP_ID_SITE);
  }, []);
  return <></>;
};

export default CrispAssistance;
