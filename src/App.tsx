import { lazy, FunctionComponent, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";

import ProtectedRoute from "ProtectedRoutes";

import "Assets/Images/fontello/css/habstreak.css";
import "./App.css";
import SuspenseFallback from "Components/suspenseFallback/suspenseFallback";

//PAGED
const DashboardPage = lazy(() => import("Pages/Dashboard/dashboard"));
const StreakListPage = lazy(() => import("Pages/StreakList/streakList"));
const Streak = lazy(() => import("Pages/Streak/streak"));
const RewardList = lazy(() => import("Pages/RewardList/rewardList"));
const RecentActivities = lazy(
  () => import("Pages/RecentActivities/recentActivities")
);
const AccountPage = lazy(() => import("Pages/Account/account"));
const LandingPage = lazy(() => import("Pages/LandingPage/landingPage"));
const ProfilePage = lazy(() => import("Pages/Profile/profile"));
const TermsAndCondition = lazy(
  () => import("Pages/PrivacyPolicy/termsAndCondition")
);
const PrivacyPolicy = lazy(() => import("Pages/PrivacyPolicy/privacyPolicy"));
const CancellationPolicy = lazy(
  () => import("Pages/PrivacyPolicy/refundPolicy")
);
const AboutUs = lazy(() => import("Pages/AboutUs/about"));
// const SuccessPage = lazy(() => import("pages/GoogleResponse/success"));
// const Errorpage = lazy(() => import("pages/GoogleResponse/error"));

const pageElement = (Component: FunctionComponent) => {
  return (
    <Suspense fallback={<SuspenseFallback />}>
      <Component />
    </Suspense>
  );
};

function App() {
  return (
    <Suspense
      fallback={
        <div className="loader-container">
          <ClipLoader loading size={40} color="var(--primaryColor)" />
        </div>
      }
    >
      <Router>
        <div id="modal-container-id"></div>
        <Routes>
          {/* 
          <ProtectedRoute path="/success" component={SuccessPage} />
          <ProtectedRoute path="/error" component={Errorpage} />
          */}

          <Route path="/" element={pageElement(LandingPage)} />
          <Route path="/about-us" element={pageElement(AboutUs)} />
          <Route path="/account" element={pageElement(AccountPage)} />
          <Route path="/privacy-policy" element={pageElement(PrivacyPolicy)} />
          <Route
            path="/terms-and-condition"
            element={pageElement(TermsAndCondition)}
          />
          <Route
            path="/refund-policy"
            element={pageElement(CancellationPolicy)}
          />

          <Route
            path="/dashboard"
            element={<ProtectedRoute element={pageElement(DashboardPage)} />}
          />

          <Route
            path="/streak-list"
            element={<ProtectedRoute element={pageElement(StreakListPage)} />}
          />

          <Route
            path="/streak/:id"
            element={<ProtectedRoute element={pageElement(Streak)} />}
          />

          <Route
            path="/reward-list"
            element={<ProtectedRoute element={pageElement(RewardList)} />}
          />

          <Route
            path="/recent-activities"
            element={<ProtectedRoute element={pageElement(RecentActivities)} />}
          />

          <Route
            path="/profile"
            element={<ProtectedRoute element={pageElement(ProfilePage)} />}
          />
        </Routes>
      </Router>
    </Suspense>
  );
}

export default App;
