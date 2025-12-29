import React, { useState } from "react";
import LandingPage from "./components/landing-page/LandingPage";
import UserLogin from "./components/user-login/UserLogin";
import VendorLogin from "./components/vendor-login/VendorLogin";
import UserDashboard from "./components/user-dashboard/UserDashboard";
import VendorDashboard from "./components/vendor-dashboard/VendorDashboard";
import ProblemList from "./components/problem-list/ProblemList";
import TeamScreen from "./components/team-screen/TeamScreen";
import SubmissionScreen from "./components/submission-screen/SubmissionScreen";
import PostProblem from "./components/post-problem/PostProblem";
import ReviewSolutions from "./components/review-solutions/ReviewSolutions";
import PaymentFeedback from "./components/payment-feedback/PaymentFeedback";
import "./index.css";

export default function App() {
  const [state, setState] = useState({
    screen: "landing",
    userType: null,
  });

  const navigate = (screen, data) => {
    setState((prev) => ({ ...prev, screen, ...data }));
  };

  const renderScreen = () => {
    switch (state.screen) {
      case "landing":
        return <LandingPage onNavigate={navigate} />;
      case "user-login":
        return <UserLogin onNavigate={navigate} />;
      case "vendor-login":
        return <VendorLogin onNavigate={navigate} />;
      case "user-dashboard":
        return <UserDashboard onNavigate={navigate} />;
      case "vendor-dashboard":
        return <VendorDashboard onNavigate={navigate} />;
      case "problem-list":
        return <ProblemList onNavigate={navigate} />;
      case "team":
        return <TeamScreen onNavigate={navigate} />;
      case "submission":
        return (
          <SubmissionScreen
            onNavigate={navigate}
            selectedProblem={state.selectedProblem}
          />
        );
      case "post-problem":
        return <PostProblem onNavigate={navigate} />;
      case "review-solutions":
        return <ReviewSolutions onNavigate={navigate} />;
      case "payment-feedback":
        return (
          <PaymentFeedback
            onNavigate={navigate}
            selectedSolution={state.selectedSolution}
          />
        );
      default:
        return <LandingPage onNavigate={navigate} />;
    }
  };

  return <div className="min-h-screen bg-gray-50">{renderScreen()}</div>;
}
