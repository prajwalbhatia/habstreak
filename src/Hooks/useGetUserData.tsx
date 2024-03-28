import { useSelector } from "react-redux";

const useGetUserData = () => {
  const authData = useSelector((state: any) => state.authDataStore);

  return { user :  authData};
};

export default useGetUserData;
