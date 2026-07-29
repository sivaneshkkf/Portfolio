import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "motion/react";
import TheHeading from "../components/TheHeading";
import ContactInput from "../components/ContactInput";
import ContactDetailCard from "../components/ContactDetailCard";
import QuickStatCard from "../components/QuickStatCard";
import SocialButton from "../components/SocialButton";
import SendBtn from "../components/Buttons/SendBtn";
import CtaButton from "../components/Buttons/CtaButton";
import sectionIDS from "../data/SectionIDS";
import { ContactData } from "../data/ContactData";
import { SocialLinks } from "../data/SocialLinks";
import { FadeIn, SuccessMessage } from "../varients/varientAnim";
import { useReveal } from "../hooks/useReveal";
import { AddMessage } from "../firebase/config";

import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import SubjectIcon from "@mui/icons-material/Subject";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import GitHubIcon from "@mui/icons-material/GitHub";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";

const CONTACT_ICONS = {
  email: EmailIcon,
  phone: PhoneIcon,
  location: LocationOnIcon,
  github: GitHubIcon,
};

function Contact() {
  const badge = useReveal();
  const heading = useReveal();
  const lead = useReveal();
  const greetingCard = useReveal();
  const availabilityCard = useReveal();
  const formCard = useReveal();
  const cta = useReveal();

  const schemaValidation = z.object({
    name: z.string().min(3, { message: "Invalid Name" }).max(40),
    email: z.string().email(),
    subject: z.string().min(3, { message: "Add a short subject" }).max(80),
    message: z.string().min(2, { message: "Enter your message briefly" }),
  });

  const [showMessage, setShowMessage] = useState({
    anim: false,
    text: false,
    btnAnim: false,
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schemaValidation) });

  const watchedValues = watch();

  async function getFormData(data) {
    const mailObj = { ...data };

    setShowMessage((pre) => ({
      ...pre,
      btnAnim: true,
    }));

    addMessage(data);

    mailObj.access_key = "9b19e215-8878-45d3-8f85-a6ca812579c3";

    const json = JSON.stringify(mailObj);

    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: json,
    }).then((res) => res.json());

    if (res.success) {
      setShowMessage((pre) => ({ ...pre, anim: true, btnAnim: false }));
      setTimeout(() => {
        setShowMessage((pre) => ({
          ...pre,
          text: true,
        }));
      }, 1000);
    }
  }

  const addMessage = (data) => {
    AddMessage(data)
      .then((docRef) => {
        console.log("Message successfully submitted with ID:", docRef.id);
      })
      .catch((e) => {
        console.error("Failed to add Message:", e);
      });
  };

  return (
    <div className="relative overflow-hidden bg-primary dark:bg-gradient-to-b dark:from-[#020617] dark:via-hero-bg dark:to-hero-bg2 py-20 sm:py-28 lg:py-36 px-5">
      {/* decorative background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute top-1/2 -left-24 -translate-y-1/2 w-96 h-96 rounded-full bg-hero-primary/10 dark:bg-hero-primary/25 blur-[200px] dark:animate-blob"></div>
        <div className="absolute top-1/4 -right-24 -translate-y-1/2 w-96 h-96 rounded-full bg-hero-secondary/10 dark:bg-hero-secondary/25 blur-[200px] dark:animate-blobSlow"></div>
      </div>

      <div className="mx-auto max-w-7xl">
        {/* header */}
        <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-20">
          <motion.div
            ref={badge.ref}
            variants={FadeIn("up", 0.1, 0)}
            initial="hidden"
            animate={badge.inView ? "show" : "hidden"}
            className="inline-flex items-center gap-2 rounded-full border border-black/5 dark:border-white/10 bg-white/70 dark:bg-white/5 backdrop-blur-md px-4 py-1.5 mb-4"
          >
            <span className="text-sm">📩</span>
            <span className="text-xs font-semibold text-textpara dark:text-dark-textpara">
              Contact Me
            </span>
          </motion.div>

          <TheHeading
            heading="GET IN TOUCH"
            id={sectionIDS.contact.sectionId}
          />

          <motion.h2
            ref={heading.ref}
            variants={FadeIn("up", 0.2, 0)}
            initial="hidden"
            animate={heading.inView ? "show" : "hidden"}
            className="mt-4 font-manrope text-4xl sm:text-5xl lg:text-[3.25rem] font-extrabold tracking-tight leading-[1.1] text-textHead dark:text-dark-textHead"
          >
            Let&apos;s Build Something{" "}
            <span className="bg-gradient-to-r from-hero-primary via-hero-secondary to-hero-accent bg-clip-text text-transparent">
              Amazing Together
            </span>
          </motion.h2>

          <motion.p
            ref={lead.ref}
            variants={FadeIn("up", 0.3, 0)}
            initial="hidden"
            animate={lead.inView ? "show" : "hidden"}
            className="mt-4 text-sm sm:text-base text-textpara dark:text-dark-textpara"
          >
            I&apos;m always open to discussing full-time opportunities,
            freelance projects, collaborations, or simply talking about
            technology.
          </motion.p>
        </div>

        {/* info + form */}
        <div className="grid lg:grid-cols-5 gap-10 lg:gap-14 items-start">
          {/* contact information */}
          <div className="lg:col-span-2 space-y-6">
            <motion.div
              ref={greetingCard.ref}
              variants={FadeIn("left", 0.2, 0)}
              initial="hidden"
              animate={greetingCard.inView ? "show" : "hidden"}
              whileHover={{ y: -4 }}
              className="rounded-[24px] p-[1.5px] bg-gradient-to-br from-hero-primary/40 via-hero-secondary/30 to-hero-accent/30 shadow-xl shadow-black/5 transition-shadow duration-500 hover:shadow-2xl"
            >
              <div className="rounded-[22px] bg-white/80 dark:bg-white/[0.04] backdrop-blur-xl px-7 py-8 sm:px-8 sm:py-9">
                <span className="text-3xl">👋</span>
                <h3 className="mt-3 font-manrope text-xl sm:text-2xl font-bold text-textHead dark:text-dark-textHead">
                  Nice to meet you!
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-textpara dark:text-dark-textpara">
                  Thanks for visiting my portfolio. If you have a project, job
                  opportunity, or just want to connect, I&apos;d love to hear
                  from you.
                </p>
              </div>
            </motion.div>

            <div className="space-y-3">
              {ContactData.map((d, index) => {
                const Icon = CONTACT_ICONS[d.type];
                return (
                  <ContactDetailCard
                    key={d.type}
                    icon={<Icon fontSize="small" />}
                    label={d.label}
                    value={d.value}
                    href={d.href}
                    copyable={d.copyable}
                    delay={0.1 * index}
                  />
                );
              })}
            </div>

            <motion.div
              ref={availabilityCard.ref}
              variants={FadeIn("up", 0.3, 0)}
              initial="hidden"
              animate={availabilityCard.inView ? "show" : "hidden"}
              className="flex items-center gap-3 rounded-2xl border border-black/5 dark:border-white/10 bg-white/70 dark:bg-white/5 backdrop-blur-md px-5 py-4"
            >
              <span className="relative flex h-3 w-3 shrink-0">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-hero-success opacity-75"></span>
                <span className="relative inline-flex h-3 w-3 rounded-full bg-hero-success"></span>
              </span>
              <div>
                <p className="text-sm font-semibold text-textHead dark:text-dark-textHead">
                  Available for Full-Time Opportunities
                </p>
                <p className="text-xs text-textpara dark:text-dark-textpara">
                  Also open to freelance projects & collaborations
                </p>
              </div>
            </motion.div>

            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-textpara dark:text-dark-textpara">
                Quick Stats
              </p>
              <div className="grid grid-cols-2 gap-3">
                <QuickStatCard
                  icon="⚡"
                  text="Replies within 24 hours"
                  delay={0.1}
                />
                <QuickStatCard icon="🌍" text="Remote friendly" delay={0.15} />
                <QuickStatCard icon="💼" text="Open to work" delay={0.2} />
                <QuickStatCard
                  icon="🤝"
                  text="Collaboration welcome"
                  delay={0.25}
                />
              </div>
            </div>

            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-textpara dark:text-dark-textpara">
                Connect With Me
              </p>
              <div className="flex flex-wrap gap-3">
                {SocialLinks.map((social, index) => (
                  <SocialButton
                    key={social.name}
                    href={social.href}
                    label={social.name}
                    icon={<social.icon fontSize="small" />}
                    brand={social.brand}
                    brandDark={social.brandDark}
                    delay={0.1 * index}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* form */}
          <motion.div
            ref={formCard.ref}
            variants={FadeIn("right", 0.2, 0)}
            initial="hidden"
            animate={formCard.inView ? "show" : "hidden"}
            className="lg:col-span-3 rounded-[24px] border border-black/5 dark:border-white/10 bg-white/80 dark:bg-white/[0.04] backdrop-blur-xl shadow-xl shadow-black/5 p-7 sm:p-10"
          >
            <form
              noValidate
              className={showMessage.anim ? "hidden" : "block"}
              onSubmit={handleSubmit(getFormData)}
            >
              <h3 className="font-manrope text-xl sm:text-2xl font-bold text-textHead dark:text-dark-textHead">
                Send Me a Message
              </h3>
              <p className="mt-1 mb-7 text-sm text-textpara dark:text-dark-textpara">
                Fill out the form below and I&apos;ll get back to you within 24
                hours.
              </p>

              <div className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <ContactInput
                    lable="Name"
                    id="name"
                    type="text"
                    icon={<PersonOutlineIcon fontSize="small" />}
                    register={register("name")}
                    error={errors.name}
                    success={!errors.name && !!watchedValues.name}
                  />
                  <ContactInput
                    lable="Email"
                    id="email"
                    type="email"
                    icon={<AlternateEmailIcon fontSize="small" />}
                    register={register("email")}
                    error={errors.email}
                    success={!errors.email && !!watchedValues.email}
                  />
                </div>

                <ContactInput
                  lable="Subject"
                  id="subject"
                  type="text"
                  icon={<SubjectIcon fontSize="small" />}
                  register={register("subject")}
                  error={errors.subject}
                  success={!errors.subject && !!watchedValues.subject}
                />

                <ContactInput
                  lable="Message"
                  id="message"
                  icon={<ChatBubbleOutlineIcon fontSize="small" />}
                  register={register("message")}
                  error={errors.message}
                  success={!errors.message && !!watchedValues.message}
                  multiline
                  rows={5}
                />

                <div className="pt-2 flex justify-center sm:justify-start">
                  <SendBtn showMessage={showMessage} text="Send Message" />
                </div>
              </div>
            </form>

            <div
              className={`${
                showMessage.anim ? "flex" : "hidden"
              } flex-col items-center justify-center py-8 text-center`}
            >
              <SuccessMessage showMessage={showMessage} />
            </div>
          </motion.div>
        </div>

        {/* CTA callout */}
        <motion.div
          ref={cta.ref}
          variants={FadeIn("up", 0.2, 0)}
          initial="hidden"
          animate={cta.inView ? "show" : "hidden"}
          className="mt-16 sm:mt-20 rounded-3xl p-[1.5px] bg-gradient-to-r from-hero-primary via-hero-secondary to-hero-accent"
        >
          <div className="rounded-3xl bg-white/90 dark:bg-dark-primary/90 backdrop-blur-md px-8 sm:px-12 py-10 text-center">
            <h3 className="font-manrope text-xl sm:text-2xl font-bold text-textHead dark:text-dark-textHead">
              Ready to start your next project?
            </h3>
            <p className="mt-3 text-sm sm:text-base text-textpara dark:text-dark-textpara max-w-xl mx-auto">
              Let&apos;s create something amazing together. I&apos;m just one
              message away.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
              <CtaButton
                as="a"
                href="mailto:sivaneshkkf@gmail.com"
                variant="primary"
                icon={<EmailIcon fontSize="small" />}
                className="!px-5 !py-3 !text-sm !rounded-xl w-full sm:w-auto"
              >
                Email Me
              </CtaButton>
              <CtaButton
                as="a"
                href="http://Wa.me/+917010037476"
                target="_blank"
                rel="noopener noreferrer"
                variant="secondary"
                icon={<WhatsAppIcon fontSize="small" />}
                className="!px-5 !py-3 !text-sm !rounded-xl !text-textHead dark:!text-dark-textHead !bg-black/[0.03] dark:!bg-white/5 !border-black/10 dark:!border-white/15 w-full sm:w-auto"
              >
                Schedule a Call
              </CtaButton>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default Contact;
