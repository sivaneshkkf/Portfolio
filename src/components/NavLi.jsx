function NavLi({name,onClick,link,status}) {
  return (

    <li className="group" 
    onClick={onClick}>
      <a href={link} className="hover:text-accent">{name}</a>
      <div
        className={`h-1 bg-accent transition-all duration-500 ${
          status === name ? "w-full" : "w-0"
        }`}
      ></div>
    </li>
  );
}

export default NavLi