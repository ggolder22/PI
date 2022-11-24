import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";


import {
    getRecipes,
    getDiets,
    orderByAZ,
    orderByZA,
    orderHealthScoreAsc,
    orderHealthScoreDesc,
    filterDiets,
    loadingAction,
} from "../../redux/actions";
import style from "./Home.module.css";
import Navbar from "../navbar/Navbar";
import refreshimg from "../Image/refresh.png";
import Loader from "../Image/loader.gif";
import Paginado from "../paginado/Paginado";
import Card from "../card/Card"

export default function Home() {
    const dispatch = useDispatch();
    const recipes = useSelector((state) => state.recipe);
    const loading = useSelector((state) => state.loading);
    const diets = useSelector((state) => state.diets)
    //console.log(diets);

    useEffect(() => {
        dispatch(getRecipes());
        dispatch(getDiets());
        setTimeout(() => {
            dispatch(loadingAction(false));
        }, 3000);
    }, [dispatch]);

    //paginado   
    // defino estados locales. 

    const [page, setPage] = useState(1); // defino la pagina actual, y un estado que me setee la pagina actual 
    const recipePage = 9; // defino cuantas recetas por pagina 
    const lastPage = page * recipePage;  //pagina actual por la cantidad de recetas por pagina
    const firstPage = lastPage - recipePage; //indice de la primera receta
    const currentRecipes = recipes.slice(firstPage, lastPage);  //son las recetas de la pagina actual. //el slice corta un arreglo basado en lo que le pase por parametro 

    const paginado = (numPage) => {  //seteo en la página en el numero de la pagina//esto me ayuda en el renderizado
        setPage(numPage);
    };


    //SORT
    const [refreshState, setRefreshState] = useState(false);

    const handleSortTitle = (e) => {
        if (e.target.value === "orderAZ") {
            dispatch(orderByAZ(refreshState));
            setRefreshState(true);
            setPage(1);
        } else if (e.target.value === "orderZA") {
            dispatch(orderByZA(refreshState));
            setRefreshState((prevState) => !prevState);
            setPage(1);
        }
    };

    const handleSortScore = (e) => {
        if (e.target.value === "ascScore") {
            dispatch(orderHealthScoreAsc(refreshState));
            setRefreshState((prevState) => !prevState);
            setPage(1);
        } else if (e.target.value === "descScore") {
            dispatch(orderHealthScoreDesc(refreshState));
            setRefreshState((prevState) => !prevState);
            setPage(1);
        }
    };


    const handleFilter = (e) => {
        dispatch(filterDiets(e.target.value));
        setPage(1);
    };

    function handleRecipes(e) {
        e.preventDefault();
        dispatch(getRecipes());
        paginado(1);
        dispatch(loadingAction(true));
        setTimeout(() => {
            dispatch(loadingAction(false));
        }, 3000);
    }

    // const handleDelete = (id) => {
    //     dispatch(deleterecipe(id));
    // }

    //Renderizado

    return (

        <div className={style.bg}>
            <div className={style.bg}>
                <div className={style.navBar}>

                    <Navbar paginado={paginado} />
                </div>
                <div z-index="60">
                    <div className={style.filtroPaginado}>
                        <div className={style.sortFilter}>
                            <div className={style.refresh}>
                                <img src={refreshimg} alt="Refresh" onClick={(e) => handleRecipes(e)} />

                            </div>
                            <select onChange={handleSortTitle} defaultValue="default">
                                <option default>Sort Title</option>
                                <option value="orderAZ">Recipes A-Z</option>
                                <option value="orderZA">Recipes Z-A</option>
                            </select>
                            <select onChange={handleSortScore} defaultValue="default">
                                <option default>Sort Score</option>
                                <option value="ascScore">Ascendente</option>
                                <option value="descScore">Descendente</option>
                            </select>

                            <select onChange={handleFilter} defaultValue="default">
                                <option value="all">All Diets</option>
                                {diets.length ? diets.map((e) =>
                                    <option value={e.name} key={e.id}>{e.name}</option>) : null}

                                {/*<option value="dairy free">Dairy Free</option>
                                <option value="fodmap friendly">Fodmap Friendly</option>
                                <option value="gluten free">Gluten Free</option>
                                <option value="ketogenic">Ketogenic</option>
                                <option value="lacto - vegetarian">Lacto Vegetarian</option>
                                <option value="lacto ovo vegetarian">Lacto Ovo Vegetarian</option>
                                <option value="low FODMAP">Low FODMAP</option>
                                <option value="ovo - vegetarian">Ovo Vegetarian</option>
                                <option value="paleolithic">Paleolithic</option>
                                <option value="pescatarian">Pescatarian</option>
                                <option value="primal">Primal</option>
                                <option value="vegan">Vegan</option>
                                <option value="vegetarian">Vegetarian</option>
                                <option value="whole 30">Whole 30</option> */}
                            </select>

                            <select>
                                <option value="all">All</option>
                                <option value="created">Created</option>
                                <option value="api">Existent</option>
                            </select>

                            {/* <button onClick={() => handleDelete(r.id)}>Delete</button> */}
                        </div>
                    </div>
                    <div className={style.paginado}>
                        <Paginado
                            recipePage={recipePage}
                            recipes={recipes.length}
                            paginado={paginado}
                            page={page}
                        />
                    </div>
                </div>
                <div className={style.card}>
                    {loading ? (
                        <div className={style.gif}>
                            <img src={Loader} alt="Loading" />
                        </div>
                    ) : (
                        <div className={style.card1}>
                            {currentRecipes?.map((r) => {
                                return (
                                    <div key={r.id}>
                                        <Card
                                            id={r.id}
                                            name={r.name}
                                            img={r.img}
                                            diets={r.diets}
                                            healthScore={r.healthScore}
                                        />
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>






            </div>

        </div>
    )





}







