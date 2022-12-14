import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getRecipesName, loadingAction } from "../../redux/actions";
import style from "./Navbar.module.css";
import Lupa from "../Image/magnifying-glass-4186151.png";

export default function SearchBar({ paginado }) {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  const handleInputChange = (e) => {
    setName(e.target.value);
  };

  const handleSubmit = () => {
    if (name) {
      dispatch(getRecipesName(name));
      paginado(1);
      setName("");
      dispatch(loadingAction(true));
      setTimeout(() => {
        dispatch(loadingAction(false));
      }, 3000);
    } else {
      alert("Debes escribir algo...");
    }
  };

  return (
    <div className={style.bgIyBtn}>
      <input type="text" placeholder="Search..." onChange={handleInputChange} value={name} />
      <div>
        {/* <button type="submit" onClick={(e) => handleSubmit(e)}> */}
        <img src={Lupa} alt="Search" onClick={(e) => handleSubmit(e)} />
        {/* </button> */}
      </div>
    </div>
  );
}
