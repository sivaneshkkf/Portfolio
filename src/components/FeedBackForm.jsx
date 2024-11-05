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
import { AddFeedBack, UseFetchCollection } from "../firebase/config";

function FeedBackForm() {
  const { feedbackFormOpen, setFeedbackFormOpen } =
    useContext(FeedbackFormContext);
  const { open, once, btnPress } = feedbackFormOpen;

  // Check localStorage on mount to determine initial open state
  // useEffect(() => {
  //     const isFirstVisit = localStorage.getItem("feedbackFormOpened");
  //     if (!isFirstVisit) {
  //         setFeedbackFormOpen({ open: true, once: true });
  //         localStorage.setItem("feedbackFormOpened", "true");
  //     }
  // }, [setFeedbackFormOpen]);

  const schemaValidation = z.object({
    feedbackName: z.string().min(3, { message: "Invalid Name" }).max(30),
    feedbackEmail: z.string().email(),
    message: z.string().min(5, { message: "Enter your message briefly" }),
  });

  const [showMessage, setShowMessage] = useState({
    loading: false,
    success: false,
  });

  // formData
  const sentFormData = (data) => {
    console.log("working");

    setShowMessage({ loading: true, success: false });

    AddFeedBack(data)
      .then((docRef) => {
        console.log("Feedback successfully submitted with ID:", docRef.id);
        setShowMessage({ loading: true, success: true });

        setTimeout(() => {
          setFeedbackFormOpen((pre) => ({
            ...pre,
            open: false,
          }));
          setShowMessage({ loading: false, success: false });
        }, 3000);
      })
      .catch((e) => {
        console.error("Failed to send feedback:", e);
        setShowMessage({ loading: false, success: false });
      });
  };

  // const documents = UseFetchCollection("feedback")

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schemaValidation) });

  return (
    <div
      className={`fixed w-full h-screen flex justify-center items-center inset-0 z-50 dark:bg-white dark:bg-opacity-20 bg-black bg-opacity-20 overflow-y-scroll ${
        open || once ? "block" : "hidden"
      }`}
    >
      <motion.div
        className="p-8 rounded-lg bg-primary dark:bg-dark-primary flex flex-col items-center justify-center w-[30rem] m-2 relative overflow-hidden"
        animate={open || once ? { y: [400, 0] } : { y: 400 }}
        transition={{ duration: 0.7, type: "spring" }}
      >
        <div className="w-full">
          <h4 className="text-center text-textHead dark:text-white font-semibold">
            Feedback
          </h4>
          <div className="w-full h-[1px] bg-dark-icon"></div>
        </div>

        {/* <div className={`${showMessage.success ? "hidden" : "block"}`}>
          <div className="flex items-center justify-center">
            <span>
              <img src={emoji} alt="emoji" className="w-20 h-20" />
            </span>
            <h4 className="text-textHead dark:text-white font-semibold">
              Thank you for scrolling
            </h4>
          </div>
          <p className="text-center w-full text-textHead dark:text-white mb-1">
            Thank you for exploring my portfolio!
          </p>
          <p className="text-xs text-dark-textpara font-medium">
            Your feedback is invaluable in helping me enhance my skills and
            improve the work I present. I appreciate your insights, which
            encourage me to grow and create an even better experience.
          </p>
          
          <form
            onSubmit={handleSubmit(sentFormData)} // Pass sentFormData directly to handleSubmit
            className="w-full space-y-5 pt-5"
          >
            <FeedbackInput
              placeholder="Name"
              id="feedbackName"
              type="text"
              register={register("feedbackName")}
              error={errors.feedbackName}
            />
            <FeedbackInput
              placeholder="Email"
              id="feedbackEmail"
              type="email"
              register={register("feedbackEmail")}
              error={errors.feedbackEmail}
            />
            <div className="space-y-1">
              <textarea
                placeholder="Enter Your Feedback briefly"
                name="feedbackMessage"
                id="feedbackMessage"
                rows={5}
                className={`bg-secondary dark:bg-dark-secondary py-2 px-3 rounded w-full resize-none outline-none text-xs text-textHead dark:text-dark-textHead ${
                  errors.message ? "border-2 border-accent" : ""
                }`}
                {...register("message")}
              ></textarea>
              {errors.message && (
                <span className="text-xs text-red-600 font-medium">
                  {errors.message.message}
                </span>
              )}
            </div>
            <BtnForm text="SUBMIT" loading={showMessage.loading} />
          </form>
         
        </div> */}

        <div className={`${showMessage.success ? "hidden" : "block"}`}>
          <div className="flex items-center justify-center">
            <span>
              <img src={emoji} alt="emoji" className="w-20 h-20" />
            </span>
            <h4 className="text-textHead dark:text-white font-semibold">
              Thank you for scrolling
            </h4>
          </div>
          <p className="text-center w-full text-textHead dark:text-white mb-1">
            Thank you for exploring my portfolio!
          </p>
          <p className="text-xs text-dark-textpara font-medium">
            Your feedback is invaluable in helping me enhance my skills and
            improve the work I present. I appreciate your insights, which
            encourage me to grow and create an even better experience.
          </p>
          <form
            onSubmit={handleSubmit(sentFormData)} // Pass sentFormData directly to handleSubmit
            className="w-full space-y-5 pt-5"
          >
            <FeedbackInput
              placeholder="Name"
              id="feedbackName"
              type="text"
              register={register("feedbackName")}
              error={errors.feedbackName}
            />
            <FeedbackInput
              placeholder="Email"
              id="feedbackEmail"
              type="email"
              register={register("feedbackEmail")}
              error={errors.feedbackEmail}
            />
            <div className="space-y-1">
              <textarea
                placeholder="Enter Your Feedback briefly"
                id="feedbackMessage"
                name="message"
                rows={5}
                className={`bg-secondary dark:bg-dark-secondary py-2 px-3 rounded w-full resize-none outline-none text-xs text-textHead dark:text-dark-textHead ${
                  errors.message ? "border-2 border-accent" : ""
                }`}
                {...register("message")} // Register with "message" as per schema
              ></textarea>
              {errors.message && (
                <span className="text-xs text-red-600 font-medium">
                  {errors.message.message}
                </span>
              )}
            </div>
            <BtnForm text="SUBMIT" loading={showMessage.loading} />
          </form>
        </div>

        <div
          className={`flex flex-col items-center mt-8 justify-center ${
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
            className={`text-center w-full text-white mt-5`}
            animate={showMessage.success && { y: [200, 0] }}
          >
            Thank you for your valuable feedback
          </motion.p>
        </div>

        <span
          className="text-lg p-3 cursor-pointer text-dark-textpara absolute top-1 right-1"
          onClick={() => setFeedbackFormOpen({ open: false, once: false })}
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

export default FeedBackForm;
