import { useLocation } from "react-router";
import AuthLeftHero from "./AuthLeftHero";
import LoginPage from "./LoginPage";
import SignUpPage from "./SignUpPage";
import ForgotPage from "./ForgotPasswordPage";
import VerifyOtpPage from "./VerifyOtpPage";
import ChangePasswordPage from "./ChangePasswordPage";

export default function AuthPage() {
  const location = useLocation();
  const path = location.pathname;

  return (
    <div className="min-h-screen w-full flex bg-white font-inter overflow-hidden">
      {/* LEFT HERO - 40% - Fixed & Non-scrollable */}
      <div className="hidden lg:flex lg:w-2/5 fixed left-0 top-0 h-screen">
        <AuthLeftHero />
      </div>

      {/* RIGHT FORMS - 60% - Scrollable */}
      <div className="w-full lg:w-3/5 lg:ml-[40%] min-h-screen flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-md">
          {path === "/login" && <LoginPage />}
          {path === "/signup" && <SignUpPage />}
          {path === "/forgot" && <ForgotPage />}
          {path === "/verify-otp" && <VerifyOtpPage />}
          {path === "/change-password" && <ChangePasswordPage />}
        </div>
      </div>
    </div>
  );
}