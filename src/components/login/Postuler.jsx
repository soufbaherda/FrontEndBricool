import React, { useEffect, useState } from "react";
import del from "./images/delivery.jpg";
import demande from "./images/demande.jpg";
import { useParams } from 'react-router-dom';
import "./offre.css"
import { PropaneSharp } from "@mui/icons-material";



export default function Postuler(props) {
    //const paperStyle = { padding: '50px 20px', width: 600, margin: "20px auto" };
    const { id } = useParams();

    const [Postulers, setPostulers] = useState([])
    //const classes = useStyles(false)

    const rafraichir = () => {
        fetch("http://localhost:8080/postulation/get/"+props.id)
            .then(res => res.json())
            .then((result) => {
                setPostulers(result);
            }
)
    }

    function handleRemove(id) {
        const newList = Postulers.filter((Postuler) => Postuler.id !== id);
        setPostulers(newList);
    }


    useEffect(() => {
        rafraichir()
    }, [])
    

    return (

        <div id={"back"}>
            <img className="im" style={{width :"40%"}}
                src={demande} alt="demande" />
            <div className="desarchiver-container">
                <h2 className="ph" >Liste Des Postulations </h2>
                <button id={"btn1"} onClick={() => rafraichir()}>
                    Désarchiver
                </button>
            </div>
            <div id={"results"}>
                <label style={{
                    fontfamily: "Candara",
                    width: "20%",
                    height: "20%",
                    textalign: "left",
                    padding: "1%"
                }}>
                    {Postulers.length} postulation(s)
                </label>
                {Postulers.map(Postuler => {
                    return (
                        <div id={"postuler"} key={Postuler.id}>

                            <div id="iconcont">
                                <img id={"icon"} src={del} /></div>
                            <div id={"infos"}>
                                <label id={"employee"}>{Postuler.employee["nom"]} {Postuler.employee["prenom"]}</label>
                                <label id={"description"}>{Postuler.description}</label>
                                <label id={"duree"}>{Postuler.duree} heures</label>
                                <label id={"prix"}>{Postuler.prix} DH</label>
                            </div>
                            <div id={"validation"}>
                                <button id={"check"} onClick={() => handleRemove(Postuler.id)}>
                                    Archiver
                                </button>
                            </div>
                            <div id="delete">
                                <button id={"accept"}>Accepter</button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div >
    );

}