import React from "react";
import { Link } from "react-router-dom";
import Card from "../card/Card"
import { useSelector, useDispatch } from "react-redux";
import { deleteFav } from "../../redux/actions";
import Navbar from "../navbar/Navbar";
import style from "../favorites/Favorites.module.css"
import Logo from "../Image/home-icon.png";





export default function Favorites() {
    const dispatch = useDispatch();

    const favorites = useSelector((state) => state.favorites);

    const handleDelete = (id) => {
        dispatch(deleteFav(id));

    }



    return (

        <div className={style.bg}>
            <div className={style.nav}>
                <Link to="/">
                    <img src={Logo} alt="Logo" />
                </Link>
                <Link to="/recipes">
                    <button>Back</button>
                </Link>
            </div>
            <div className={style.body}>
                <div  className={style.body}>
                <br/>
                <h1>Favorites</h1>
                <div className={style.body}>
                <ul>{favorites.length ? favorites.map((r) => {
                    return (
                        <div key={r.id}>
                            <Card
                                id={r.id}
                                name={r.name}
                                img={r.img}
                                diets={r.diets}
                                healthScore={r.healthScore}
                            />
                            <button onClick={() => handleDelete(r.id)} >Remove Recipe</button>
                        </div>
                    );
                }) : null}

                </ul>
                </div>
            </div>
        </div>
        </div>







    );
}