/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState, useRef } from "react";
import { GoogleLogin } from "react-google-login";
import { useNavigate, useLocation } from "react-router-dom";

//Libraries
import ClipLoader from "react-spinners/ClipLoader";

//COMPONENTS
import { InputElement } from "Components/form-elements/form-elements";
import { PrimaryButton } from "Components/buttons/buttons";

//Redux
import {
  useAuthMutation,
  useSigninMutation,
  useSignupMutation,
  useVerifyEmailMutation,
  useResendOtpMutation,
  useRefreshTokenMutation,
  useCheckUserExistMutation,
  useCheckUserExistFromGoogleMutation,
} from "../../Redux/Slices/accountSlice";

//CSS
import "Styles/Pages/account.scss";
import "index.scss";

//IMAGES
import { ReactComponent as Logo } from "Assests/Images/Logo.svg";
import { ReactComponent as Signup } from "Assests/Images/Signup.svg";
import { ReactComponent as Login } from "Assests/Images/Login.svg";

//UTILITIES
import { dialogForError, goToHome, sendEventToMobile } from "Utilities/index";
import { size } from "lodash";
import { storeAuthData } from "../../Redux/Slices/authDataStoreSlice";
import { useDispatch } from "react-redux";

interface errSuccMsgInterface {
  email?: "";
  fullName?: "";
  confirmPassword?: "";
  password?: "";
}

const initialState = {
  fullName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

function Account(props: any) {
  const [auth, { error: authError, isLoading: authLoading }] =
    useAuthMutation();
  const [signup, { error: signupError, isLoading: signupLoading }] =
    useSignupMutation();
  const [signin, { error: signinError, isLoading: signinLoading }] =
    useSigninMutation();
  const [
    verifyEmail,
    { error: verifyEmailError, isLoading: verifyEmailLoading },
  ] = useVerifyEmailMutation();

  const [resendOtp, { error: resendOtpError, isLoading: resendOtpLoading }] =
    useResendOtpMutation();

  const [
    checkUserExist,
    { error: checkUserExistError, isLoading: checkUserExistLoading },
  ] = useCheckUserExistMutation();
  const [
    checkUserExistFromGoogle,
    {
      error: checkUserExistFromGoogleError,
      isLoading: checkUserExistFromGoogleLoading,
    },
  ] = useCheckUserExistFromGoogleMutation();

  const otp2ref = useRef<HTMLInputElement | null>(null);
  const otp3ref = useRef<HTMLInputElement | null>(null);
  const otp4ref = useRef<HTMLInputElement | null>(null);

  //HOOKS
  //   const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  //   const authData = useSelector((state: any) => state);
  // const authData = useSelector((state: any) => state);

  //   const loading = useSelector((state) => state.user.loading);

  //   let error = useSelector((state) => state.user.error);
  //HOOKS

  const storageData = localStorage?.getItem("profile");
  const dispatch = useDispatch();

  //STATES
  const [user] = useState(storageData ? JSON.parse(storageData) : "");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [stage, setStage] = useState("login");
  const [formData, setFormData] = useState<any>(initialState);
  const [errMsg, setErrMsg] = useState<errSuccMsgInterface>({});
  const [successMsg, setSuccessMsg] = useState<errSuccMsgInterface>({});
  const [isValid, setIsValid] = useState(false);
  const [loadingFile, setLoadingFile] = useState(false);

  const [resendButton, setResendButton] = useState(false);

  const [countDown, setCountDown] = useState(60);
  const [authData, setAuthData] = useState<any>({});

  useEffect(() => {
    if(authData?.result)
    {
      dispatch(storeAuthData(authData?.result));
    }
  } , [authData])

  useEffect(() => {
    const interval = setInterval(() => {
      if (countDown >= 1 && stage === "verify") {
        setCountDown(countDown - 1);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [countDown, resendButton, stage]);

  //STATES

  //USE EFFECTS
  useEffect(() => {
    const err: any =
      authError ||
      signupError ||
      signinError ||
      verifyEmailError ||
      resendOtpError ||
      checkUserExistError ||
      checkUserExistFromGoogleError;

    const errText = err?.data?.error?.message;

    if (errText) {
      dialogForError(errText);
    }
  }, [
    authError,
    signupError,
    signinError,
    verifyEmailError,
    resendOtpError,
    checkUserExistError,
    checkUserExistFromGoogleError,
  ]);

  useEffect(() => {
    const token = user?.token;
    if (token && user?.result?.verified) navigate("/dashboard");
    else {
      if (!user?.result?.verified) setStage("login");
    }
  }, [navigate, user?.result?.verified, user?.token]);

  useEffect(() => {
    if (location?.state?.jumpTo === "signup") setStage("signin");
    else if (location?.state?.jumpTo === "login") {
      setStage("login");
    }
  }, [location]);

  useEffect(() => {
    if (
      authData &&
      size(authData) > 0 &&
      (stage === "signin" || stage === "login")
    ) {
      if (authData?.result?.verified) navigate("/dashboard");
      else if (!authData?.result?.verified) setStage("verify");
    }
  }, [authData, navigate, stage]);

  useEffect(() => {
    if (stage) setIsValid(false);
  }, [stage]);

  useEffect(() => {
    if (!stage) {
      if (
        Object.keys(errMsg).length === 0 &&
        formData["email"].length > 0 &&
        formData["password"].length > 0
      )
        setIsValid(true);
    }
  }, [errMsg, formData, stage]);

  //USE EFFECTS

  //FUNCTIONS
  const googleSuccess = async (res: any) => {
    setLoadingFile(true);
    const result = res?.profileObj;
    const userData: any = await checkUserExist({ email: result?.email });
    const userDataFromGoogle: any = await checkUserExistFromGoogle({
      email: result?.email,
    });

    if (userData.data === true && !userDataFromGoogle.data) {
      dialogForError("User already exist with same email");
      setLoadingFile(false);
      return;
    }

    const token = res?.tokenId;

    try {
      auth({ result, token });
    } catch (error) {
      console.log(error);
    }
    setLoadingFile(false);
  };

  const googleFailure = (res: any) => {
    console.log("GOOGLE FAILURE", res);
  };

  // window.getProfile = async (data) => {
  //   setLoadingFile(true);
  //   if (data) {
  //     const token = data?.idToken;
  //     const result = data?.user;

  //     const userData = await checkUserExist({ email: result?.email });
  //     const userDataFromGoogle = await checkUserExistFromGoogle({ email: result?.email });

  //     if (userData.data === true && !userDataFromGoogle.data) {
  //       dialogForError('User already exist with same email');
  //       setLoadingFile(false);
  //       return;
  //     }
  //     try {
  //       dispatch(auth({ result, token }));
  //     } catch (error) {
  //       console.log(error)
  //     }
  //     setLoadingFile(false);
  //   }
  // }

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    userEntry();
  };

  const userEntry = async () => {
    //Signining the user
    //and will send the user to verify email screen
    //SIGNUP
    // debugger; // eslint-disable-line no-debugger
    if (stage === "signin") {
      const userData: any = await checkUserExist({ email: formData?.email });
      if (userData === true) {
        dialogForError("User already exist");
      } else {
        const signupData: any = await signup(formData);
        const authData = signupData?.data;

        if (size(authData) > 0) {
          setAuthData({ ...authData });
          localStorage.setItem("profile", JSON.stringify({ ...authData }));
        }
      }
    }
    //Logging the user if and only if user is verified
    //if not verified then will send to verify screen
    else if (stage === "login") {
      // dispatch(signin(formData, history))
      const signinData: any = await signin(formData);
      const authData = signinData?.data;
      if (size(authData) > 0) {
        setAuthData({ ...authData });
        localStorage.setItem("profile", JSON.stringify({ ...authData }));
      }
    }
    //Verifying the user
    else if (stage === "verify") {
      const otp = formData.otp1 + formData.otp2 + formData.otp3 + formData.otp4;
      if (otp.length === 4) {
        const dataObj = {
          otp,
          userId: authData?.result?._id,
        };
        const verify: any = await verifyEmail(dataObj);
        const authVal = verify?.data;

        if (size(authVal) > 0) {
          localStorage.setItem("profile", JSON.stringify({ ...authVal }));

          if (authVal?.result?.verified) {
            navigate("/dashboard");
          }
        }
      }
    }
  };

  const handleChange = (e: any) => {
    //IN CASE OF FILLING OTP
    if (e.target.name.includes("otp")) {
      if (e.target.name === "otp1" && e.target.value.length > 0)
        otp2ref?.current?.focus();
      else if (e.target.name === "otp2" && e.target.value.length > 0)
        otp3ref?.current?.focus();
      else if (e.target.name === "otp3" && e.target.value.length > 0)
        otp4ref?.current?.focus();
      else if (e.target.name === "otp4" && e.target.value.length > 0)
        otp4ref?.current?.blur();
    }

    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const switchMode = () => {
    if (stage === "login") setStage("signin");
    else if (stage === "signin") setStage("login");

    setFormData(initialState);
    setErrMsg({});
    setSuccessMsg({});
  };

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const validation = (e: any) => {
    //FULL NAME
    if (e.target.name === "fullName") {
      if (!formData[e.target.name]) {
        setErrMsg({ ...errMsg, [e.target.name]: "Name can't be empty" });
      } else if (formData[e.target.name].split(" ").length !== 2) {
        setErrMsg({
          ...errMsg,
          [e.target.name]: "Please enter first and last name",
        });
      } else {
        delete errMsg["fullName"];
        setErrMsg({ ...errMsg });
        setSuccessMsg({ ...successMsg, [e.target.name]: "Looks Great!" });
      }
    }

    //EMAIL VALIDATION
    if (e.target.name === "email") {
      if (!formData[e.target.name]) {
        setErrMsg({ ...errMsg, [e.target.name]: "Email can't be empty" });
      } else if (typeof formData[e.target.name] !== "undefined") {
        let lastAtPos = formData[e.target.name].lastIndexOf("@");
        let lastDotPos = formData[e.target.name].lastIndexOf(".");

        if (
          !(
            lastAtPos < lastDotPos &&
            lastAtPos > 0 &&
            formData[e.target.name].indexOf("@@") === -1 &&
            lastDotPos > 2 &&
            formData[e.target.name].length - lastDotPos > 2
          )
        ) {
          setErrMsg({ ...errMsg, [e.target.name]: "Email is not valid" });
        } else {
          delete errMsg["email"];
          setErrMsg({ ...errMsg });
          setSuccessMsg({ ...successMsg, [e.target.name]: "Looks Great!" });
        }
      }
    }

    //PASSWORD VALIDATION
    if (e.target.name === "password") {
      const regex = /(?=.*[A-Z])/;
      if (!formData[e.target.name]) {
        setErrMsg({ ...errMsg, [e.target.name]: "Password can't be empty" });
      } else if (typeof formData[e.target.name] !== "undefined") {
        if (formData[e.target.name].length < 8) {
          setErrMsg({ ...errMsg, [e.target.name]: "Atleast 8 character" });
        } else if (!formData[e.target.name].match(regex)) {
          setErrMsg({
            ...errMsg,
            [e.target.name]: "Atleast one uppercase letter",
          });
        } else {
          delete errMsg["password"];
          setErrMsg({ ...errMsg });
          setSuccessMsg({ ...successMsg, [e.target.name]: "Looks Great!" });
        }
      }
    }

    //CONFIRM PASSWORD
    if (e.target.name === "confirmPassword") {
      if (formData[e.target.name] !== formData["password"]) {
        setErrMsg({ ...errMsg, [e.target.name]: "Password doesn't match" });
      } else {
        delete errMsg["confirmPassword"];
        setErrMsg({ ...errMsg });
        setSuccessMsg({ ...successMsg, [e.target.name]: "Password Matched!" });

        if (Object.keys(errMsg).length === 0) setIsValid(true);
      }
    }

    //VALIDATION
    if (Object.keys(errMsg).length === 0) setIsValid(true);
    else setIsValid(false);
  };

  //FUNCTIONS

  const clientId = process.env.REACT_APP_CLIENT_ID || "";
  return (
    <>
      {
        // loading ||
        signupLoading || signinLoading || loadingFile ? (
          <div className="loader-container" style={{ height: "100vh" }}>
            <ClipLoader loading size={40} color="var(--primaryColor)" />
          </div>
        ) : (
          <div className="login-container">
            <div className="left-container padding-global">
              <div onClick={() => goToHome(navigate)}>
                <Logo />
              </div>
              <p>
                A central hub where individual or teams can work, plan, and
                archive amazing things together.
              </p>
              <div className="center-items">
                {stage === "login" ? <Login /> : <Signup />}
              </div>
            </div>
            <div className="right-container">
              <form onSubmit={handleSubmit}>
                <div className="d-flex justify-end">
                  <p className="size-16-8f">ENG (USA)</p>
                  <i className="demo-icon  icon-language size-16-8f" />
                </div>

                <p className="size-10-8f roboto-medium mt-35">
                  {stage === "signin"
                    ? "START FOR FREE"
                    : stage === "login"
                    ? "ENJOY YOUR STREAK!"
                    : "Verify TO ENJOY!"}
                </p>

                <h1>
                  {stage === "signin"
                    ? "Sign up to Habstreak"
                    : stage === "login"
                    ? "Login to Habstreak"
                    : "Verify your email"}
                </h1>

                <p className="already-member">
                  {stage === "signin"
                    ? "Already a Member?"
                    : stage === "login"
                    ? "Are you a new member?"
                    : "An OTP is send to your email"}
                  <span className="c-pointer" onClick={switchMode}>
                    {stage === "signin"
                      ? "Login"
                      : stage === "login"
                      ? "Sign up"
                      : ""}
                  </span>
                </p>

                {stage === "verify" ? (
                  <p
                    onClick={() => {
                      if (countDown === 0) {
                        setResendButton(!resendButton);
                        setCountDown(60);

                        resendOtp({ userId: authData?.result?._id });
                      }
                    }}
                    className="already-member c-pointer color-primary"
                  >
                    <span
                      className={
                        countDown === 0
                          ? "resend-btn"
                          : "resend-btn resend-btn-disable"
                      }
                    >
                      RESEND OTP
                    </span>{" "}
                    in {countDown} sec
                  </p>
                ) : null}

                {stage === "signin" && (
                  <InputElement
                    placeholder={"Firstname Lastname"}
                    uid={"fullName"}
                    label={"FULL NAME"}
                    type="text"
                    value={formData["fullName"]}
                    containerClass={"mt-25"}
                    onChange={handleChange}
                    onBlur={validation}
                    errMsg={errMsg["fullName"]}
                    successMsg={successMsg["fullName"]}
                    icon={<i className="demo-icon icon-person size-16-8f" />}
                  />
                )}

                {(stage === "signin" || stage === "login") && (
                  <>
                    <InputElement
                      placeholder={"name@gmail.com"}
                      label={"EMAIL"}
                      uid={"email"}
                      type="email"
                      value={formData["email"]}
                      containerClass={"mt-25"}
                      onChange={handleChange}
                      onBlur={validation}
                      errMsg={errMsg["email"]}
                      successMsg={successMsg["email"]}
                      icon={<i className="demo-icon icon-email size-16-8f" />}
                    />

                    <InputElement
                      placeholder={"8 characters and 1 capital letter"}
                      label={"PASSWORD"}
                      uid={"password"}
                      type={showPassword ? "text" : "password"}
                      containerClass={"mt-25"}
                      value={formData["password"]}
                      onChange={handleChange}
                      onBlur={stage ? validation : undefined}
                      errMsg={stage ? errMsg["password"] : undefined}
                      successMsg={stage ? successMsg["password"] : undefined}
                      icon={
                        <i
                          onClick={togglePassword}
                          className="demo-icon icon-lock size-16-8f c-pointer"
                        />
                      }
                    />
                  </>
                )}

                {stage === "signin" && (
                  <InputElement
                    placeholder={"8 characters and 1 capital letter"}
                    label={"CONFIRM PASSWORD"}
                    uid={"confirmPassword"}
                    value={formData["confirmPassword"]}
                    type={showConfirmPassword ? "text" : "password"}
                    containerClass={"mt-25"}
                    onChange={handleChange}
                    onBlur={validation}
                    errMsg={errMsg["confirmPassword"]}
                    successMsg={successMsg["confirmPassword"]}
                    icon={
                      <i
                        onClick={toggleConfirmPassword}
                        className="demo-icon icon-lock size-16-8f c-pointer"
                      />
                    }
                  />
                )}

                {stage === "verify" && (
                  <div style={{ display: "flex" }}>
                    <InputElement
                      placeholder={"X"}
                      uid={"otp1"}
                      value={formData["otp1"]}
                      //   type={window.ReactNativeWebView ? "number" : "string"}
                      type={"string"}
                      onChange={handleChange}
                      containerClass="otp-box mt-25"
                    />

                    <InputElement
                      placeholder={"X"}
                      uid={"otp2"}
                      reference={otp2ref}
                      value={formData["otp2"]}
                      //   type={window.ReactNativeWebView ? "number" : "string"}
                      type={"string"}
                      onChange={handleChange}
                      containerClass="otp-box mt-25"
                    />

                    <InputElement
                      placeholder={"X"}
                      reference={otp3ref}
                      uid={"otp3"}
                      value={formData["otp3"]}
                      //   type={window.ReactNativeWebView ? "number" : "string"}
                      type={"string"}
                      onChange={handleChange}
                      containerClass="otp-box mt-25"
                    />

                    <InputElement
                      placeholder={"X"}
                      uid={"otp4"}
                      reference={otp4ref}
                      value={formData["otp4"]}
                      //   type={window.ReactNativeWebView ? "number" : "string"}
                      type={"string"}
                      onChange={handleChange}
                      containerClass="otp-box mt-25"
                    />
                  </div>
                )}

                <PrimaryButton
                  name={
                    stage === "signin"
                      ? "CREATE ACCOUNT"
                      : stage === "login"
                      ? "LOGIN"
                      : "VERIFY"
                  }
                  click={() => {}}
                  btnContainerClass="mt-30"
                  btnClass={
                    isValid || stage === "verify"
                      ? "create-account-btn"
                      : "create-account-btn in-valid"
                  }
                  typeVal="submit"
                  disabled={isValid || stage === "verify" ? false : true}
                />

                {(stage === "signin" || stage === "login") && (
                  <>
                    <p className="size-10-8f mt-35">
                      {stage ? "Or Signup With" : "Or Login With"}
                    </p>

                    <div className="socials">
                      <div
                        onClick={() => sendEventToMobile("google-login")}
                        className="icon-container"
                      >
                        <i className="demo-icon  icon-google" />
                      </div>

                      {/* {!window.ReactNativeWebView && ( */}
                      <GoogleLogin
                        clientId={clientId}
                        buttonText=""
                        onSuccess={googleSuccess}
                        onFailure={googleFailure}
                        cookiePolicy={"single_host_origin"}
                        className="google-btn"
                      />
                      {/* )} */}
                    </div>
                  </>
                )}

                <p className="t-and-c">
                  By creating an account means you're okay with
                  <span
                    onClick={() => {
                      navigate("/terms-and-condition");
                    }}
                  >
                    Terms &amp; Condition
                  </span>{" "}
                  and{" "}
                  <span
                    onClick={() => {
                      navigate("/privacy-policy");
                    }}
                  >
                    Privacy Policy
                  </span>
                </p>
              </form>
            </div>
          </div>
        )
      }
    </>
  );
}

export default Account;
