import React from "react";
import { useParams, Link, useHistory } from "react-router-dom";
import { getRecipeById, clearDetail, addFavorites, loadingAction, DELETE_RECIPE, deleteRecipeById } from "../../redux/actions";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import imgNotAvailable from "../Image/Image_not_available.png";
import style from "./CardDetail.module.css";
import Logo from "../Image/home-icon.png";
import Loader from "../Image/loader.gif";

export default function CardDetail() {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.loading);
  const recipeDetail = useSelector((state) => state.recipeDetail);
  const history = useHistory();  //invoca  el historial de navegacion 
  const { id } = useParams(); //esto permite ingresar a los parámetros de la ruta actual
  //console.log(id, "id");

  const handleFavoritos = () => {
    dispatch(addFavorites(recipeDetail))
    alert("The recipe has been added to your favorite page")
  }

  const handleDelete=(id)=>{

    dispatch(deleteRecipeById(id))
    .then(res => alert(res.payload))
    history.push("/recipes")
  }

  useEffect(() => {
    dispatch(getRecipeById(id));
    dispatch(loadingAction(true));
    setTimeout(() => {
      dispatch(loadingAction(false));
    }, 3000);

    return () => {
      // esto limpia el componente de los detalles anteriores que se hayan cargado
      dispatch(clearDetail([]));
    };





  }, [dispatch, id]);

  var ingredients = "";

  if (typeof (recipeDetail.id) !== "string") {
    const rawIng = recipeDetail.steps?.map((a) => {
      if (a.ingredients) {

        return a.ingredients?.map((a) => a.name)

      }
    }).flat();

    ingredients = [...new Set(rawIng)]
  }


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
            <Link to="/favorites">
              <button>Favorites</button>
            </Link>
          </div>
        </div>
        <div className={style.position} z-index="60">
          {loading ? (
            <div className={style.gif}>
              <img src={Loader} alt="Loading" />
            </div>
          ) : (<>

            <div className={style.bgDetail}>
              <h1>{recipeDetail.name}</h1>
              <div className={style.contenido}>
                <img className={style.img} onClick={handleFavoritos} title="Click if you whant to add to favorite list" src={recipeDetail.img /*|| imgNotAvailable*/} alt="Img not found" />
                {/* <span className={style.mensaje}>Welcome</span> */}
                <div className={style.contenido2}>
                    {typeof(recipeDetail.id)==="string" && recipeDetail.id.includes("-") && 
                      <button className={style.remove} onClick={()=>handleDelete(recipeDetail.id)}>Delete</button>}
                  <h3>Health Score: </h3>
                  <h4>{`${recipeDetail.healthScore}%`}</h4>
                  <h3>Diets Type: </h3>
                  {recipeDetail.diets ? (
                    <div>
                      {recipeDetail.diets.map((d) => {
                        if (typeof recipeDetail.diets[0] === "object") {
                          return <h4 key={d.name}>{d.name}</h4>;
                        }
                        return <h4 key={d}>{d}</h4>;
                      })}
                    </div>
                  ) : (
                    <h4>Not diets</h4>
                  )}
                  <h3>Dish Type: </h3>
                  {Array.isArray(recipeDetail.dishTypes) ? (   // aca modificque el codigo 
                    <div>
                      {recipeDetail.dishTypes.map((e) => {
                        if (typeof recipeDetail.dishTypes[0] === "object") {
                          return <h4 key={e.id}>{e.name}</h4>;
                        }
                        return <h4 key={e}>{e}</h4>;
                      })}
                    </div>
                  ) : (
                    <h4>Not dish</h4>
                  )}
                </div>
              </div>
            </div>
            <div className={style.bgDetail2}>
              <div className={style.contenido3}>
                <h3>Summary: </h3>
                <p>{recipeDetail.summary?.replace(/<[^>]*>/g, "")}</p>
              </div>
            </div>
            {Array.isArray(recipeDetail.steps) ?
              <div className={style.bgDetail2}>

                <div className={style.contenido3}>
                  <h3>Instructions:</h3>

                  <div>
                    {recipeDetail.steps?.map((a) => {
                      return (
                        <div>
                          <p>Step {a.number}: </p>
                          <p>{a.step}</p>
                        </div>
                      )
                    })}

                  </div>
                </div>
              </div>
              : <div>
                <p>{recipeDetail.steps}</p>
              </div>
            }


            {(ingredients.length) ?
              <div className={style.bgingredients}>
                <div className={style.contenidoingredients}>
                  <h3>Ingredients</h3>
                  <ul>
                    {ingredients.map((a) => {
                      return (
                        <li>{a}</li>
                      )
                    })}
                  </ul>
                </div>
              </div>
              : null
            }
          </>)}
        </div>

      </div>

    </div>
  );
}
