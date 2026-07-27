import {
  faHtml5,
  faJs,
  faReact,
  faNodeJs,
} from "@fortawesome/free-brands-svg-icons";
import { faRocket } from "@fortawesome/free-solid-svg-icons";

export const JourneyData = [
  {
    title: "HTML & CSS",
    description:
      "Started my web development journey by learning the fundamentals of structuring and styling the web.",
    icon: faHtml5,
    done: true,
  },
  {
    title: "JavaScript",
    description:
      "Learned core JavaScript to build interactive, dynamic user interfaces.",
    icon: faJs,
    done: true,
  },
  {
    title: "React & Tailwind CSS",
    description:
      "Started building component-based UIs with React, styled rapidly with Tailwind CSS.",
    icon: faReact,
    done: true,
  },
  {
    title: "Node.js & Backend",
    description:
      "Currently expanding into full-stack development with Node.js and databases like MySQL and MongoDB.",
    icon: faNodeJs,
    done: false,
  },
  {
    title: "Current Goal",
    description: "Full Stack Web Developer",
    icon: faRocket,
    done: false,
    isGoal: true,
  },
];
