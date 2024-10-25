import BreakLine from "../components/BreakLine";
import TheHeading from "../components/TheHeading";
import sectionIDS from "../data/SectionIDS"



function AboutMe() {



  return (
    <div className="bg-primary dark:bg-dark-secondary px-10 pt-10 relative -z-[2]">
      <TheHeading heading="ABOUT ME" id={sectionIDS.aboutME.sectionId}/>
      <div className="flex items-center md:py-20 md:px-10 lg:px-60">
        <p className="text-textpara dark:text-dark-textpara text-xs sm:text-sm md:text-base lg:text-md font-medium flex-1">
          I’m a dedicated web developer with a passion for crafting clean,
          efficient, and visually appealing websites. With a strong foundation
          in HTML, CSS, JavaScript, and frameworks like React, I specialize in
          creating responsive, user-centric designs that enhance functionality
          and user experience. Constantly learning and adapting to new
          technologies.
        </p>
        <div className="">
          <img
            src="../src/images/about.png"
            alt="about"
            className="max-w-28 sm:max-w-32 md:max-w-44 lg:max-w-96 ml-auto"
          />
        </div>
      </div>

      <div className="absolute top-0 left-0 -z-[2]">
        <svg
          className="w-40 sm:w-52 md:w-64 h-fit"
          width="318"
          height="238"
          viewBox="0 0 318 238"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M177.235 127.663C285.974 144.786 315.838 50.0535 317.178 0.547232L-0.469785 0.547006L-0.469793 238.001C39.9999 189 68.4967 110.54 177.235 127.663Z"
            fill="#FF0051"
            fillOpacity="0.8"
          />
        </svg>
      </div>
      <div className="absolute bottom-14 right-0 -z-[1]">
        <svg
            className="lg:max-w-6xl max-w-40 sm:max-w-52 md:max-w-64 h-fit"
          width="308"
          height="650"
          viewBox="0 0 308 650"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1.14529 355.69C10 518 191.262 650 308 650V501.263V3.49972C182.5 -23.0003 -12.5325 104.971 1.14529 355.69Z"
            fill="#FF0051"
            fillOpacity="0.8"
          />
        </svg>
      </div>
      <BreakLine/>
    </div>
  );
}

export default AboutMe;
