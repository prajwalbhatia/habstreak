import { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";
import { ReactComponent as Logo } from "Assests/Images/Logo.svg";

import { goToHome, jumpToAccount } from "Utilities/index";

import { PrimaryButton } from "Components/buttons/buttons";
import { LandingHeaderProps } from "Components/Interfaces/interfaces";

import "Styles/Components/landingHeader.scss";

function LandingHeader({
  navListing = false,
  sectionListing = false,
}: LandingHeaderProps) {
  const navigate = useNavigate();
  const [selectedNav, setSelectedNav] = useState("home");
  const [showListing, setShowListing] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScroll = () => {
    let scroll = window.scrollY;
    if (scroll && scroll < 400) setSelectedNav("home");
  };

  const handleLinkClick = (e: any) => {
    if (!e.target.getAttribute("data-value")) setSelectedNav("home");
    else if (e.target.getAttribute("data-value") === "aboutUs") {
      navigate("/about-us");
    } else if (e.target.getAttribute("data-value") === "login") {
      jumpToAccount("login", navigate);
    } else if (e.target.getAttribute("data-value") === "getStarted") {
      jumpToAccount("signup", navigate);
    } else {
      const targetElement = document.getElementById(
        e.target.getAttribute("data-value")
      );
      if (targetElement !== null) {
        targetElement.scrollIntoView({ behavior: "smooth" });
      } else {
        console.error("Element not found!");
      }

      setSelectedNav(e.target.getAttribute("data-value"));
    }

    setShowListing(false);
  };

  return (
    <>
      <header className="landing-page-header d-flex padding-global">
        <div onClick={() => goToHome(navigate)} className="logo-container">
          <Logo />
        </div>

        {navListing && (
          <div id="home" className="main-navigation">
            <nav className="landing-navigation">
              <ol className="d-flex" onClick={handleLinkClick}>
                <li
                  className={selectedNav === "home" ? "list-active" : ""}
                  data-value="home"
                >
                  Home
                </li>
                <li
                  className={selectedNav === "feature" ? "list-active" : ""}
                  data-value="feature"
                >
                  Feature
                </li>
                <li
                  className={selectedNav === "guide" ? "list-active" : ""}
                  data-value="guide"
                >
                  Guide
                </li>
                <li
                  className={selectedNav === "contact" ? "list-active" : ""}
                  data-value="contact"
                >
                  Contact
                </li>
                <li
                  className={selectedNav === "aboutUs" ? "list-active" : ""}
                  data-value="aboutUs"
                >
                  About us
                </li>
              </ol>
            </nav>
          </div>
        )}

        <div className="buttons-container">
          <PrimaryButton
            name={"Login"}
            click={() => {
              jumpToAccount("login", navigate);
            }}
            btnContainerClass="ml-10"
            btnClass="header-btn landing-login-btn"
          />

          <PrimaryButton
            name={"Get Started"}
            click={() => {
              jumpToAccount("signup", navigate);
            }}
            btnContainerClass="ml-10"
            btnClass="header-btn landing-get-started"
          />
        </div>

        <div className="d-flex center-items btn-list-container">
          {showListing ? (
            <i
              onClick={() => setShowListing(false)}
              className="demo-icon size-30-primary  icon-close"
            />
          ) : (
            <i
              onClick={() => setShowListing(true)}
              className="demo-icon  size-30-primary icon-menu"
            />
          )}
          {showListing && (
            <div className="listing">
              {sectionListing ? (
                <ol className="d-flex flex-dir-col" onClick={handleLinkClick}>
                  <li data-value="home">Home</li>
                  <li data-value="feature">Feature</li>
                  <li data-value="guide">Guide</li>
                  <li data-value="contact">Contact</li>
                  <li data-value="aboutUs">About Us</li>
                </ol>
              ) : (
                <ol className="d-flex flex-dir-col" onClick={handleLinkClick}>
                  <li data-value="login">Login</li>
                  <li data-value="getStarted">Get Started</li>
                </ol>
              )}

              <span>
                Made with
                <i className="demo-icon icon-heart color-red" />
                by PRAJWAL BHATIA
              </span>
            </div>
          )}
        </div>
      </header>
    </>
  );
}

LandingHeader.defaultProps = {
  sectionListing: true,
  navListing: true,
};

export default LandingHeader;
