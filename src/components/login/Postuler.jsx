import React, { useEffect, useState } from "react";
import del from "./images/delivery.jpg";
import demande from "./images/demande.jpg";
import { useParams, useLocation, Link } from 'react-router-dom';
import Modal from "react-bootstrap/Modal";
import { Button, CardActionArea, CardActions, Grid } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { io } from "socket.io-client";
import ProfilModal from "./ProfilModal";
import Profil from "./profil";
import { ModalFooter } from "react-bootstrap";
import "./offre.css"


export default function Postuler({ socket }) {
    //const paperStyle = { padding: '50px 20px', width: 600, margin: "20px auto" };
    const { id } = useParams();
    const [employee, setEmployee] = useState(null);
    const [accept, setAccept] = useState(false)
    const [Postulers, setPostulers] = useState([])
    const [user, setUser] = useState("");
    const [open, setOpen] = useState(false);

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };
    //const classes = useStyles(false)
    var PostulerId;
    const rafraichir = () => {
        fetch(`http://localhost:8080/postulation/get/${id}`)
            .then(res => res.json())
            .then((result) => {
                setPostulers(result);
            }
            )
    }
    const Encours = (IdEmploye) => {
        fetch(`http://localhost:8080/offre/UpdateOffre/${id}/${IdEmploye}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title: 'React Hooks PUT Request Example' }),
        })
            .then((res) => console.log(res))
            .catch((error) => console.log(error))
    };

    // const Affecter = (IdEmploye) => {
    //     fetch(`http://localhost:8080/offre/Employe/${id}/`, {
    //         method: 'PUT',
    //         headers: { 'Content-Type': 'application/json' },
    //         body: JSON.stringify({ title: 'React Hooks PUT Request Example' }),
    //     })
    //         .then((res) => console.log(res))
    //         .catch((error) => console.log(error))
    // };

    const profil = (id) => {
        fetch("http://localhost:8080/GetCompte/" + id)
            .then(res => res.json())
            .then((result) => {
                setEmployee(result);
            })

    };

    useEffect(() => {
        rafraichir()
    }, [])


    return (
        <div id={"back"}>
            <img className="im" style={{ width: "40%" }}
                src={demande} alt="demande" />
            <div className="desarchiver-container">
                <h2 className="ph" >Liste Des Postulations </h2>
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
                <Grid style={{
                    margin: "1%",
                    display: "flex",
                    background: "rgba(222, 222, 222, 0.75)",
                    borderRadius: "10px"
                }} container spacing={2} >
                    {Postulers.map((Postuler) => {
                        return (
                            <Grid item xs={3} style={{ marginBottom: "1%" }} key={Postuler.id} socket={socket} user={Postuler.employee.id}>
                                <Card sx={{ maxWidth: 300, height: 600 }} >
                                    <CardActionArea disabled>
                                        <CardMedia
                                            component="img"
                                            height="30%"
                                            width="30%"
                                            image={del}
                                            alt="green iguana"
                                        />
                                        <CardContent sx={{ height: 250 }}>
                                            <Typography gutterBottom variant="h5" component="div">
                                                {Postuler.description}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                <p>
                                                    <p style={{ display: "flex" }}><p style={{ fontWeight: "bold" }}> Duree: </p> {Postuler.duree} H </p>
                                                    <p style={{ display: "flex", fontWeight: "bold" }}> {Postuler.prix} Dh </p>
                                                </p>
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                    <CardActions>
                                        <Button id={"accept"} onClick={() => {
                                            setAccept(true);
                                            handleOpen();
                                            PostulerId = Postuler.employee.id;
                                            socket?.emit("sendNotification", {
                                                senderOffreid: id,
                                                receiverid: PostulerId,
                                            });
                                            Encours(PostulerId);
                                            //Affecter(PostulerId);
                                            profil(PostulerId);
                                            console.log({ employee });
                                        }}
                                        >
                                            Accepter
                                        </Button>
                                    </CardActions>
                                </Card>
                                <Modal show={open} onHide={() => setOpen(false)}>
                                    <Modal.Header closeButton>
                                        <Modal.Title>Employé</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>{employee && <div style={{
                                        osition: "relative",
                                        textAlign: "center"
                                    }} >
                                        <figure style={{
                                            position: "relative",
                                            textAlign: "center",
                                            margin: "auto",
                                            background: "#0C44A3",
                                            borderRadius: "50%",

                                            width: "100px",
                                            height: "100px",
                                            paggin: "5%"
                                        }}> <h2 style={{
                                            position: "relative",
                                            textAlign: "center",
                                            top: "30%",
                                            // left: "50%"
                                        }}>{employee.nom[0].toUpperCase()}{employee.prenom[0].toUpperCase()}</h2></figure>
                                        <div key={employee.id}>
                                            <label style={{ fontWeight: "bold", marginTop: "5%", fontSize: "24px" }} id={"employee"} >{employee.nom} {employee.prenom}</label>
                                            <label id={"employee"}>{employee.username}</label>

                                            <label id={"employee"}><label style={{ fontWeight: "bold", display: "flex" }} >Email : </label>{employee.email}</label>
                                            <label id={"employee"}><label style={{ fontWeight: "bold", display: "flex" }} >Tel : </label> {employee.tel}</label>
                                            <label id={"employee"}><label style={{ fontWeight: "bold", display: "flex" }} >Adresse : </label> {employee.adresse}</label>
                                        </div>
                                    </div>}
                                        <Button style={{ marginTop: "10%", left: "25%" }} type="button"
                                            class="btn btn-success"> Contacter</Button>
                                        <Link style={{ textAlign: "center", marginTop: "10%", left: "35%" }}
                                            component="button"  to={`/`} class="btn btn-danger"> Close</Link>
                                    </Modal.Body>
                                </Modal>
                            </Grid>
                        );

                    })}
                </Grid>
            </div>
        </div >
    );

}