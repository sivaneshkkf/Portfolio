import SkillsLi from "../components/SkillsLI";
import TheHeading from "../components/TheHeading";
import skillsData from "../data/skillsData.json";
import BreakLine from "../components/BreakLine";
import sectionID from "../data/sectionIdData.json"


function SKills() {
  return (
    <div className="bg-primary pt-5">
      <TheHeading heading="MY SKILLS" id={sectionID.skills}/>
      <div className="lg:py-10 lg:px-20 sm:py-5 sm:px-10 py-5 px-5 w-fit mx-auto">
        <ul className="grid xl:grid-cols-5 md:grid-cols-3 grid-cols-2 xl:gap-14 sm:gap-10 gap-8">
          {skillsData.map((li, index) => (
            <SkillsLi
              key={index}
              svg={li.svg}
              name={li.name}
              hoverCol={li.hoverCol}
              svgCol={li.svgCol}
            />
          ))}
        </ul>
      </div>
      <div className="p-10">
        <BreakLine />
      </div>
    </div>
  );
}

export default SKills;
