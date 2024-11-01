import BreakLine from "../components/BreakLine";
import RoadMap from "../components/RoadMap";
import TheHeading from "../components/TheHeading";
import sectionIDS from "../data/SectionIDS";
import aboutImg from "../images/about.png";
import aboutMeCodingLap from "../images/codingLaptop.png";

function AboutMe() {
  return (
    <div className="bg-primary dark:bg-dark-secondary px-5 pt-10 relative -z-[2]">
      <TheHeading heading="ABOUT ME" id={sectionIDS.aboutME.sectionId} />
      <div className="flex items-center md:py-10 md:px-10 lg:px-60">
        <div className="space-y-5">
          <p className="text-textpara dark:text-dark-textpara text-xs sm:text-sm md:text-base lg:text-md font-medium flex-1 mt-3">
            I’m a dedicated web developer with a passion for crafting clean,
            efficient, and visually appealing websites. With a strong foundation
            in HTML, CSS, JavaScript, and frameworks like React, I specialize in
            creating responsive, user-centric designs that enhance functionality
            and user experience. Constantly learning and adapting to new
            technologies.
          </p>
          <div className="bg-dark-primary rounded p-3 relative">
            <p className="text-textpara dark:text-dark-textpara text-xs sm:text-sm md:text-base lg:text-md font-medium flex-1">
              I am actively seeking new career opportunities where I can
              leverage my skills, contribute meaningfully, and expand my
              knowledge as I grow professionally.
            </p>
            <div
              className="absolute inset-4 -z-10 blur-lg rounded-lg"
              style={{
                background:
                  "linear-gradient(135deg, #3B82F6, #8B5CF6, #EC4899, #F59E0B, #10B981)",
                borderRadius: "8px", // Optional for rounded corners
              }}
            ></div>
          </div>
        </div>

        <div className="">
          <img
            src={aboutImg}
            alt="about"
            className="max-w-28 sm:max-w-32 md:max-w-44 lg:max-w-96 ml-auto"
          />
        </div>
      </div>

      <div className="absolute top-0 left-0 -z-[2]">
        <svg
          className="w-28 sm:w-52 md:w-64 h-fit"
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
      <div className="absolute bottom-2 md:top-14 top-2 right-0 -z-[1]">
        <svg
          className="lg:max-w-6xl max-w-28 sm:max-w-52 md:max-w-64 h-fit"
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

      <div className="mt-8 md:mx-20 mx-auto">
        <div className="dark:bg-dark-codingOuterBg bg-codingOuterBg px-4 pt-4 pb-1 rounded-xl w-fit">
          <div className="dark:bg-dark-codingBg bg-codingBg w-fit px-4 py-2 rounded-t-lg">
            <h4 className="text-textHead dark:text-dark-textHead font-semibold text-xs md:text-sm text-center text-nowrap">
              MY JOURNEY
            </h4>
          </div>

          <div className="dark:bg-dark-codingBg bg-codingBg px-4 pt-3 pb-4 sm:pb-8 md:px-8 md:pt-8 rounded-tr-lg rounded-r-lg rounded-bl-lg mb-4 overflow-hidden">
            <p className="text-codingTextBase dark:text-dark-codingTextBase text-xs md:text-sm pt-3">
              I began my web development journey 1 years ago, diving deep into
              <span className="dark:text-dark-codingTextHl text-codingTextHl">
                {" "}
                HTML, CSS, and JavaScript.{" "}
              </span>
              Over time, I’ve mastered various libraries and frameworks,
              including
              <span className="dark:text-dark-codingTextHl text-codingTextHl">
                {" "}
                React,{" "}
              </span>
              and
              <span className="dark:text-dark-codingTextHl text-codingTextHl">
                {" "}
                Tailwind CSS,{" "}
              </span>{" "}
              which allow me to create dynamic, high-performance applications.
              As a self-learner with a strong curiosity for new technologies,
              I’m constantly driven to explore, learn, and refine my skills in
              both design and coding."
            </p>

            <RoadMap />
          </div>
        </div>
      </div>

      <BreakLine />
    </div>
  );
}

export default AboutMe;
