import { useContext } from "react";
import { NavLiContext } from "../context/NavLiContext";
import { Link } from "react-scroll";

function NavLi({name,onClick,link,id}) {

  const {activeLi,setActiveLi} = useContext(NavLiContext)

  console.log(activeLi)

  return (

    <li className="group">
      <Link to={link}
      onClick={onClick}
       className="hover:text-accent"
      smooth={true}
      >{name}
      <div
        className={`h-1 bg-accent transition-all duration-500 ${
          activeLi === id ? "w-full" : "w-0"
        }`}
      ></div>
      </Link>
    </li>
  );
}

export default NavLi