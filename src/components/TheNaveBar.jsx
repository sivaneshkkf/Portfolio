import { useState } from "react";
import NavLi from "./NavLi";

function TheNaveBar() {

    const [activeLi,setActiveLi] = useState("Home")

    function handleClick(state) {
        setActiveLi(state)
        console.log(state)
    }

    console.log(activeLi)

    return ( 
        <div className="bg-white py-3 px-4 flex items-center gap-4">

            <div className="flex items-center gap-4 flex-1">
                <p className="text-textHead text-xl font-black md:text-2xl">Web 
                    <span className="text-accent text-xl font-black md:text-2xl"> Developer</span></p>
                <img src="../src/images/logo.png" alt="" className="w-14"/>
            </div>

            <div className="flex gap-6 items-center">
                <ul className="flex gap-4 text-textHead text-sm font-bold">
                    
                    <NavLi
                    name="Home"
                    onClick={() => {handleClick("Home")}}
                    link="#"
                    status={activeLi}
                    />
                    <NavLi
                    name="About Me"
                    onClick={() => {handleClick("About Me")}}
                    link="#"
                    status={activeLi}
                    />
                    <NavLi
                    name="SKills"
                    onClick={() => {handleClick("SKills")}}
                    link="#"
                    status={activeLi}
                    />
                    <NavLi
                    name="Projects"
                    onClick={() => {handleClick("Projects")}}
                    link="#"
                    status={activeLi}
                    />
                    <NavLi
                    name="Resume"
                    onClick={() => {handleClick("Resume")}}
                    link="#"
                    status={activeLi}
                    />
                    <NavLi
                    name="Contact"
                    onClick={() => {handleClick("Contact")}}
                    link="#"
                    status={activeLi}
                    />

                
                </ul>
                <img src="../src/images/github.png" alt="" className="w-8"/>
            </div>
            <div>

            </div>
        </div>
     );
}

export default TheNaveBar;