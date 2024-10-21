import SkillsLi from "../components/SkillsLI";
import TheHeading from "../components/TheHeading";
import skillsData from "../data/skillsData.json";
import BreakLine from "../components/BreakLine";

function SKills() {
  return (
    <div className="bg-primary">
      <TheHeading heading="MY SKILLS" />
      <div className="py-10 px-20 w-fit mx-auto">
        <ul className="grid grid-cols-5 gap-14">
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
