import { useNavigate } from "react-router-dom";
import { clearResults } from "../Redux/Slices/clearPersistSlice";
import { sendEventToMobile } from "Utilities";
import { useLogoutMutation } from "../Redux/Slices/accountSlice";
import store from "../Redux/Store/store";

declare var window: any;

const useLogout = (refreshToken: string) => {
  const navigate = useNavigate();
  const [logout, { error: logoutError, isLoading: logoutLoading }] =
    useLogoutMutation();

  const logoutFun = async (refreshToken: string) => {
    try {
      const logoutData: any = await logout({ refreshToken });

      if (logoutData?.data?.message === "You logged out successfully") {
        localStorage.clear();
        sessionStorage.clear();
        store.dispatch(clearResults());

        if (window.ReactNativeWebView) {
          navigate("/");
        } else {
          navigate("/");
        }

        if (window.ReactNativeWebView) sendEventToMobile("loggedOut");
      }
    } catch (error) {}
  };

  //   logoutFun(refreshToken);

  return { logUserOut: () => logoutFun(refreshToken), logoutError, logoutLoading };
};

export default useLogout;
