import BreakLine from "../components/BreakLine";

function Indroduction() {
  return (
    <div className="bg-[url('../src/images/bg.png')] bg-cover bg-center h-full w-full relative z-0 mt-16">
      <div className="absolute bg-gradient-to-b from-gradient1 to-gradient2 inset-0 -z-10"></div>
      <div className=" py-20 px-20 lg:px-80">
        <div className="flex gap-4 items-center justify-between">
          <div className="space-y-8 flex-1">
            <p className="text-gray-500 text-sm font-bold tracking-widest">
              Welcome to my world
            </p>

            <h3 className="text-5xl md:text-6xl text-white font-semibold">
              Hi I'm{" "}
              <span className="text-accent font-bold text-5xl md:text-6xl tracking-wide ml-2">
                Sivanesh
              </span>
            </h3>

            <h3 className="text-5xl text-white font-semibold">
              A Web Developer.
            </h3>

            <p className="text-gray-400 text-sm font-medium max-w-md pt-5">
              I am a passionate web developer skilled in building responsive and
              user-friendly websites. With expertise in HTML, CSS, JavaScript,
              and React, I focus on creating seamless digital experiences.
              Explore my portfolio to see my latest work!
            </p>
          </div>

          <div className="flex-1">
            <img
              src="../src/images/pfImg.png"
              alt=""
              className="max-w-80 lg:max-w-sm ml-auto"
            />
          </div>
        </div>
        <div className="mt-14">
          <p className="text-gray-300 text-sm mb-2">Follow Me</p>
          <div className="flex gap-4 items-center text-white">
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1.5rem"
                height="1.5em"
                viewBox="0 0 14 14"
              >
                <g
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M10.333 3.644a.25.25 0 1 1 0-.5m0 .5a.25.25 0 1 0 0-.5"></path>
                  <path d="M.858 3.431A2.573 2.573 0 0 1 3.431.858h6.862a2.573 2.573 0 0 1 2.573 2.573v6.862a2.573 2.573 0 0 1-2.573 2.573H3.43a2.573 2.573 0 0 1-2.573-2.573V3.43Z"></path>
                  <path d="M4.312 6.862a2.55 2.55 0 1 0 5.1 0a2.55 2.55 0 1 0-5.1 0"></path>
                </g>
              </svg>
            </span>
            <span>
            <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24"><path fill="currentColor" fillRule="evenodd" d="M9.429 8.969h3.714v1.85c.535-1.064 1.907-2.02 3.968-2.02c3.951 0 4.889 2.118 4.889 6.004V22h-4v-6.312c0-2.213-.535-3.461-1.897-3.461c-1.889 0-2.674 1.345-2.674 3.46V22h-4zM2.57 21.83h4V8.799h-4zM7.143 4.55a2.53 2.53 0 0 1-.753 1.802a2.57 2.57 0 0 1-1.82.748a2.6 2.6 0 0 1-1.818-.747A2.55 2.55 0 0 1 2 4.55c0-.677.27-1.325.753-1.803A2.58 2.58 0 0 1 4.571 2c.682 0 1.336.269 1.819.747s.753 1.126.753 1.803" clipRule="evenodd"></path></svg>
            </span>
            <span>
            <svg xmlns="http://www.w3.org/2000/svg" width="1.3em" height="1.3em" viewBox="0 0 20 20"><path fill="currentColor" fillRule="evenodd" d="M18.896 0H1.104C.494 0 0 .494 0 1.104v17.792C0 19.506.494 20 1.104 20h9.578v-7.745H8.076V9.237h2.606V7.01c0-2.584 1.578-3.99 3.883-3.99c1.104 0 2.052.082 2.329.119v2.7h-1.598c-1.254 0-1.496.596-1.496 1.47v1.927h2.989l-.39 3.018h-2.6V20h5.097c.61 0 1.104-.494 1.104-1.104V1.104C20 .494 19.506 0 18.896 0"></path></svg>
            </span>
            <span>
            <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24"><g fill="none"><g clipPath="url(#akarIconsWhatsappFill0)"><path fill="currentColor" fillRule="evenodd" d="M17.415 14.382c-.298-.149-1.759-.867-2.031-.967s-.47-.148-.669.15c-.198.297-.767.966-.94 1.164c-.174.199-.347.223-.644.075c-.297-.15-1.255-.463-2.39-1.475c-.883-.788-1.48-1.761-1.653-2.059c-.173-.297-.019-.458.13-.606c.134-.133.297-.347.446-.52s.198-.298.297-.497c.1-.198.05-.371-.025-.52c-.074-.149-.668-1.612-.916-2.207c-.241-.579-.486-.5-.668-.51c-.174-.008-.372-.01-.57-.01s-.52.074-.792.372c-.273.297-1.04 1.016-1.04 2.479c0 1.462 1.064 2.875 1.213 3.074s2.095 3.2 5.076 4.487c.71.306 1.263.489 1.694.625c.712.227 1.36.195 1.872.118c.57-.085 1.758-.719 2.006-1.413s.247-1.289.173-1.413s-.272-.198-.57-.347m-5.422 7.403h-.004a9.87 9.87 0 0 1-5.032-1.378l-.36-.214l-3.742.982l.999-3.648l-.235-.374a9.86 9.86 0 0 1-1.511-5.26c.002-5.45 4.436-9.884 9.889-9.884a9.8 9.8 0 0 1 6.988 2.899a9.82 9.82 0 0 1 2.892 6.992c-.002 5.45-4.436 9.885-9.884 9.885m8.412-18.297A11.82 11.82 0 0 0 11.992 0C5.438 0 .102 5.335.1 11.892a11.86 11.86 0 0 0 1.587 5.945L0 24l6.304-1.654a11.9 11.9 0 0 0 5.684 1.448h.005c6.554 0 11.89-5.335 11.892-11.893a11.82 11.82 0 0 0-3.48-8.413" clipRule="evenodd"></path></g><defs><clipPath id="akarIconsWhatsappFill0"><path fill="#fff" d="M0 0h24v24H0z"></path></clipPath></defs></g></svg>
            </span>
          </div>
        </div>
        <BreakLine/>
      </div>
    </div>
  );
}

export default Indroduction;
