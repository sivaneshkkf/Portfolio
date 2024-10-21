import TheHeading from "../components/TheHeading";
import sectionID from "../data/sectionIdData.json";
import ProjectLi from "../components/ProjectLi";
import { ProjectData } from "../data/projectData";

function Projects() {
  return (
    <div className="px-10 pt-5 pb-10 bg-primary">
      <TheHeading heading="PROJECTS" id={sectionID.projects} />
      <div className="mt-8 mx-auto">
        <ul className="grid grid-cols-2 gap-5 w-fit">
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
    </div>
  );
}

export default Projects;
