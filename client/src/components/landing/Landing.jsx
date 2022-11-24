import React from "react";
import { Link } from "react-router-dom" // por que traigo esto? preguntar a alauta
import style from "./Landing.module.css"


export default function Landing() {
    return (
        <div className={style.bgImg}>   {/* iamagen de fondo de la landing */}
            <div className={style.bgImg2}>
                <Link to="/recipes">
                    <div className={style.bgImg3}>
                        {/* <h1>HENRY FOOD</h1> */}
                        <span className={style.mensaje}>Welcome</span>
                        {/* <button>XXXXXXXXXX</button> */}
                    </div>
                </Link>
            </div>
        </div>
    );
}