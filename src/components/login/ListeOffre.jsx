import React, { useEffect, useRef, useState } from "react";
import delivery from "./images/delivery.jpg";
import demande from './images/demande.jpg';
import "./offre.css"
import Postuler from "./Postuler";
import Modal from "react-bootstrap/Modal";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions, Grid } from '@mui/material';
import { useLocation, Link, BrowserRouter, Route, Switch } from "react-router-dom";
import { Box } from "@mui/system";
import { Label } from "@mui/icons-material";



export default function ListeOffre(props) {
    //const paperStyle = { padding: '50px 20px', width: 600, margin: "20px auto" };
    const location = useLocation();
    const { from } = location.state;
    var id = from;
    const [idOff, setIdOff] = useState();
    const [open, setOpen] = useState(false);

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };
    const [Offres, setOffres] = useState([]);
    //const classes = useStyles(false)
    const rafraichir = () => {
        fetch("http://localhost:8080/offre/GetOffreEmp/" + id)
            .then(res => res.json())
            .then((result) => {
                setOffres(result);
            }
            )
    }

    const Cloturer = (IdOffre) => {
        fetch(`http://localhost:8080/offre/CloturerOffre/${IdOffre}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title: 'React Hooks PUT Request Example' }),
        })
            .then((res) => console.log(res))
            .catch((error) => console.log(error))
    }
    useEffect(() => {
        rafraichir()
    })
    return (
        <div id={"back"}>
            <img className="im" style={{ width: "30%" }}
                src={demande} alt="demande" />
            <div className="desarchiver-container">
                <h2 className="ph" >Mes Offres </h2>
            </div>
            <div id={"results"}>
                <label style={{
                    fontfamily: "Candara",
                    width: "20%",
                    height: "20%",
                    textalign: "left"
                }}>
                    {Offres.length} postulation(s)
                </label>
                <Grid style={{
                    margin: "1%",
                    display: "flex",
                    background: "rgba(222, 222, 222, 0.75)",
                    borderRadius: "10px"
                }} container spacing={2} >
                    {Offres.map((Offre) => {
                        return (
                            <Grid item xs={3} style={{ marginBottom: "1%" }}>
                                <Card sx={{ maxWidth: 300, height: 600 }} >
                                    <CardActionArea disabled>
                                        <CardMedia
                                            component="img"
                                            height="30%"
                                            width="30%"
                                            image={delivery}
                                            alt="green iguana"
                                        />
                                        <CardContent sx={{ height: 250 }}>
                                            <Typography gutterBottom variant="h5" component="div">
                                                {Offre.titre}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                <p>
                                                    <p style={{ display: "flex", overflow: "auto", maxHeight: 70 }}><p style={{ fontWeight: "bold" }}> Description: </p> {" " + Offre.description}</p>
                                                    <p style={{ display: "flex" }}><p style={{ fontWeight: "bold" }}> Domaine: </p> {" " + Offre.domaine}</p>
                                                    <p style={{ display: "flex" }}> <p style={{ fontWeight: "bold" }}> Ville: </p> {" " + Offre.ville}</p>
                                                </p>
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                    <CardActions style={{margingBottom : "0%"}}>
                                        {(Offre.status == "active") ? <Button  id={"accept"}
                                            component={Link} to={`/Postuler/${Offre.id}`} state={{ from: id }} > Demende</Button> :
                                            (Offre.status == "En_cours") ? < Button   id={"accept"} style={{ background: "#F95C19" }} variant="primary" onClick={() => {
                                                handleOpen();
                                                setIdOff(Offre.id);
                                                console.log(Offre.id);
                                            }}>En cours</Button> : < Button  id={"accept"} style ={{background :"blue"}}  variant="primary" disabled> Cloturer </Button>}
                                    </CardActions>
                                </Card>

                                <Modal show={open} onHide={() => setOpen(false)} key={Offre.id}>
                                    <Modal.Header closeButton>
                                        <Modal.Title> Fin de service</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body >
                                        <p style={{ textAlign: "center" }}> Voulez vous mettre fin au service ?</p>
                                    </Modal.Body>
                                    <Modal.Footer  >
                                        <div >
                                            <Button style={{ textAlign: "center", marginTop: "10%", left: "10%" }} type="button"
                                                class="btn btn-success"
                                                onClick={() => {
                                                    Cloturer(Offre.id);
                                                    handleClose();
                                                }}>
                                                Confirmer
                                            </Button>
                                            <Button style={{ textAlign: "center", marginTop: "10%", left: "20%" }} onClick={() => {
                                                handleClose();
                                            }}
                                                type="button" class="btn btn-danger">Annuler</Button>
                                        </div>
                                    </Modal.Footer>
                                </Modal>
                            </Grid>
                        );
                    })}
                </Grid>
            </div>
        </div >
    );

}