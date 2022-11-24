import React from "react";
import { Link } from "react-router-dom";
import style from "./Card.Module.css";

export default function Card({ name, img, diets, id, healthScore }) {
    return (
        <div className={style.card}>
            <div className={style.infoCard}>
                <img title={name} src={img} alt="Img not Found" />
                
            </div>
            <div className={style.btnI}>
                <div>
                    <h3>{name}</h3>
                    
                </div>
                <Link to={`/recipes/${id}`}>
                    <button title="Click to open details">i</button>
                </Link>
            </div>
            <br />
            <div className={style.infoCard3}>
                <div className={style.infoCard2}>
                    <div>{diets ? diets.map((t) => <h5 key={t}>{t}</h5>) : <h5>Not Diets</h5>}</div>
                </div>
            </div>
            <div className={style.h4}>
                <h5> {`HealthScore: ${healthScore}%`}</h5>
            </div>
        </div>
    )
}