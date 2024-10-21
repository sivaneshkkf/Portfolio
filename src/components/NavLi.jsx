import { useContext } from "react";
import { NavLiContext } from "../context/NavLiContext";

function NavLi({ name, onClick, id }) {
  const { activeLi } = useContext(NavLiContext);

  return (
    <li className="group">
      <a
        href="#"
        onClick={(e) => {
          e.preventDefault(); // Prevent default anchor behavior
          onClick(); // Call onClick to trigger state change
        }}
        className="hover:text-accent"
      >
        {name}
        <div
          className={`h-1 bg-accent transition-all duration-500 ${
            activeLi === id ? "w-full" : "w-0"
          }`}
        ></div>
      </a>
    </li>
  );
}

export default NavLi;
