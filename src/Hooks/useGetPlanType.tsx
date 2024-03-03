import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { planDetail } from "Utilities";

const useGetPlanType = () => {
  const authData = useSelector((state: any) => state.authDataStore);

  const [planType, setPlanType] = useState<string>("");

  useEffect(() => {
    if (authData) setPlanType(planDetail(authData?.planType));
  }, [authData]);

  return planType;
};

export default useGetPlanType;
