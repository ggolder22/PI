import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getDiets, createRecipe } from "../../redux/actions/index";
import style from "./NewRecipe.module.css";
import Logo from "../Image/home-icon.png";

/* ************ VALIDATION ************ */

function validation(input) {
  let errors = {};
  if (!input.name) {
    errors.name = "The name is required.";
  }
  if (!/^[a-zA-Z ]+$/.test(input.name)) {
    errors.name = "The title requires letters";
  }
  if (input.name.length <= 2 || input.name.length >= 20) {
    errors.name = "The title requires from 2 to 20 letters.";
  }

  if (!input.summary) {
    errors.summary = "The summary is required.";
  } else if (input.summary.length <= 2 || input.summary.length >= 300) {
    errors.summary = "The title requires from 2 to 200 letters.";
  }

  if (input.healthScore < 1 || input.healthScore > 100) {
    errors.healthScore = "The score must be a number between 1 and 100.";
  }

  if (
    !/https?:\/\/(www.)?[-a-zA-Z0-9@:%.+~#=]{1,256}.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%+.~#?&//=]*)/.test(
      input.img
    )
  ) {
    errors.img = "Url incorrect.";
  }

  return errors;
}

/* ************ NEW RECIPE ************ */

export default function NewRecipe() {
  const dispatch = useDispatch();
  const history = useHistory();
  const diets = useSelector((state) => state.diets);
  const [errors, setErrors] = useState({});

  const [input, setInput] = useState({
    name: "",
    img: "",
    summary: "",
    healthScore: "",
    steps: "",
    diets: [],
    dishTypes: "",
  });

  useEffect(() => {
    dispatch(getDiets());
  }, [dispatch]);

  /* ************ HANDLES ************ */

  const handleChangeInput = (e) => {
    e.preventDefault();
    setInput((prevInput) => {
      // de esta manera el componente muestra los cambios para poder ir validando
      const newInput = {
        ...prevInput,
        [e.target.name]: e.target.value,
      };
      const validations = validation(newInput);
      setErrors(validations);
      return newInput;
    });
  };

  const handleChangeSelect = (e) => {
    e.preventDefault();
    if (!input.diets.includes(e.target.value))
      return setInput({
        ...input,
        diets: [...input.diets, e.target.value],
      });
  };

  const handleChangeSubmit = (e) => {
    e.preventDefault();
    if (input.name && input.img && input.summary && input.healthScore) {
      dispatch(createRecipe(input))
        alert("Receta creada");

      setInput({
        name: "",
        img: "",
        summary: "",
        healthScore: "",
        steps: "",
        diets: [],
        dishTypes: "",
      });
      history.push("/recipes");
    } else {
      alert("Ops! There is incomplete data");
    }
  };

  const handleDelete = (e) => {
    e.preventDefault();
    setInput({
      ...input,
      diets: input.diets.filter((dietita) => dietita !== e.target.value),
    });
  };

  const handleRemove =(e)=>{
    setInput({
      ...input,
      diets:input.diets.filter(occ=> occ !== e)
    })
  }

  /* ---------------- RENDER ------------------ */

  return (
    <div className={style.bgImg}>
      <div className={style.bg}>
        <div className={style.nav}>
          <div>
            <Link to="/">
              <img src={Logo} alt="Logo" />
            </Link>
            <Link to="/recipes">
              <button>Back</button>
            </Link>
          </div>
        </div>
        <div className={style.position} z-index="60">
          <div className={style.bgDetail}>
            <h1>New Recipe</h1>
            <div className={style.contenido}>
              <form onSubmit={(e) => handleChangeSubmit(e)}>
                <div>
                  <label>Name: </label>
                  <input
                    type="text"
                    name="name"
                    value={input.name}
                    onChange={(e) => handleChangeInput(e)}
                  />
                  {errors.name && <span>{errors.name}</span>}
                  <br />
                </div>
                <div>
                  <label>Image url: </label>
                  <input
                    type="text"
                    name="img"
                    value={input.img}
                    onChange={(e) => handleChangeInput(e)}
                  />
                  {errors.img && <span>{errors.img}</span>}
                  <br />
                </div>
                <div>
                  <label>Health Score: {`${input.healthScore}%`}</label>
                  <input
                    type="range"
                    name="healthScore"
                    value={input.healthScore}
                    onChange={(e) => handleChangeInput(e)}
                    min={0}
                    max={100}
                  />
                  {errors.healthScore && <span>{errors.healthScore}</span>}
                  <br />
                </div>
                <div>
                  <label>DishTypes:</label>
                  <input
                    type="text"
                    name="dishTypes"
                    value={input.dishTypes}
                    onChange={(e) => handleChangeInput(e)}

                  />
                  <br />
                </div>


                <div>
                  <label>Summary: </label>
                  <textarea
                    type="text"
                    name="summary"
                    value={input.summary}
                    onChange={(e) => handleChangeInput(e)}
                  />
                  {errors.summary && <span>{errors.summary}</span>}
                  <br />
                </div>
                <div>
                  <label>Instructions: </label>
                  <textarea
                    type="text"
                    name="steps"
                    value={input.steps}
                    onChange={(e) => handleChangeInput(e)}
                  />
                  <br />
                </div>
                <div>
                  <label>Diets: </label>
                  <select onChange={(e) => handleChangeSelect(e)} defaultValue="default">
                    <option default></option>
                    {diets?.map((d) => {
                      return (
                        <option key={d.name} name="diets" value={d.name}>
                          {d.name}
                        </option>
                      );
                    })}
                  </select>
                  <div className={style.dietas}>
                    <div>
                      {input.diets.map((e) => (
                        <div key={e.toString()}>
                          <button value={e} onClick={(e) => handleDelete(e)}>
                            xxx
                          </button>
                          <h4>{e}</h4>
                        </div>
                      ))}
                    </div>
                  </div>
                  <br />
                </div>

                <div className={style.btnSubmit}>
                 <button onClick={()=>handleRemove()}>Delete</button>
                 <br>
                 </br>
                  <button type="submit">Create</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
