import { useForm } from "react-hook-form";
import { z } from "zod";
import { useContext, useState, useEffect } from "react";
import emoji from "../images/emoji.png";
import emojiThumb from "../images/emojiThump.png";
import FeedbackInput from "./FeedBackInput";
import BtnForm from "./Buttons/BtnForm";
import { FeedbackFormContext } from "../context/FeedBackFormContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import {
  AddFeedBack,
  logInFirebase,
  UseFetchCollection,
} from "../firebase/config";
import { LoginFormContext, LoginStatus } from "../context/LoginFormContext";
import { LocalParking } from "@mui/icons-material";

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

  // Check localStorage on mount to determine initial open state
  // useEffect(() => {
  //     const isFirstVisit = localStorage.getItem("feedbackFormOpened");
  //     if (!isFirstVisit) {
  //         setFeedbackFormOpen({ open: true, once: true });
  //         localStorage.setItem("feedbackFormOpened", "true");
  //     }
  // }, [setFeedbackFormOpen]);

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
      className={`fixed w-full h-screen flex justify-center items-center inset-0 z-50 dark:bg-white dark:bg-opacity-20 bg-black bg-opacity-20 overflow-y-scroll ${
        loginFormOpen ? "block" : "hidden"
      }`}
    >
      <motion.div
        className="p-8 rounded-lg bg-primary dark:bg-dark-primary flex flex-col items-center justify-center w-[30rem] m-2 relative overflow-hidden"
        animate={loginFormOpen ? { y: [300, 0] } : { y: 300 }}
        transition={{ duration: 0.5, type: "spring" }}
      >
        <div className={`w-full ${loginStatus ? "hidden" : "block"}`}>
          <h4 className="text-center text-textHead dark:text-white font-semibold mb-2">
            Login
          </h4>
          <div className="w-full h-[1px] bg-dark-icon"></div>
        </div>
        <div>
          <p className="text-xs text-red-600 mt-2">{loginError}</p>
        </div>
        <div className={`w-full ${showMessage.success ? "hidden" : "block"}`}>
          <form
            action="submit"
            name="feedBackForm"
            className={`w-full space-y-5  pt-5 ${
              loginStatus ? "hidden" : "block"
            }`}
            onSubmit={handleSubmit(sentFormData)}
          >
            <FeedbackInput
              placeholder="Email"
              id="loginEmail"
              type="email"
              register={register("loginEmail")}
              error={errors.loginEmail}
            />
            <FeedbackInput
              placeholder="Password"
              id="password"
              type="password"
              register={register("password")}
              error={errors.password}
            />
            <BtnForm text="LOGIN" loading={showMessage.loading && true} />
          </form>

          <div
            className={`${loginStatus ? "block" : "hidden"}`}
          >
            <p className="text-xs text-textHead dark:text-dark-textHead font-medium mb-5">
              Are you sure you want to log out?
            </p>
            <div className="flex gap-3 ">
              <BtnForm
                text="LOGOUT"
                loading={showMessage.loading}
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
                className="bg-gray-300 text-gray-600"
                onClick={() => setLoginFormOpen(false)} // Ensure this is a function
              />
            </div>
          </div>
        </div>

        <div
          className={`flex flex-col items-center mt-4 justify-center ${
            showMessage.success ? "block" : "hidden"
          }`}
        >
          <motion.span
            animate={showMessage.success ? { scale: [0, 1] } : { scale: 0 }}
            transition={{
              duration: 0.8,
              type: "spring",
            }}
          >
            <img src={emojiThumb} alt="thump" className="w-20 h-20" />
          </motion.span>
          <motion.p
            className={`text-center w-full text-textHead dark:text-white mt-5 font-semibold text-sm`}
            animate={showMessage.success && { y: [200, 0] }}
          >
            Login successfully
          </motion.p>
        </div>

        <span
          className={`text-lg p-3 cursor-pointer text-dark-textpara absolute top-1 right-1 ${
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
