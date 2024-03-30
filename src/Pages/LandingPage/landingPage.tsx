/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { lazy, useEffect } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import { Suspense } from "react";

import { PrimaryButton } from "Components/buttons/buttons";
import LandingHeader from "Components/landingHeader/landingHeader";

import "index.scss";
import "Styles/Pages/landingPage.scss";

import { useNavigate } from "react-router-dom";

import { jumpToAccount } from "Utilities/index";

import { ReactComponent as Hero } from "Assets/Images/hero.svg";

const Guide = lazy(() => import("Components/landing-page/guide"));
const Pricing = lazy(() => import("Components/landing-page/pricing"));
const Contact = lazy(() => import("Components/landing-page/contact"));
const Footer = lazy(() => import("Components/landing-page/footer"));

function LandingPage() {
  const navigate = useNavigate();

  useEffect(() => {
    //If we have a user in local storage
    //and it is not verified then we have to clear
    //local storage
    let val = localStorage.getItem("profile") || "";
    const user = val ? JSON.parse(val) : "";

    if (user) {
      const isVerified = user?.result?.verified;
      if (!isVerified) {
        localStorage.clear();
        window.location.reload();
      }
    }
  }, []);

  //FUNCTIONS
  return (
    <div>
      <div className="landing-page">
        {/* Header */}
        <div className="global-background hero-background">
          <LandingHeader navListing={true} />

          <section
            id="hero"
            className="hero-section padding-global d-flex justify-space-between"
          >
            <div className="hero-container">
              <h1 className="h1-50">
                Do more, feel better, celebrate with your reward!
              </h1>
              <p className="p-18">
                Level Up Your Productivity! Habstreak helps you turn <b>Starts</b>{' '}
                into <b>Finishes</b>{' '} with task tracking, milestones, and rewards.
              </p>
              <div className="buttons d-flex">
                <PrimaryButton
                  name={"Get Started"}
                  click={() => {
                    jumpToAccount("signup", navigate);
                  }}
                  btnContainerClass="fit-content"
                  btnClass="header-btn landing-get-started"
                />

                <PrimaryButton
                  name={"Login"}
                  click={() => {
                    jumpToAccount("login", navigate);
                  }}
                  btnContainerClass="ml-30 fit-content"
                  btnClass="header-btn landing-login-btn"
                />
              </div>
            </div>

            <div className="hero-image d-flex justify-end">
              <Hero />
            </div>
          </section>
        </div>

        <section
          id="feature"
          className="global-background features-section feature-background padding-global"
        >
          <header className="feature-heading">Features</header>

          <div className="section-container">
            <div className="left-section">
              <div className="top-row">
                <div className="feature-card">
                  <h1>Build Streaks</h1>
                  <p>Stay motivated by tracking your daily task completion.</p>
                </div>

                <div className="feature-card">
                  <h1>Daily Wins</h1>
                  <p>
                    Small steps add up to big achievements and wins motivates.
                  </p>
                </div>
              </div>
              <div className="bottom-row">
                <div className="feature-card">
                  <h1>Track Progress</h1>
                  <p>Visualize your journey and celebrate milestones.</p>
                </div>

                <div className="feature-card">
                  <h1>Unlock Rewards</h1>
                  <p>Earn incentives for reaching your goals.</p>
                </div>
              </div>
            </div>

            <div className="right-section">
              <h1 className="h1-40">
                Reward yourself and make the road of success exciting
              </h1>
              <p className="p-18">
                Don't wait for the finish line! Reward yourself along the way
                and enjoy the excitement of achieving milestones.
              </p>

              <div className="buttons d-flex mt-50">
                <PrimaryButton
                  name={"Get Started"}
                  click={() => {
                    jumpToAccount("signup", navigate);
                  }}
                  btnContainerClass=""
                  btnClass="header-btn landing-get-started"
                />
              </div>
            </div>
          </div>
        </section>
        <Suspense
          fallback={
            <div className="loader-container">
              <ClipLoader loading size={40} color="var(--primaryColor)" />
            </div>
          }
        >
          <Guide />
        </Suspense>

        <Suspense
          fallback={
            <div className="loader-container">
              <ClipLoader loading size={40} color="var(--primaryColor)" />
            </div>
          }
        >
          <Pricing />
        </Suspense>

        <Suspense
          fallback={
            <div className="loader-container">
              <ClipLoader loading size={40} color="var(--primaryColor)" />
            </div>
          }
        >
          <Contact />
        </Suspense>

        <Suspense
          fallback={
            <div className="loader-container">
              <ClipLoader loading size={40} color="var(--primaryColor)" />
            </div>
          }
        >
          <Footer />
        </Suspense>

        <div className="d-flex justify-center policies">
          <span
            onClick={() => {
              navigate("/privacy-policy");
            }}
          >
            Privacy Policy
          </span>
          <span
            onClick={() => {
              navigate("/terms-and-condition");
            }}
          >
            || Terms and Policies ||
          </span>
          <span
            onClick={() => {
              navigate("/refund-policy");
            }}
          >
            Refund Policy
          </span>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
