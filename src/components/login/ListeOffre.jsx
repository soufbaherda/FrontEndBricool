import React, { useEffect, useState } from "react";
import del from "./images/delivery.jpg";
import demande from './images/demande.jpg';
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import "./offre.css"
import Postuler from "./Postuler";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import { useLocation } from "react-router-dom";


export default function ListeOffere(props) {
    //const paperStyle = { padding: '50px 20px', width: 600, margin: "20px auto" };
    const location = useLocation();
    const { from } = location.state;
    var id = from;
    const [Offres, setOffres] = useState([]);
    //const classes = useStyles(false)
    const [show, setShow] = useState(false);
    const [fullscreen, setFullscreen] = useState(true);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const rafraichir = () => {
        fetch("http://localhost:8080/offre/GetOffreEmp/" + id)
            .then(res => res.json())
            .then((result) => {
                setOffres(result);
            }
            )
    }

    useEffect(() => {
        rafraichir()
    }, [])




    return (
        <div id={"back"}>
            <img className="im" style={{width :"30%"}}
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
                                <label id={"description"}>{"description: "+Offre.description}</label>
                                <label id={"duree"}>{"domaine: "+Offre.domaine}</label>
                                <label id={"prix"}>{Offre.ville}</label>
                            </div>
                            <div id="delete">
                                < button id={"accept"} variant="primary" onClick={handleShow}>Demandes</button>
                                <Modal size="lg" aria-labelledby="contained-modal-title-vcenter" centered show={show} onHide={handleClose} >
                                    <Modal.Header closeButton>
                                        <Modal.Title>Modal heading</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <Postuler id={Offre.id} />
                                        
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Button variant="secondary" onClick={handleClose}>
                                            Close
                                        </Button>
                                    </Modal.Footer>
                                </Modal>
                            </div>
                        </div>

                    );
                })}
            </div>
        </div >
    );

}