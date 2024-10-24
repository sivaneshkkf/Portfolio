/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        primary: "#F9FAFB",
        secondary: "#E3E9F0",
        accent: "#FF0051",
        textHead: "#1F3F4A",
        textpara: "#7E919A",
        gradient1: "rgba(37,46,58,0.8)",
        gradient2: "rgba(55,72,92,0.95)",
        dark: {
          primary: "#212428",
          secondary: "#333333",
          accent: "#FF0051",
          textHead: "#E4E3E3",
          textpara: "#7E7E7E",
          gradient1: "rgb(52, 52, 52,0.8)",
          gradient2: "rgba(63, 63, 63,0.95)",
        },
      },

      fontFamily:{
        poppins: 'Poppins, sans-serif'
      },

      boxShadow: {
        cardShadow: "2px 2px 25px rgba(0, 0, 0, 0.1), 2px 2px 25px rgba(0, 0, 0, 0.08)"
      }
      
    },
  },
  plugins: [],
}

