import skillsData from "./skillsData.json";

const bySkillName = {};
skillsData.forEach((s) => {
  bySkillName[s.name] = s;
});

// Maps the free-text tech names used in JobExperience.jsx to the matching
// icon + brand color already defined in skillsData.json. Names with no match
// (REST API, Express, or non-software domain skills like "GMP Compliance")
// simply render as plain text pills via TechPill's fallback.
export const experienceTechIcons = {
  "React JS": { svg: bySkillName["REACT JS"].svg, color: "#00d8ff" },
  JavaScript: { svg: bySkillName["JS"].svg, color: "#f5de19" },
  "Node.js": { svg: bySkillName["NODEJS"].svg, color: "#339933" },
  MySQL: { svg: bySkillName["MYSQL"].svg, color: "#00758f" },
  MongoDB: { svg: bySkillName["MONGODB"].svg, color: "#47a248" },
};
