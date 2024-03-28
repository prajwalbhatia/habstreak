import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import size from "lodash/size";
import moment from "moment";
import ClipLoader from "react-spinners/ClipLoader";

import Frame from "Components/frame/frame";
import { OutlinedPrimaryButton } from "Components/buttons/buttons";

import {
  useGetUserQuery,
  useUpdateUserMutation,
} from "../../Redux/Slices/accountSlice";

import { usePaymentRequestMutation } from "../../Redux/Slices/paymentSlice";
import useGetPlanType from "Hooks/useGetPlanType";
import useSnackBar from "Hooks/useSnackBar";

import { ErrorBoundary } from "react-error-boundary";
import Fallback from "Utilities/fallback/fallback";

import { errorHandler } from "Utilities";

import { urls } from "Constants/index";
import { storeAuthData } from "../../Redux/Slices/authDataStoreSlice";

import "Styles/Pages/profile.scss";
import "index.scss";
import useGetUserData from "Hooks/useGetUserData";

declare var window: any;

function Profile(props: any) {
  const dispatch = useDispatch();

  const { user } = useGetUserData();
  const { data: userData, isLoading: userLoading } = useGetUserQuery(
    { email: user?.email },
    { skip: !user?.email }
  );

  const [paymentData, setPaymentData] = useState<any>({});

  const planType = useGetPlanType();
  const { SnackbarComponent, showSnackBar } = useSnackBar();

  const [updateUser, { isLoading: updateUserLoading }] =
    useUpdateUserMutation();

  const [paymentRequest, { isLoading: paymentLoading }] =
    usePaymentRequestMutation();

  useEffect(() => {
    if (userData) {
      dispatch(storeAuthData(userData));
    }
  }, [userData]);

  useEffect(() => {
    if (size(paymentData) > 0) {
      var options = {
        key:
          process.env.REACT_APP_ENV === "development"
            ? process.env.REACT_APP_RAZORPAY_KEY
            : process.env.REACT_APP_RAZORPAY_KEY_PROD,
        amount: paymentData.amount,
        currency: paymentData.currency,
        name: "Habstreak",
        description: "",
        // @ts-ignore
        image: `${urls[process.env.REACT_APP_API_MODE]}logo.svg`,
        order_id: paymentData.id,
        handler: async function (response: any) {
          let startTime = "";
          let endTime = "";

          if (userData?.startTime && userData?.endTime) {
            startTime = userData?.startTime;
            endTime = moment(userData?.endTime)
              .add(31, "days")
              .endOf("day")
              .format();
          } else {
            startTime = moment().startOf("day").format();
            endTime = moment().add(31, "days").endOf("day").format();
          }

          const updated: any = await updateUser({
            userData: {
              planType: "prime",
              orderId: response.razorpay_order_id,
              paymentId: response.razorpay_payment_id,
              startTime,
              endTime,
            },
            email: user?.email,
          });

          if (updated?.error) {
            showSnackBar("error", updated?.error?.data?.error?.message || "");
          }

          localStorage.removeItem("planUpgradeModal");
        },
      };
      const paymentObject = new window.Razorpay(options);

      paymentObject.open();
    }
  }, [paymentData]);

  const loadScript = (src: any) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };

      document.body.appendChild(script);
    });
  };

  const displayRazorpay = async () => {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );
    if (!res) {
      alert("Razorpay SDK failed to load");
    }

    try {
      const paymentData: any = await paymentRequest({});
      if (paymentData?.error) {
        showSnackBar(
          "error",
          paymentData?.error?.data?.error?.message || "Error"
        );
      }
      setPaymentData(paymentData?.data);
    } catch (error) {}
  };

  return (
    <Frame
      withHeader={true}
      withDate={true}
      headerTitle={"Profile"}
      withSearchBox={false}
      containerClass="profile"
    >
      <ErrorBoundary FallbackComponent={Fallback} onError={errorHandler}>
        {userLoading || paymentLoading || updateUserLoading ? (
          <div className="loader-container">
            <ClipLoader loading size={40} color="var(--primaryColor)" />
          </div>
        ) : (
          <>
            <div className="d-flex profile-inner-container">
              <div className="flex-dir-col flex-1 left-container">
                <h3 className="jos-18-primary">Edit Profile</h3>
                <div className="d-flex flex-1 pic-container">
                  <div className="">
                    <div
                      className="picture-box d-flex center-items"
                      // style={{
                      //   backgroundImage: `url(${user?.imageUrl})`,
                      // }}
                    >
                      {/* {!user?.imageUrl && (
                        <span>{user?.name[0]}</span>
                      )} */}

                      {<span>{user?.name[0]}</span>}
                    </div>
                    {false && (
                      <span className="d-flex mt-20 rob-reg-14-grey">
                        Recommend size is 256x256px
                      </span>
                    )}
                  </div>
                  {false && (
                    <div className="flex-1 flex-dir-col btns-container">
                      <OutlinedPrimaryButton
                        name="Change Photo"
                        click={() => {}}
                        btnContainerClass=""
                        btnClass="h-40"
                      />

                      {/* <SecondaryButton
                        name={'Delete Photo'}
                        // click={() => handleClick('secondary')}
                        btnContainerClass="mt-20"
                        btnClass={'secondary-btn'}
                      /> */}
                    </div>
                  )}
                </div>

                <div className="flex-auto flex-dir-col info-container mt-30">
                  <div className="mt-20">
                    <span className="rob-reg-12-grey mr-10">Name:</span>
                    <span className="rob-reg-12-black">{user?.name}</span>
                  </div>

                  {false && (
                    <div className="mt-20">
                      <span className="rob-reg-12-grey mr-10">DOB:</span>
                      <span className="rob-reg-12-black">01.02.1998</span>
                    </div>
                  )}

                  <div className="mt-20">
                    <span className="rob-reg-12-grey mr-10">Email:</span>
                    <span className="rob-reg-12-black mr-10">
                      {user?.email}
                    </span>
                    {user?.verified && (
                      <span className="rob-reg-12-primary">Verified</span>
                    )}
                  </div>
                </div>

                <div className="edit-btn-container">
                  {false && (
                    <OutlinedPrimaryButton
                      name="EDIT"
                      click={() => {}}
                      btnContainerClass=""
                      btnClass="h-40"
                    />
                  )}
                </div>
              </div>
              <div className="flex-dir-col flex-1 right-container">
                <h3 className="jos-18-primary">Current Plan</h3>

                {planType === "free" ? (
                  <div className="flex-dir-col flex-auto plan-container mt-20">
                    <div className="plan-details">
                      <div className="plan-type">
                        <div>
                          <h2 className="jos-primary">INTRO</h2>
                          <span className="jos-primary size-36">FREE</span>
                        </div>
                      </div>

                      <div className="mt-20 plan-info d-flex ">
                        <span className="rob-reg-14-black"></span>
                        <span className="rob-reg-14-black">Free / <b>Prime</b> </span>
                      </div>


                      <div className="mt-20 plan-info d-flex ">
                        <span className="rob-reg-14-black">No of streaks</span>
                        <span className="rob-reg-14-black">2 / <b>100</b></span>
                      </div>

                      <div className="mt-20 plan-info d-flex ">
                        <span className="rob-reg-14-black">No of rewards</span>
                        <span className="rob-reg-14-black">2 / <b>100</b></span>
                      </div>

                      <div className="mt-20 plan-info d-flex ">
                        <span className="rob-reg-14-black">
                          Dashboard Summary
                        </span>
                        <span className="rob-reg-14-black">Yes / <b>Yes</b></span>
                      </div>

                      <div className="mt-20 plan-info d-flex mb-20">
                        <span className="rob-reg-14-black">
                          Recent Activities
                        </span>
                        <span className="rob-reg-14-black">No / <b>Yes</b></span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex-dir-col flex-auto plan-container mt-20">
                    <div className="plan-details">
                      <div className="plan-type">
                        <div>
                          <h2 className="jos-primary">Prime</h2>
                          <div>
                            <h3 className="rob-bold-12-primary">
                              {moment(userData?.endTime).diff(
                                moment(moment().format()),
                                "days"
                              ) === 0
                                ? "Expires today"
                                : `Expires in ${moment(userData?.endTime).diff(
                                    moment(moment().format()),
                                    "days"
                                  )} days`}
                            </h3>
                          </div>
                          <span className="rob-bold-12-black">Rs</span>
                          <span className="foont-jos size-36 ml-5">45</span>
                          <span className="rob-reg-14-black">
                            .00 / PER MONTH
                          </span>
                        </div>
                      </div>

                      <div className="mt-20 plan-info d-flex ">
                        <span className="rob-reg-14-black">No of streaks</span>
                        <span className="rob-reg-14-black">100</span>
                      </div>

                      <div className="mt-20 plan-info d-flex ">
                        <span className="rob-reg-14-black">No of rewards</span>
                        <span className="rob-reg-14-black">100</span>
                      </div>

                      <div className="mt-20 plan-info d-flex ">
                        <span className="rob-reg-14-black">
                          Dashboard Summary
                        </span>
                        <span className="rob-reg-14-black">Yes</span>
                      </div>

                      <div className="mt-20 plan-info d-flex ">
                        <span className="rob-reg-14-black">
                          Recent Activities
                        </span>
                        <span className="rob-reg-14-black">Yes</span>
                      </div>
                    </div>
                  </div>
                )}

                <div className="d-flex plan-btn-container center-items">
                  <OutlinedPrimaryButton
                    name={planType === "free" ? "Change Plan" : "Renew Plan"}
                    click={displayRazorpay}
                    btnContainerClass="change-plan-btn"
                    btnClass="h-40"
                  />
                </div>
              </div>
            </div>
          </>
        )}
      </ErrorBoundary>
      {SnackbarComponent}
    </Frame>
  );
}

export default Profile;
