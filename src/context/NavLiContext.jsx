import { createContext } from "react";
import sectionID from "../data/sectionIdData.json"

export const NavLiContext = createContext(sectionID.home)