import { div } from "framer-motion/client";
import logo from "../images/logo.png";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import { useEffect, useState } from "react";

function LoadingAnim() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const currentTheme = localStorage.getItem("theme") || "light";
    setTheme(currentTheme);
  }, []);

  console.log(theme);

  return (
    <div
      className={`w-full h-screen flex justify-center items-center gap-4 ${
        theme === "light" ? "bg-primary" : "bg-dark-secondary"
      }`}
    >
      <div className="w-20 space-y-4 flex flex-col items-center justify-center">
        <img src={logo} alt="logo" className="w-14 h-14" />
        <Box sx={{ width: "100%" }}>
          <LinearProgress
            sx={{
              "& .MuiLinearProgress-bar": {
                backgroundColor: "#FF0051", // Progress bar color
              },
              backgroundColor: theme === "light" ? "#E3E9F0" : "#212428", // Track color
            }}
          />
        </Box>
      </div>
    </div>
  );
}

export default LoadingAnim;
