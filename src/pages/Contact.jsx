import TheHeading from "../components/TheHeading";
import sectionIDS from "../data/SectionIDS";
import { ContactData } from "../data/ContactData";
import ContactInput from "../components/ContactInput";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { FadeIn } from "../varients/varientAnim";

function Contact() {
  const schemaValidation = z.object({
    name: z.string().min(3, { message: "Invalid Name" }).max(40),
    phoneNumber: z.string().min(10, { message: "Invalid Number" }).max(10),
    email: z.string().email(),
    message: z.string().min(2, { message: "Enter your message breifly" }),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schemaValidation) });

  async function getFormData(data) {
   
    const mailObj={...data}
    event.preventDefault();
      const formData = new FormData(event.target);
  
      mailObj.access_key="9b19e215-8878-45d3-8f85-a6ca812579c3";
  
      const json = JSON.stringify(mailObj);
      console.log(json)
  
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: json
      }).then((res) => res.json());
  
      if (res.success) {
        alert("Message sent successfully")
      }
  }

  // console.log(errors);

  return (
    <div className="px-10 pb-5 pt-5 bg-primary dark:bg-dark-secondary">
      <TheHeading heading="CONTACT" id={sectionIDS.contact.sectionId} />
      <div className="md:flex space-y-10 md:space-y-0 lg:gap-20 gap-10 justify-center mt-10">
        <motion.div
          className="group xl:w-2/6 lg:w-3/6 md:w-4/6 px-8 py-24 bg-white flex flex-col gap-10 overflow-hidden items-center justify-center shadow-cardShadow rounded-2xl relative hover:backdrop-blur-2xl"
          variants={FadeIn("left", 0.2)}
          initial="hidden"
          whileInView={"show"}
          viewport={{ once: false, amount: 0.2 }}
        >
          <div className="absolute inset-0 bg-[url('../src/images/card.png')] dark:bg-[url('../src/images/cardDark.png')] group-hover:-inset-10 transition-all duration-300 ease-out z-10 bg-cover bg-center "></div>

          <ul className="space-y-2 z-10">
            {ContactData.map((d, index) => (
              <li className="flex items-center gap-3" key={index}>
                <span dangerouslySetInnerHTML={{ __html: d.svg }}></span>
                <p className="text-textHead dark:text-dark-textHead text-sm font-semibold">{d.data}</p>
              </li>
            ))}
          </ul>

          <div className="flex gap-3 mr-auto absolute bottom-8 left-8 z-10">
            <a
              href="https://www.instagram.com/siva_innocent_soul/profilecard/?igsh=MTV0cGRzZXNzMmw3ZQ== "
              target="blank"
            >
              <svg
                width="25"
                height="25"
                viewBox="0 0 25 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="cursor-pointer transition-all duration-150 hover:transform hover:-translate-y-1 text-[#374A5D] dark:text-dark-textHead"
              >
                <g clipPath="url(#clip0_102_699)">
                  <path
                    d="M13.6898 0.926758C14.9919 0.93023 15.6528 0.937174 16.2234 0.953378L16.4479 0.96148C16.7072 0.970739 16.963 0.982313 17.272 0.996202C18.5035 1.05407 19.3438 1.24852 20.081 1.5344C20.8449 1.82838 21.4885 2.22653 22.132 2.86889C22.7207 3.44728 23.1762 4.14721 23.4665 4.91981C23.7523 5.65708 23.9468 6.49736 24.0047 7.73C24.0185 8.03787 24.0301 8.29366 24.0394 8.55407L24.0463 8.77861C24.0637 9.34805 24.0706 10.0089 24.0729 11.311L24.0741 12.1744V13.6906C24.0769 14.5349 24.068 15.3791 24.0475 16.2231L24.0405 16.4476C24.0313 16.708 24.0197 16.9638 24.0058 17.2717C23.9479 18.5043 23.7512 19.3434 23.4665 20.0819C23.1762 20.8545 22.7207 21.5544 22.132 22.1328C21.5536 22.7215 20.8536 23.177 20.081 23.4673C19.3438 23.7531 18.5035 23.9476 17.272 24.0055L16.4479 24.0402L16.2234 24.0471C15.6528 24.0633 14.9919 24.0714 13.6898 24.0737L12.8264 24.0749H11.3114C10.4668 24.0779 9.62216 24.069 8.7778 24.0483L8.55327 24.0413C8.27851 24.0309 8.00381 24.019 7.72919 24.0055C6.49771 23.9476 5.65743 23.7531 4.91901 23.4673C4.14682 23.1768 3.4473 22.7214 2.86924 22.1328C2.28005 21.5545 1.82423 20.8546 1.53359 20.0819C1.24771 19.3446 1.05327 18.5043 0.995396 17.2717L0.960673 16.4476L0.954887 16.2231C0.933551 15.3791 0.923905 14.5349 0.925951 13.6906V11.311C0.922748 10.4668 0.931236 9.62259 0.951414 8.77861L0.959516 8.55407C0.968775 8.29366 0.980349 8.03787 0.994238 7.73C1.05211 6.49736 1.24655 5.65824 1.53243 4.91981C1.82375 4.14689 2.28038 3.44694 2.8704 2.86889C3.44812 2.2804 4.14723 1.82499 4.91901 1.5344C5.65743 1.24852 6.49655 1.05407 7.72919 0.996202C8.03706 0.982313 8.29401 0.970739 8.55327 0.96148L8.7778 0.954536C9.62178 0.933972 10.466 0.925097 11.3102 0.927915L13.6898 0.926758ZM12.5 6.71379C10.9652 6.71379 9.49325 7.3235 8.40797 8.40878C7.32269 9.49406 6.71299 10.966 6.71299 12.5008C6.71299 14.0356 7.32269 15.5076 8.40797 16.5929C9.49325 17.6782 10.9652 18.2879 12.5 18.2879C14.0348 18.2879 15.5068 17.6782 16.5921 16.5929C17.6774 15.5076 18.2871 14.0356 18.2871 12.5008C18.2871 10.966 17.6774 9.49406 16.5921 8.40878C15.5068 7.3235 14.0348 6.71379 12.5 6.71379ZM12.5 9.02861C12.956 9.02853 13.4075 9.11827 13.8288 9.2927C14.2501 9.46712 14.6329 9.72282 14.9554 10.0452C15.2779 10.3676 15.5337 10.7503 15.7083 11.1715C15.8829 11.5928 15.9727 12.0443 15.9728 12.5003C15.9729 12.9562 15.8832 13.4078 15.7087 13.8291C15.5343 14.2504 15.2786 14.6332 14.9562 14.9557C14.6339 15.2781 14.2511 15.534 13.8299 15.7085C13.4087 15.8831 12.9572 15.973 12.5012 15.9731C11.5803 15.9731 10.6971 15.6072 10.046 14.9561C9.39478 14.3049 9.02896 13.4217 9.02896 12.5008C9.02896 11.5799 9.39478 10.6968 10.046 10.0456C10.6971 9.39443 11.5803 9.02861 12.5012 9.02861M18.5776 4.97768C18.1939 4.97768 17.8259 5.13011 17.5546 5.40143C17.2832 5.67275 17.1308 6.04074 17.1308 6.42444C17.1308 6.80815 17.2832 7.17614 17.5546 7.44746C17.8259 7.71878 18.1939 7.8712 18.5776 7.8712C18.9613 7.8712 19.3293 7.71878 19.6006 7.44746C19.8719 7.17614 20.0243 6.80815 20.0243 6.42444C20.0243 6.04074 19.8719 5.67275 19.6006 5.40143C19.3293 5.13011 18.9613 4.97768 18.5776 4.97768Z"
                    fill="currentcolor"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_102_699">
                    <rect width="25" height="25" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </a>
            <a href="http://Wa.me/+917010037476" target="blank">
              <svg
                width="25"
                height="25"
                viewBox="0 0 25 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="cursor-pointer transition-all duration-150 hover:transform hover:-translate-y-1  text-[#374A5D] dark:text-dark-textHead"
              >
                <g clipPath="url(#clip0_102_701)">
                  <path
                    d="M12.5011 0.926758C18.8935 0.926758 24.0752 6.10847 24.0752 12.5008C24.0752 18.8932 18.8935 24.0749 12.5011 24.0749C10.4557 24.0784 8.44621 23.5371 6.67933 22.5066L0.931649 24.0749L2.49646 18.3249C1.46517 16.5575 0.923435 14.5471 0.92702 12.5008C0.92702 6.10847 6.10873 0.926758 12.5011 0.926758ZM8.55665 7.06102L8.32517 7.07028C8.1755 7.08059 8.02927 7.1199 7.89461 7.18602C7.76912 7.25721 7.65452 7.34608 7.55433 7.44991C7.41545 7.58069 7.33674 7.69412 7.25225 7.80407C6.82415 8.36067 6.59365 9.04402 6.59716 9.7462C6.59947 10.3133 6.74762 10.8654 6.9791 11.3816C7.45248 12.4256 8.23142 13.5309 9.2592 14.5552C9.50688 14.8018 9.74994 15.0494 10.0115 15.2798C11.2886 16.4041 12.8104 17.2149 14.456 17.6478L15.1134 17.7485C15.3275 17.7601 15.5416 17.7439 15.7569 17.7335C16.0939 17.7157 16.423 17.6244 16.721 17.4661C16.8724 17.3878 17.0203 17.3028 17.1643 17.2115C17.1643 17.2115 17.2133 17.1783 17.309 17.1073C17.4652 16.9916 17.5613 16.9094 17.6909 16.774C17.7881 16.6737 17.8692 16.5572 17.934 16.4244C18.0242 16.2358 18.1145 15.8758 18.1516 15.5761C18.1793 15.3469 18.1712 15.2219 18.1678 15.1444C18.1631 15.0205 18.0601 14.892 17.9479 14.8376L17.2742 14.5356C17.2742 14.5356 16.2673 14.0969 15.6516 13.8168C15.5871 13.7887 15.5181 13.7727 15.4479 13.7694C15.3687 13.7611 15.2886 13.7699 15.2131 13.7953C15.1376 13.8206 15.0685 13.8619 15.0104 13.9163C15.0046 13.914 14.927 13.98 14.0902 14.9939C14.0422 15.0584 13.976 15.1072 13.9002 15.134C13.8243 15.1608 13.7422 15.1644 13.6643 15.1444C13.5889 15.1242 13.515 15.0987 13.4432 15.068C13.2997 15.0078 13.2499 14.9846 13.1516 14.943C12.4871 14.6535 11.872 14.2618 11.3286 13.7821C11.1828 13.6548 11.0474 13.5159 10.9085 13.3816C10.4532 12.9455 10.0564 12.4522 9.72795 11.914L9.65966 11.8041C9.61135 11.7298 9.57174 11.6502 9.5416 11.5668C9.49762 11.3967 9.6122 11.2601 9.6122 11.2601C9.6122 11.2601 9.89345 10.9522 10.0242 10.7856C10.1516 10.6235 10.2592 10.4661 10.3286 10.3538C10.4652 10.1339 10.508 9.90824 10.4363 9.73347C10.1122 8.9418 9.77733 8.15438 9.43165 7.3712C9.36336 7.21611 9.16082 7.105 8.97679 7.08301C8.91429 7.07529 8.85179 7.06912 8.78929 7.06449C8.63388 7.05558 8.47805 7.05712 8.32285 7.06912L8.55665 7.06102Z"
                    fill="currentcolor"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_102_701">
                    <rect width="25" height="25" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </a>
            <a
              href="https://www.linkedin.com/in/sivanesh-raja-2aa575240"
              target="blank"
            >
              <svg
                width="25"
                height="25"
                viewBox="0 0 25 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="cursor-pointer transition-all duration-150 hover:transform hover:-translate-y-1  text-[#374A5D] dark:text-dark-textHead"
              >
                <path
                  d="M5.56383 3.92193C5.5635 4.57197 5.30496 5.19526 4.84508 5.65468C4.38521 6.1141 3.76166 6.37201 3.11162 6.37169C2.46158 6.37136 1.83829 6.11282 1.37887 5.65295C0.919456 5.19307 0.661541 4.56952 0.661866 3.91948C0.662191 3.26944 0.92073 2.64615 1.38061 2.18674C1.84049 1.72732 2.46403 1.4694 3.11407 1.46973C3.76411 1.47005 4.3874 1.72859 4.84682 2.18847C5.30624 2.64835 5.56415 3.27189 5.56383 3.92193ZM5.63736 8.18664H0.735395V23.5298H5.63736V8.18664ZM13.3825 8.18664H8.505V23.5298H13.3334V15.4783C13.3334 10.993 19.179 10.5763 19.179 15.4783V23.5298H24.0197V13.8116C24.0197 6.25036 15.3677 6.53223 13.3334 10.2455L13.3825 8.18664Z"
                  fill="currentcolor"
                />
              </svg>
            </a>
            <a
              href="https://www.facebook.com/profile.php?id=100005058169350"
              target="blank"
            >
              <svg
                width="25"
                height="25"
                viewBox="0 0 25 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="cursor-pointer transition-all duration-150 hover:transform hover:-translate-y-1  text-[#374A5D] dark:text-dark-textHead"
              >
                <g clipPath="url(#clip0_102_707)">
                  <path
                    d="M22.8008 0.926758H2.19893C1.86127 0.926758 1.53744 1.06089 1.29868 1.29965C1.05992 1.53842 0.925781 1.86225 0.925781 2.19991V22.8018C0.925781 23.1394 1.05992 23.4632 1.29868 23.702C1.53744 23.9408 1.86127 24.0749 2.19893 24.0749H13.2869V15.105H10.2776V11.6328H13.2869V9.02861C13.2246 8.41722 13.2967 7.79959 13.4984 7.21905C13.7 6.6385 14.0262 6.1091 14.4541 5.66797C14.882 5.22685 15.4012 4.88468 15.9753 4.66546C16.5495 4.44624 17.1646 4.35529 17.7776 4.39898C18.6785 4.39276 19.5789 4.43914 20.4744 4.53787V7.66287H18.6341C17.1758 7.66287 16.898 8.35731 16.898 9.36426V11.5981H20.3702L19.9188 15.0703H16.898V24.0749H22.8008C22.968 24.0749 23.1335 24.042 23.288 23.978C23.4425 23.914 23.5828 23.8202 23.701 23.702C23.8193 23.5838 23.913 23.4434 23.977 23.289C24.041 23.1345 24.0739 22.969 24.0739 22.8018V2.19991C24.0739 2.03271 24.041 1.86716 23.977 1.71269C23.913 1.55823 23.8193 1.41788 23.701 1.29965C23.5828 1.18143 23.4425 1.08765 23.288 1.02367C23.1335 0.959689 22.968 0.926758 22.8008 0.926758Z"
                    fill="currentcolor"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_102_707">
                    <rect width="25" height="25" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </a>
          </div>

          <span className="absolute top-0 left-0 hidden">
            <svg
              width="322"
              height="292"
              viewBox="0 0 322 292"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="cursor-pointer transition-all duration-150 hover:transform hover:-translate-y-1"
            >
              <rect
                x="-253"
                y="78.8232"
                width="515.169"
                height="284"
                transform="rotate(-41.4201 -253 78.8232)"
                fill="#FF0051"
              />
            </svg>
          </span>
          <span className="absolute bottom-0 right-0 hidden">
            <svg
              width="331"
              height="327"
              viewBox="0 0 331 327"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="cursor-pointer transition-all duration-150 hover:transform hover:-translate-y-1"
            >
              <rect
                y="356.309"
                width="509.124"
                height="284"
                transform="rotate(-44.4147 0 356.309)"
                fill="#FF0051"
              />
            </svg>
          </span>
        </motion.div>

        <motion.div
          className="xl:w-2/6 lg:w-3/6 md:w-4/6 p-8 bg-white dark:bg-dark-primary flex flex-col gap-5 items-center shadow-cardShadow rounded-2xl"
          variants={FadeIn("right", 0.2)}
          initial="hidden"
          whileInView={"show"}
          viewport={{ once: false, amount: 0.2 }}
        >
          <form
            action="submit"
            className="flex flex-col justify-between gap-2 h-full w-full"
            onSubmit={handleSubmit(getFormData)}
          >
            <ContactInput
              lable="Name"
              id="name"
              type="text"
              register={register("name")}
              error={errors.name}
            />

            <ContactInput
              lable="Phone Number"
              id="phoneNumber"
              type="text"
              register={register("phoneNumber")}
              error={errors.phoneNumber}
            />

            <ContactInput
              lable="Email"
              id="email"
              type="email"
              register={register("email")}
              error={errors.email}
            />

            <div className="space-y-1">
              <label
                htmlFor="message"
                className="text-xs md:text-sm text-textHead dark:text-dark-textHead font-semibold"
              >
                Message
              </label>
              <textarea
                name="message"
                id="message"
                rows={5}
                className={`bg-secondary dark:bg-dark-secondary py-2 px-3 rounded w-full resize-none outline-none ${
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
            <motion.button
              className="group md:py-2 md:px-3 py-1 px-2 mt-5 flex gap-2 items-center mx-auto bg-accent rounded text-white text-xs md:text-sm font-normal md:font-semibold text-center"
              whileHover="hover"
            >
              SEND MESSAGE
              <motion.span
                variants={{
                  hover: {
                    scale: 1.3,
                  },
                }}
                initial={{ scale: 1 }}
                transition={{
                  ease: "easeInOut",
                  duration: 0.5,
                }}
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_102_725)">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M18.2715 5.33675L5.67946 9.88975L9.87446 12.3178L13.5735 8.61775C13.7611 8.43024 14.0155 8.32495 14.2808 8.32505C14.5461 8.32514 14.8005 8.43061 14.988 8.61825C15.1755 8.80589 15.2808 9.06033 15.2807 9.3256C15.2806 9.59087 15.1751 9.84524 14.9875 10.0328L11.2875 13.7328L13.7175 17.9268L18.2715 5.33675ZM18.5945 3.09275C19.7895 2.65975 20.9475 3.81775 20.5145 5.01275L15.2325 19.6178C14.7985 20.8158 13.1625 20.9618 12.5235 19.8587L9.30646 14.3008L3.74846 11.0838C2.64546 10.4448 2.79146 8.80875 3.98946 8.37475L18.5945 3.09275Z"
                      fill="white"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_102_725">
                      <rect width="24" height="24" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </motion.span>
            </motion.button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}

export default Contact;
