import img1 from "../images/musicPlayer.png"
import img2 from "../images/formApp.png"
import img3 from "../images/calculator.png"
import musicplayerbg from "../images/bg/musicplayerbg.png"
import formbg from "../images/bg/formbg.png"
import calculator from "../images/bg/calculator.png"

import savingsApp1 from "../images/savingsApp1.png";
import savingsApp2 from "../images/savingsApp2.png";
import savingsApp3 from "../images/savingsApp3.png";

export const ProjectData =[
    {
        name :"Music Player",
        image : img1,
        bg : musicplayerbg,
        disc : "Responsive music player with smooth playback and easy-to-use interface on all devices.",
        techs : ["HTML","TAILWINDCSS","JS"],
        link : "https://sivaneshkkf.github.io/Music-Player/",
        ghLink : "https://github.com/sivaneshkkf/Music-Player"
    },
    {
        name :"Giveaway Form",
        image : img2,
        bg : formbg,
        disc : "Responsive form design with user-friendly layout, optimized for all devices and screen sizes.",
        techs : ["HTML","TAILWINDCSS","JS","Firebase"],
        link : "https://sivaneshkkf.github.io/Giveaway-Form/",
        ghLink : "https://github.com/sivaneshkkf/Giveaway-Form"
    },
    {
        name :"Calculator",
        image : img3,
        bg : calculator,
        disc : "A sleek, responsive calculator app for quick and easy calculations, designed for seamless performance on any device.",
        techs : ["HTML","TAILWINDCSS","JS"],
        link : "https://sivaneshkkf.github.io/Calculator-App/",
        ghLink : "https://github.com/sivaneshkkf/Calculator-App"
    }
]


export const MobileAppData = [
    {
        imgs:[savingsApp1, savingsApp2, savingsApp3],
        name: "Expense Traker App",
        disc: "Managing your money shouldn't be a hassle. With our Expense Tracker app, you can effortlessly keep track of your daily expenses, analyze your spending habits, and make informed financial decisions—all from your mobile device!",
        techs: ["XML", "ANDROID STUDIO", "JAVA", "SQLITE"],
        link: ""
    },
]