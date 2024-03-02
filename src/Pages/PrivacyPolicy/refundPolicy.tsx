import React from "react";
import { useNavigate } from "react-router-dom";

//CSS
// import "../../index.css";
import "Styles/Pages/policies.scss";

//IMAGES
import { ReactComponent as Logo } from "Assests/Images/Logo.svg";
import { goToHome } from "Utilities";

function CancellationPolicy() {
  const navigate = useNavigate();
  return (
    <div className="policy-main-container padding-global">
      <div>
        <header className="landing-page-header d-flex">
          {/* LOGO */}
          <div onClick={() => goToHome(navigate)} className="logo-container">
            <Logo />
          </div>
        </header>
      </div>

      <div className="policy-container">
        <h1 className="mt-10">Cancellations and Refunds</h1>
        <p className="mt-10">
          After purchasing a one-month membership, you are committed for the
          duration of that month and cannot cancel until the month is over.
          Following this initial month, you have the freedom to decide whether
          to continue by paying for the next month. However, if you opt not to
          renew your membership after completing the initial month, you will
          revert to the limitations of our free plan, which includes access to
          only 2 streaks or 2 rewards.{" "}
        </p>
      </div>
    </div>
  );
}

export default CancellationPolicy;
