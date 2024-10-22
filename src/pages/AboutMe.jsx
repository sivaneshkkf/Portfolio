import BreakLine from "../components/BreakLine";
import TheHeading from "../components/TheHeading";
import sectionID from "../data/sectionIdData.json"



function AboutMe() {



  return (
    <div className="bg-primary p-10 relative -z-[2]">
      <TheHeading heading="ABOUT ME" id={sectionID.aboutME}/>
      <div className="flex items-center md:py-20 md:px-10 lg:px-60">
        <p className="text-textpara text-md lg:text-lg font-medium flex-1">
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
            className="max-w-96 ml-auto"
          />
        </div>
      </div>

      <div className="absolute top-0 left-0 -z-[2]">
        <svg
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
            className="max-w-4xl"
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
