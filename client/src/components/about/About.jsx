import React from "react";
import style from "../about/About.module.css";
import { Link } from "react-router-dom";
import Logo from "../Image/home-icon.png";
import github from "../Image/github.png";
import linkedin from "../Image/linkedin.png";
import email from "../Image/email.png";

export default function About() {
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
                        <h1>About me</h1>
                        <div className={style.contenido}>
                            <h3>
                                I’m an executive with electrmechanical background. More than
                                15 years of experience in fields like
                                Industrial maintenance, assets
                                management and energy related
                                services.
                                Leading development of Artificial
                                Intelligence techniques with focus on
                                several market segments like Energy,
                                Finance and Sustainability.
                                Self-motivated and independent. I’m
                                an adaptable and efficient team
                                player with excellent communication
                                skills at all levels. I’m looking for a role
                                where I can develop my skills further,
                                researching new technologies and
                                thriving in new challenges.

                            </h3>
                            <h2>Tech Stack</h2>
                            <h3>
                                ReactJS - Redux - CSS puro - - NodeJS - Express - Sequelize - PostegreSQL - GitHub - Firebase
                            </h3>
                            <h2>Contact me</h2>
                            <div className={style.contact}>
                                <a className={style.circle} target="_black" href={"https://ggolder22"}>
                                    <img src={github} alt="Logo" />
                                    <h4>Github</h4>
                                </a>
                                <a
                                    className={style.circle}
                                    target="_black"
                                    href={"https://www.linkedin.com/in/german-ariel-golder-hecker-a9b25b25/"}
                                >
                                    <img src={linkedin} alt="Logo" />
                                    <h4>LinkedIn</h4>
                                </a>
                                <a
                                    className={style.circle}
                                    target="_black"
                                    href={"mailto:germanxvzy985@hotmail.com"}
                                >
                                    <img src={email} alt="Logo" />
                                    <h4>germanxvzy985@hotmail.com</h4>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
