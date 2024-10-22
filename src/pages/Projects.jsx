import TheHeading from "../components/TheHeading";
import sectionID from "../data/sectionIdData.json";
import ProjectLi from "../components/ProjectLi";
import { ProjectData } from "../data/projectData";
import BreakLine from "../components/BreakLine";

function Projects() {
  return (
    <div className="px-10 pt-5 pb-10 bg-primary">
      <TheHeading heading="PROJECTS" id={sectionID.projects} />
      <div className="mt-8 mx-auto lg:px-40 sm:px-20 pt-10 pb-20">
        <ul className="grid grid-cols-2 xl:grid-cols-3 xl:gap-20 sm:gap-10 gap-5 w-fit">
          {ProjectData.map((li,index) => (
            <ProjectLi
            key={index}
            name={li.name}
            disc={li.disc}
            img={li.image}
            techs={li.techs}
            />
          ))}
        </ul>
      </div>
      <BreakLine/>
    </div>
  );
}

export default Projects;
