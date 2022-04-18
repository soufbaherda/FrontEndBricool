import React, { useEffect, useState } from "react";
import del from "./images/delivery.jpg";
import "./listeoffre.css"

import demande from './images/demande.jpg'

import { BrowserRouter, Route,  Link } from "react-router-dom";
import { Button } from "bootstrap";
import { useLocation } from "react-router-dom";


export default function ListeOffere(props) {
    //const paperStyle = { padding: '50px 20px', width: 600, margin: "20px auto" };
    const location = useLocation();
    const { from } = location.state;
    const [Offres, setOffres] = useState([])
    //const classes = useStyles(false)
    const rafraichir = () => {
        fetch("http://localhost:8080/offre/GetOffreEmp/"+from)
            .then(res => res.json())
            .then((result) => {
                setOffres(result);console.log(result)
            }
            )
    }

    useEffect(() => {
        rafraichir()
    }, [])




    return (
        <div id={"back"}>
            <img className="im" style={{ width: "40%" }}
                src={demande} alt="demande" />
            <div className="desarchiver-container">
                <h2 className="ph" >Mes Offres </h2>
            </div>
            <div id={"results"}>
                <label style={{
                    fontfamily: "Candara",
                    width: "20%",
                    height: "20%",
                    textalign: "left",
                    padding: "1%"
                }}>
                    {Offres.length} postulation(s)
                </label>
                {Offres.map(Offre => {
                    return (
                        <div id={"postuler"} key={Offre.id}>

                            <div id="iconcont">
                                <img id={"icon"} src={del} /></div>
                            <div id={"infos"}>
                                <label id={"employee"}>{Offre.titre}</label>
                                <label id={"description"}>{Offre.description}</label>
                                <label id={"duree"}>{Offre.domaine}</label>
                                <label id={"prix"}>{Offre.ville}</label>
                            </div>
                            <div id="delete">
                                < button id={"accept"} >Demandes</button>

                            </div>
                        </div>

                    );
                })}
            </div>
        </div >
    );

}