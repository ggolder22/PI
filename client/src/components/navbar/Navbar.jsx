import React from "react";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import style from "./Navbar.module.css";
import Logo from "../Image/home-icon.png";
import info from "../Image/about-me.png";

export default function Navbar({ paginado }) {
  return (
    <div className={style.bg}>
      <div className={style.bgHyC}>
        <Link to="/">
          <img src={Logo} alt="Logo" />
        </Link>
        <Link to="/about" className={style.refreash}>
          <img src={info} alt="about me" />
        </Link>
        <Link to="/createRecipe">
          <button>Create</button>
        </Link>
        <Link to="/favorites">
          <button>Favorites</button>
        </Link>
      </div>

      <div className={style.bgSearch}>
        <SearchBar paginado={paginado} />
      </div>
    </div>
  );
}
