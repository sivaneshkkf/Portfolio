import { useForm } from "react-hook-form";
import { z } from "zod";
import { useContext, useState, useEffect } from "react";
import ContactInput from "./ContactInput";
import BtnForm from "./Buttons/BtnForm";
import ConfettiBurst from "./ConfettiBurst";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, useReducedMotion } from "motion/react";
import { logInFirebase } from "../firebase/config";
import { LoginFormContext, LoginStatus } from "../context/LoginFormContext";
import LockRoundedIcon from "@mui/icons-material/LockRounded";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

function LoginForm() {
  const { loginFormOpen, setLoginFormOpen } = useContext(LoginFormContext);
  const { loginStatus, setLoginStatus } = useContext(LoginStatus);
  const [loginError, setLoginError] = useState(null);
  const prefersReducedMotion = useReducedMotion();

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
    watch,
    formState: { errors },
    reset, // Add reset here
  } = useForm({ resolver: zodResolver(schemaValidation) });

  const watchedValues = watch();

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
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-hero-primary to-hero-secondary text-white shadow-lg shadow-hero-primary/30 mb-4">
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
            noValidate
            className={`w-full space-y-4 pt-6 ${
              loginStatus ? "hidden" : "block"
            }`}
            onSubmit={handleSubmit(sentFormData)}
          >
            <ContactInput
              lable="Email address"
              id="loginEmail"
              type="email"
              icon={<AlternateEmailIcon fontSize="small" />}
              register={register("loginEmail")}
              error={errors.loginEmail}
              success={!errors.loginEmail && !!watchedValues.loginEmail}
            />
            <ContactInput
              lable="Password"
              id="password"
              type="password"
              icon={<LockRoundedIcon fontSize="small" />}
              register={register("password")}
              error={errors.password}
              success={!errors.password && !!watchedValues.password}
            />
            <div className="pt-2">
              <BtnForm
                text="LOGIN"
                loading={showMessage.loading && true}
                className="!rounded-xl !py-3 !text-sm"
              />
            </div>
          </form>

          <div className={`${loginStatus ? "block" : "hidden"}`}>
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-hero-primary to-hero-secondary text-white shadow-lg shadow-hero-primary/30 mb-4 mx-auto">
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
          className={`relative flex w-full flex-col items-center justify-center px-2 py-2 text-center ${
            showMessage.success ? "flex" : "hidden"
          }`}
        >
          {!prefersReducedMotion && <ConfettiBurst count={12} />}

          <motion.span
            initial={{ scale: 0 }}
            animate={showMessage.success ? { scale: 1 } : { scale: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 18, delay: 0.1 }}
            className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-hero-success/30 to-hero-primary/20 text-hero-success shadow-[0_0_30px_-6px_rgba(34,197,94,0.6)]"
          >
            <CheckCircleIcon sx={{ fontSize: 38 }} />
          </motion.span>

          <motion.h4
            className="mt-5 font-manrope text-xl font-extrabold text-textHead dark:text-dark-textHead"
            animate={showMessage.success && { y: [16, 0], opacity: [0, 1] }}
            transition={{ delay: 0.2, duration: 0.4 }}
          >
            🎉 Login Successful!
          </motion.h4>
          <motion.p
            className="mt-1 text-xs text-textpara dark:text-dark-textpara"
            animate={showMessage.success && { y: [16, 0], opacity: [0, 1] }}
            transition={{ delay: 0.3, duration: 0.4 }}
          >
            Redirecting you to the dashboard...
          </motion.p>

          <div className="mt-4 h-1 w-32 overflow-hidden rounded-full bg-secondary dark:bg-dark-secondary">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-hero-primary to-hero-secondary"
              initial={{ width: "0%" }}
              animate={showMessage.success ? { width: "100%" } : { width: "0%" }}
              transition={{ duration: 3, ease: "linear" }}
            ></motion.div>
          </div>
        </div>

        <span
          className={`p-2 cursor-pointer text-textpara dark:text-dark-textpara hover:text-hero-primary absolute top-3 right-3 rounded-full hover:bg-secondary dark:hover:bg-dark-secondary transition-colors duration-200 ${
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
