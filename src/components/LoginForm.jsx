import { useForm } from "react-hook-form";
import { z } from "zod";
import { useContext, useState, useEffect } from "react";
import emojiThumb from "../images/emojiThump.png";
import FeedbackInput from "./FeedBackInput";
import BtnForm from "./Buttons/BtnForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { logInFirebase } from "../firebase/config";
import { LoginFormContext, LoginStatus } from "../context/LoginFormContext";
import LockRoundedIcon from "@mui/icons-material/LockRounded";

function LoginForm() {
  const { loginFormOpen, setLoginFormOpen } = useContext(LoginFormContext);
  const { loginStatus, setLoginStatus } = useContext(LoginStatus);
  const [loginError, setLoginError] = useState(null);

  useEffect(() => {
    const userId = localStorage.getItem("portfolioUserId");
    if (userId === "kCNccaH0HmbLWK6E6K1ChzXuvbf1") {
      setLoginStatus(true);
    }
  }, []);

  const schemaValidation = z.object({
    loginEmail: z.string().email(),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters long." }),
  });

  const [showMessage, setShowMessage] = useState({
    loading: false,
    success: false,
  });

  // formData
  function sentFormData(data) {
    setShowMessage((pre) => ({
      ...pre,
      loading: true,
    }));

    const { loginEmail, password } = data;

    logInFirebase(loginEmail, password)
      .then((user) => {
        console.log("Login Successfully");

        // Store the user ID in local storage
        localStorage.setItem("portfolioUserId", user.uid); // Assuming `user.uid` is the user ID

        setLoginError(null)
        setShowMessage({ loading: true, success: true });
        setLoginStatus(true);

        setTimeout(() => {
          setLoginFormOpen(false);
          setShowMessage({ loading: false, success: false });
          reset(); // Clear form inputs on success
        }, 3000);
      })
      .catch((e) => {
        console.error("Failed to login:", e);
        setLoginError(e);
        setShowMessage({ loading: false, success: false });
        reset(); // Clear form inputs on failure
      });
  }

  // Inside your component
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset, // Add reset here
  } = useForm({ resolver: zodResolver(schemaValidation) });

  return (
    <div
      className={`fixed w-full h-screen flex justify-center items-center inset-0 z-50 bg-black/50 backdrop-blur-sm overflow-y-scroll transition-opacity duration-300 ${
        loginFormOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      onClick={(e) => {
        if (e.target === e.currentTarget && !loginStatus) {
          setLoginFormOpen(false);
          setShowMessage({ loading: false, success: false });
          setLoginError(null);
        }
      }}
    >
      <motion.div
        className="p-8 sm:p-10 rounded-3xl bg-primary dark:bg-dark-primary shadow-2xl shadow-black/30 border border-black/5 dark:border-white/10 flex flex-col items-center justify-center w-[26rem] max-w-[92vw] m-2 relative overflow-hidden"
        animate={loginFormOpen ? { y: [40, 0], opacity: [0, 1] } : { y: 40, opacity: 0 }}
        transition={{ duration: 0.4, type: "spring" }}
      >
        <div className={`w-full flex flex-col items-center ${loginStatus ? "hidden" : "flex"} ${showMessage.success ? "!hidden" : ""}`}>
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-accent to-[#7c0446] text-white shadow-lg shadow-accent/30 mb-4">
            <LockRoundedIcon fontSize="small" />
          </span>
          <h4 className="text-center text-textHead dark:text-white font-bold text-lg">
            Welcome back
          </h4>
          <p className="text-center text-xs text-textpara dark:text-dark-textpara mt-1">
            Sign in to access the admin dashboard
          </p>
        </div>

        {loginError && (
          <div className="w-full mt-4 rounded-xl border border-red-500/30 bg-red-500/10 px-3 py-2">
            <p className="text-xs text-red-500 font-medium">
              Incorrect email or password. Please try again.
            </p>
          </div>
        )}

        <div className={`w-full ${showMessage.success ? "hidden" : "block"}`}>
          <form
            action="submit"
            name="feedBackForm"
            className={`w-full space-y-4 pt-6 ${
              loginStatus ? "hidden" : "block"
            }`}
            onSubmit={handleSubmit(sentFormData)}
          >
            <FeedbackInput
              lable="Email address"
              placeholder="you@example.com"
              id="loginEmail"
              type="email"
              register={register("loginEmail")}
              error={errors.loginEmail}
              className="!py-3 !px-4 !rounded-xl !text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 transition-shadow duration-200"
            />
            <FeedbackInput
              lable="Password"
              placeholder="••••••••"
              id="password"
              type="password"
              register={register("password")}
              error={errors.password}
              className="!py-3 !px-4 !rounded-xl !text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 transition-shadow duration-200"
            />
            <div className="pt-2">
              <BtnForm
                text="LOGIN"
                loading={showMessage.loading && true}
                className="!rounded-xl !py-3 !text-sm shadow-lg shadow-accent/30 hover:brightness-110 transition-all duration-200"
              />
            </div>
          </form>

          <div className={`${loginStatus ? "block" : "hidden"}`}>
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-accent to-[#7c0446] text-white shadow-lg shadow-accent/30 mb-4 mx-auto">
              <LockRoundedIcon fontSize="small" />
            </span>
            <p className="text-sm text-center text-textHead dark:text-dark-textHead font-medium mb-5">
              You’re currently signed in as admin. Log out?
            </p>
            <div className="flex gap-3">
              <BtnForm
                text="LOGOUT"
                loading={showMessage.loading}
                className="!rounded-xl !py-3 !text-sm"
                onClick={() => {
                  localStorage.removeItem("portfolioUserId", ""); // Clear userID on logout
                  // Add any additional logout logic here
                  setLoginFormOpen(false);
                  setLoginStatus(false);
                }}
              />
              <BtnForm
                text="CANCEL"
                loading={showMessage.loading}
                className="!rounded-xl !py-3 !text-sm !bg-secondary dark:!bg-dark-secondary !text-textHead dark:!text-dark-textHead"
                onClick={() => setLoginFormOpen(false)} // Ensure this is a function
              />
            </div>
          </div>
        </div>

        <div
          className={`flex flex-col items-center mt-2 justify-center ${
            showMessage.success ? "block" : "hidden"
          }`}
        >
          <span className="relative flex items-center justify-center">
            <span className="absolute inset-0 rounded-full bg-hero-success/20 blur-xl scale-150"></span>
            <motion.span
              className="relative"
              animate={showMessage.success ? { scale: [0, 1] } : { scale: 0 }}
              transition={{
                duration: 0.8,
                type: "spring",
              }}
            >
              <img src={emojiThumb} alt="thump" className="w-20 h-20" />
            </motion.span>
          </span>
          <motion.p
            className={`text-center w-full text-textHead dark:text-white mt-5 font-semibold text-sm`}
            animate={showMessage.success && { y: [200, 0] }}
          >
            Login successful
          </motion.p>
          <motion.p
            className="text-center w-full text-textpara dark:text-dark-textpara mt-1 text-xs"
            animate={showMessage.success && { y: [200, 0] }}
          >
            Redirecting you to the dashboard...
          </motion.p>
        </div>

        <span
          className={`p-2 cursor-pointer text-textpara dark:text-dark-textpara hover:text-accent absolute top-3 right-3 rounded-full hover:bg-secondary dark:hover:bg-dark-secondary transition-colors duration-200 ${
            loginStatus ? "hidden" : "block"
          }`}
          onClick={() => {
            setLoginFormOpen(false);
            setShowMessage({ loading: false, success: false });
            setLoginError(null);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            viewBox="0 0 15 15"
          >
            <path
              fill="currentColor"
              d="M3.64 2.27L7.5 6.13l3.84-3.84A.92.92 0 0 1 12 2a1 1 0 0 1 1 1a.9.9 0 0 1-.27.66L8.84 7.5l3.89 3.89A.9.9 0 0 1 13 12a1 1 0 0 1-1 1a.92.92 0 0 1-.69-.27L7.5 8.87l-3.85 3.85A.92.92 0 0 1 3 13a1 1 0 0 1-1-1a.9.9 0 0 1 .27-.66L6.16 7.5L2.27 3.61A.9.9 0 0 1 2 3a1 1 0 0 1 1-1c.24.003.47.1.64.27"
            ></path>
          </svg>
        </span>
      </motion.div>
    </div>
  );
}

export default LoginForm;
