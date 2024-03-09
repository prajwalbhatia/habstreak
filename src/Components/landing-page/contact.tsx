import React, { useState } from "react";

import { ReactComponent as Logo } from "Assets/Images/Logo-Full.svg";

import {
  TextInputElement,
  InputElement,
} from "Components/form-elements/form-elements";
import { PrimaryButton } from "Components/buttons/buttons";
import { errMsgInterface } from "Components/Interfaces/interfaces";

import { openInNewTab } from "Utilities/index";
import { useSendSupportMessageMutation } from "../../Redux/Slices/sendSupportMessageSlice";

function Contact() {
  const [sendSupportMessage, { isLoading }] = useSendSupportMessageMutation();

  const [formData, setFormData] = useState({
    email: "",
    message: "",
  });
  const [errMsg, setErrMsg] = useState<errMsgInterface>({});
  const [successMsg, setSuccessMsg] = useState({
    email: "",
  });

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validation = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "email") {
      if (!formData["email"]) {
        setErrMsg({ ...errMsg, [e.target.name]: "Email can't be empty" });
      } else if (typeof formData["email"] !== "undefined") {
        let lastAtPos = formData["email"].lastIndexOf("@");
        let lastDotPos = formData["email"].lastIndexOf(".");

        if (
          !(
            lastAtPos < lastDotPos &&
            lastAtPos > 0 &&
            formData["email"].indexOf("@@") === -1 &&
            lastDotPos > 2 &&
            formData["email"].length - lastDotPos > 2
          )
        ) {
          setErrMsg({ ...errMsg, [e.target.name]: "Email is not valid" });
        } else {
          //   delete errMsg['email'];
          let err = { email: "" };
          setErrMsg({ ...err });
          setSuccessMsg({ ...successMsg, [e.target.name]: "Looks Great!" });
        }
      }
    }
  };

  const sendMessage = () => {
    if (
      Object.keys(formData).length === 2 &&
      formData.email.length > 0 &&
      formData.message.length > 0
      // && Object.keys(errMsg).length === 0
    ) {
      sendSupportMessage(formData);
      setTimeout(() => {
        setFormData({ email: "", message: "" });
        setErrMsg({ email: "" });
        setSuccessMsg({ email: "Message sent" });
      }, 1000);

      setTimeout(() => {
        setSuccessMsg({ email: "" });
      }, 2000);
    }
  };

  return (
    <section
      id="contact"
      className="contact-section contact-background padding-global"
    >
      <div className="container">
        <div className="left-section">
          <Logo />
          <p className="mt-20">
            When you will rewards yourself on small small milestones than you
            will feel exciting and motivated to complete that task and you will
            not break the streak.
          </p>

          <div className="socials mt-30">
            <i
              onClick={() =>
                openInNewTab("https://www.instagram.com/prajwal_bhatia")
              }
              className="demo-icon icon-instagram mr-20 contact-icon"
            />
            <i
              onClick={() =>
                openInNewTab(
                  "https://twitter.com/bhatia_prajwal?t=m8OrMkj-hsks8OjwchvRqQ&s=09"
                )
              }
              className="demo-icon icon-twitter contact-icon"
            />
          </div>
        </div>
        <div className="middle-section">{/* <Footer /> */}</div>
        <div className="right-section">
          <h4 className="write-ur-text">Write us</h4>

          <TextInputElement
            key={"1"}
            placeholder={"Write message"}
            uid={"message"}
            onChange={handleChange}
            value={formData["message"]}
            type={"text"}
            containerClass={"mt-20"}
            label={""}
          />

          <InputElement
            label={""}
            key={"2"}
            placeholder={"name@gmail.com"}
            uid={"email"}
            type="text"
            value={formData["email"]}
            containerClass={"mt-20"}
            onBlur={validation}
            errMsg={errMsg["email"]}
            successMsg={successMsg["email"]}
            icon={<i className="demo-icon icon-email size-16-8f" />}
            onChange={handleChange}
          />

          <PrimaryButton
            name={"Send"}
            click={sendMessage}
            btnContainerClass="d-flex justify-end"
            btnClass="header-btn landing-login-btn send-btn mt-30"
            loading={isLoading}
          />
        </div>
      </div>
    </section>
  );
}

export default Contact;
