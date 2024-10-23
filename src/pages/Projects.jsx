import TheHeading from "../components/TheHeading";
import sectionID from "../data/sectionIdData.json";
import ProjectLi from "../components/ProjectLi";
import { ProjectData } from "../data/projectData";
import BreakLine from "../components/BreakLine";

function Projects() {
  return (
    <div className="px-10 pt-5 pb-10 bg-primary">
      <TheHeading heading="PROJECTS" id={sectionID.projects} />
      <div className="mt-8 pt-10 lg:px-20 pb-20 flex flex-col items-center">
        <ul className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 xl:gap-20 sm:gap-10 gap-5 w-fit">
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
      <BreakLine/>
    </div>
  );
}

export default Projects;
