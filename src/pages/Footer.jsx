import { useContext, useEffect, useState } from "react";
import { motion } from "motion/react";
import { FeedbackFormContext } from "../context/FeedBackFormContext";
import { HeadingContext } from "../context/HeadingContext";
import { ScrolContext } from "../context/ScrolContext";
import sectionIDS from "../data/SectionIDS";
import { SocialLinks } from "../data/SocialLinks";
import skillsData from "../data/skillsData.json";
import { skillsMeta } from "../data/skillsMeta";
import SocialButton from "../components/SocialButton";
import FooterSkillBar from "../components/FooterSkillBar";
import FooterServiceCard from "../components/FooterServiceCard";
import { FadeIn } from "../varients/varientAnim";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import EmailIcon from "@mui/icons-material/Email";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";

const footerSocials = SocialLinks.filter((social) =>
  ["GitHub", "LinkedIn", "Instagram", "WhatsApp", "Email"].includes(
    social.name,
  ),
);

const expertise = [
  { key: "REACT JS", label: "React" },
  { key: "NODEJS", label: "Node.js" },
  { key: "TAILWINDCSS", label: "Tailwind CSS" },
  { key: "TYPESCRIPT", label: "TypeScript" },
  { key: "MONGODB", label: "MongoDB" },
];

const services = [
  { icon: "💻", title: "Full Stack Development" },
  { icon: "⚛️", title: "React Applications" },
  { icon: "🟢", title: "Node.js & APIs" },
  { icon: "🗄️", title: "Database Design" },
  { icon: "📱", title: "Responsive UI/UX" },
  { icon: "🔥", title: "Firebase & Deployment" },
];

function Footer() {
  const { setFeedbackFormOpen } = useContext(FeedbackFormContext);
  const { setVisibleSection } = useContext(HeadingContext);
  const { setScrollEnable } = useContext(ScrolContext);
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowBackToTop(window.scrollY > 500);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function goToSection(link) {
    setScrollEnable(false);
    setVisibleSection({ navLiId: link.navId, sectionId: link.sectionId });
  }

  return (
    <footer className="relative overflow-hidden bg-hero-bg">
      {/* decorative background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[#020617] via-hero-bg to-hero-bg2"></div>
        <div className="absolute inset-0 bg-grid-pattern opacity-40"></div>
        <div className="absolute -top-32 -left-20 h-[26rem] w-[26rem] rounded-full bg-hero-primary/20 blur-[110px] animate-blob"></div>
        <div className="absolute top-10 -right-24 h-[22rem] w-[22rem] rounded-full bg-hero-secondary/20 blur-[110px] animate-blobSlow"></div>
        <div className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-hero-accent/10 blur-[100px]"></div>

        <span className="absolute top-[15%] left-[12%] h-1 w-1 rounded-full bg-hero-primary/60 animate-float"></span>
        <span className="absolute top-[40%] right-[18%] h-1.5 w-1.5 rounded-full bg-hero-secondary/50 animate-float-slow"></span>
        <span className="absolute bottom-[25%] left-[22%] h-1 w-1 rounded-full bg-hero-accent/60 animate-float"></span>
        <span className="absolute bottom-[15%] right-[30%] h-1 w-1 rounded-full bg-hero-success/50 animate-float-slow"></span>

        <span className="hidden sm:block absolute top-[8%] right-[6%] text-hero-muted/[0.06] text-6xl font-mono select-none">
          {"</>"}
        </span>
        <span className="hidden sm:block absolute bottom-[6%] left-[5%] text-hero-muted/[0.06] text-5xl font-mono select-none">
          {"{ }"}
        </span>
        <span className="hidden lg:block absolute top-[55%] left-[45%] text-hero-muted/[0.05] text-3xl font-mono select-none">
          01
        </span>
      </div>

      {/* animated top divider */}
      <div className="relative h-px w-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-hero-primary/70 to-transparent"></div>
        <motion.div
          className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/80 to-transparent"
          animate={{ x: ["-100%", "300%"] }}
          transition={{
            duration: 3.5,
            repeat: Infinity,
            ease: "linear",
            repeatDelay: 1,
          }}
        ></motion.div>
      </div>

      <div className="mx-auto max-w-7xl px-5 py-16 sm:py-20">
        {/* main grid */}
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-16">
          {/* brand */}
          <motion.div
            variants={FadeIn("up", 0.1, 0)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0, margin: "0px 0px 300px 0px" }}
            className="sm:col-span-2 lg:col-span-1 rounded-[24px] border border-white/10 bg-white/5 backdrop-blur-xl p-6 sm:p-7 shadow-[0_0_40px_-15px_rgba(59,130,246,0.5)]"
          >
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-hero-primary to-hero-secondary font-manrope text-lg font-extrabold text-white">
                S
              </span>
              <span className="font-manrope text-[28px] sm:text-[34px] leading-none font-extrabold text-hero-text">
                Sivanesh
              </span>
            </div>
            <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-hero-accent">
              Full Stack Web Developer
            </p>
            <p className="mt-4 text-sm leading-relaxed text-hero-muted">
              Passionate about building scalable, modern web applications with
              clean architecture and exceptional user experiences.
            </p>
            <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5">
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-hero-success opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-hero-success"></span>
              </span>
              <span className="text-[11px] font-medium text-hero-muted">
                Available for Full-Time Opportunities
              </span>
            </div>
          </motion.div>

          {/* expertise */}
          <div>
            <h3 className="mb-5 font-manrope text-[22px] font-bold text-hero-text">
              Expertise
            </h3>
            <div className="flex flex-col gap-4">
              {expertise.map((item, index) => {
                const skill = skillsData.find((s) => s.name === item.key);
                const meta = skillsMeta[item.key];
                return (
                  <FooterSkillBar
                    key={item.key}
                    svg={skill?.svg}
                    name={item.label}
                    percent={meta?.proficiency ?? 0}
                    delay={0.05 * index}
                  />
                );
              })}
            </div>
          </div>

          {/* connect */}
          <div>
            <h3 className="mb-5 font-manrope text-[22px] font-bold text-hero-text">
              Let&apos;s Connect
            </h3>
            <a
              href="mailto:sivaneshkkf@gmail.com"
              className="mb-6 flex w-fit items-center gap-2 text-sm font-medium text-hero-muted transition-colors duration-300 hover:text-hero-text"
            >
              <EmailIcon sx={{ fontSize: 16 }} />
              sivaneshkkf@gmail.com
            </a>
            <div className="flex flex-wrap gap-3">
              {footerSocials.map((social, index) => (
                <SocialButton
                  key={social.name}
                  href={social.href}
                  label={social.name}
                  icon={<social.icon fontSize="small" />}
                  brand={social.brand}
                  brandDark={social.brandDark}
                  delay={0.05 * index}
                  surface="dark"
                />
              ))}
            </div>
          </div>
        </div>

        {/* what i do */}
        <div className="mt-16 sm:mt-20">
          <h3 className="mb-8 text-center font-manrope text-[22px] font-bold text-hero-text">
            What I Do
          </h3>
          <div className="mx-auto grid max-w-4xl grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
            {services.map((service, index) => (
              <FooterServiceCard
                key={service.title}
                icon={service.icon}
                title={service.title}
                delay={0.05 * index}
              />
            ))}
          </div>
        </div>

        {/* developer quote */}
        <motion.div
          variants={FadeIn("up", 0.1, 0)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0, margin: "0px 0px 300px 0px" }}
          className="mx-auto mt-16 max-w-2xl rounded-3xl p-[1.5px] bg-gradient-to-r from-hero-primary via-hero-secondary to-hero-accent sm:mt-20"
        >
          <div className="rounded-3xl bg-hero-bg2/80 backdrop-blur-xl px-8 py-9 text-center">
            <FormatQuoteIcon
              sx={{ fontSize: "2rem" }}
              className="text-hero-primary/60"
            />
            <p className="mt-2 text-sm italic leading-relaxed text-hero-text/90 sm:text-base">
              &ldquo;Code is like humour. When you have to explain it, it&apos;s
              bad.&rdquo;
            </p>
            <p className="mt-3 text-xs font-semibold text-hero-muted">
              — Cory House
            </p>
          </div>
        </motion.div>

        {/* bottom bar */}
        <div className="mt-14 flex flex-col items-center gap-4 border-t border-white/10 pt-8 sm:flex-row sm:justify-between">
          <p className="text-center text-sm text-hero-muted sm:text-left">
            &copy; {new Date().getFullYear()} Sivanesh. All rights reserved.
          </p>
          <p className="flex items-center gap-1.5 text-sm text-hero-muted">
            Built with
            <FavoriteIcon sx={{ fontSize: 14 }} className="text-red-400" />
            using React, Tailwind CSS &amp; Framer Motion
          </p>
        </div>
      </div>

      {/* floating feedback button */}
      <motion.button
        type="button"
        aria-label="Send feedback"
        onClick={() => setFeedbackFormOpen((pre) => ({ ...pre, open: true }))}
        whileTap={{ scale: 0.94 }}
        className="ios-fixed-chrome group fixed bottom-5 left-5 z-40 flex h-12 items-center overflow-hidden rounded-full border border-white/10 bg-hero-bg2/90 px-3.5 text-hero-text shadow-lg shadow-black/30 backdrop-blur-xl transition-all duration-300 hover:shadow-[0_0_24px_-4px_rgba(139,92,246,0.7)]"
      >
        <ChatBubbleOutlineIcon
          fontSize="small"
          className="shrink-0 text-hero-secondary"
        />
        <span className="max-w-0 overflow-hidden whitespace-nowrap text-xs font-semibold opacity-0 transition-all duration-300 group-hover:ml-2 group-hover:max-w-[100px] group-hover:opacity-100">
          Feedback
        </span>
      </motion.button>

      {/* back to top */}
      <motion.button
        type="button"
        aria-label="Back to top"
        onClick={() => goToSection(sectionIDS.home)}
        initial={false}
        animate={{
          opacity: showBackToTop ? 1 : 0,
          y: showBackToTop ? 0 : 16,
          pointerEvents: showBackToTop ? "auto" : "none",
        }}
        transition={{ duration: 0.3 }}
        whileHover={{ y: -4, scale: 1.08 }}
        whileTap={{ scale: 0.9 }}
        className="ios-fixed-chrome fixed bottom-20 right-5 z-40 flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-gradient-to-r from-hero-primary to-hero-secondary text-white shadow-lg shadow-hero-primary/40 backdrop-blur-md hover:shadow-[0_0_24px_-2px_rgba(139,92,246,0.7)]"
      >
        <motion.span
          animate={{ y: [0, -3, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          whileHover={{ rotate: 180 }}
          className="flex"
        >
          <KeyboardArrowUpIcon fontSize="small" />
        </motion.span>
      </motion.button>
    </footer>
  );
}

export default Footer;
