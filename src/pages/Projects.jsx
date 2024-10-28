import TheHeading from "../components/TheHeading";
import sectionIDS from "../data/SectionIDS";
import ProjectLi from "../components/ProjectLi";
import { ProjectData, MobileAppData } from "../data/projectData";
import BreakLine from "../components/BreakLine";
import MobileAppsLi from "../components/MobileAppsLI";
import bgforApp from "../images/bgApp.jpg"
import bgLight from "../images/bgLight.jpg"
import { useContext } from "react";
import { Theme } from "../context/HeadingContext";

function Projects() {
  
  const {theme, setTheme} = useContext(Theme)

  return (
    <div className="pt-5 bg-primary dark:bg-dark-secondary">
      <TheHeading heading="PROJECTS" id={sectionIDS.projects.sectionId} />
      <div className="sm:mt-8 pt-10 lg:px-20 px-5 pb-20 flex flex-col items-center">
        <ul className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 xl:gap-20 sm:gap-10 gap-8 w-fit">
          {ProjectData.map((li,index) => (
            <ProjectLi
            key={index}
            name={li.name}
            disc={li.disc}
            img={li.image}
            techs={li.techs}
            bg={li.bg}
            link={li.link}
            ghLink={li.ghLink}
            />
          ))}
        </ul>
      </div>

      <div className="w-full px-10 py-16 bg-cover bg-center bg-no-repeat grid lg:grid-cols-2 lg:gap-4 gap-2"
        style={theme === "dark"? { backgroundImage: `url(${bgforApp})` } : {backgroundImage: `url(${bgLight})`}}
      >
        {MobileAppData.map((li, index) => (
          <MobileAppsLi
            imgs={li.imgs}
            name={li.name}
            disc= {li.disc}
            techs = {li.techs}
            link = {li.link}
            key={index}
          />
        ))}
        
      </div>
      <div className="px-10">
        <BreakLine/>
      </div>
    </div>
  );
}

export default Projects;
