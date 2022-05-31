import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import "./DetailModal.css"
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import { Alert } from "@mui/material";

function DetailModal(props) {
    const [validated, setValidated] = useState(false);
    const [domaine, setDomaine] = useState("");
    const [duree, setDuree] = useState("");
    const [prix, setPrix] = useState("");
    const [description, setDescription] = useState("");

    const postuler = () => {
        fetch("http://localhost:8080/postulation/post", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "prix": prix,
                "duree": duree,
                "description": description,
                "idOffre": props.item.id,
                "employee": {
                    "id": props.idUser,
                },
            }),
        });

    };


    const handleChange5 = (event) => {
        setDomaine(event.target.value);
    };
    const handleChange6 = (event) => {
        setDescription(event.target.value);
    };
    const handleChange7 = (event) => {
        setDuree(event.target.value);
    };
    const handleChange8 = (event) => {
        setPrix(event.target.value);
    };

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        event.preventDefault();
        setValidated(true);
        postuler();
    }

    const fillblank = (x) => {
        if (x === "")
            return "Non affectée"
        return x
    }


    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            scrollable={true}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Detail de "{props.item["titre"]}"
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Container>
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">Offre</th>

                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="row">Titre</th>
                                <td>{props.item["titre"]}</td>
                            </tr>
                            <tr>
                                <th scope="row">Description</th>
                                <td>{props.item["description"]}</td>
                            </tr>
                            <tr>
                                <th scope="row">Domaine</th>
                                <td>{props.item["domaine"]}</td>
                            </tr>
                            <tr>
                                <th scope="row">Région</th>
                                <td>{fillblank(props.item["region"])}</td>
                            </tr>
                            <tr>
                                <th scope="row">Ville</th>
                                <td>{fillblank(props.item["ville"])}</td>
                            </tr>
                            <tr>
                                <th scope="row">Date de post</th>
                                <td>{props.item["dateP"]}</td>
                            </tr>
                        </tbody>
                    </table>
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">Employeur</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="row">Nom</th>
                                <td>{props.user.nom}</td>
                            </tr>
                            <tr>
                                <th scope="row">Prénom</th>
                                <td>{props.user.prenom}</td>
                            </tr>
                            <tr>
                                <th scope="row">Télephone</th>
                                <td>{props.user.tel}</td>
                            </tr>

                        </tbody>
                    </table>
                    <table className="table">
                    </table>
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">Postulat</th>
                            </tr>
                        </thead>
                        <tbody>{
                            <Container>
                                <Row>
                                    <Col>
                                        <Form noValidate validated={validated}>
                                            <Form.Group controlId="validationCustom05">
                                                <Form.Control
                                                    size="xs"
                                                    type="text"
                                                    placeholder="duree"
                                                    onChange={handleChange7}
                                                    required
                                                ></Form.Control>
                                                <Form.Control.Feedback type="invalid">
                                                    veuillez entrer une duree
                                                </Form.Control.Feedback>
                                            </Form.Group>
                                            <br />
                                            <Form.Group controlId="validationCustom06">
                                                <Form.Control
                                                    size="xs"
                                                    type="text"
                                                    placeholder="prix"
                                                    onChange={handleChange8}
                                                    required
                                                ></Form.Control>
                                                <Form.Control.Feedback type="invalid">
                                                    veuillez entrer un prix
                                                </Form.Control.Feedback>
                                            </Form.Group>
                                            <br />
                                            <Form.Group controlId="validationCustom08">
                                                <Form.Control
                                                    size="xs"
                                                    as="textarea"
                                                    placeholder="description"
                                                    onChange={handleChange6}
                                                    required
                                                ></Form.Control>
                                                <Form.Control.Feedback type="invalid">
                                                    veuillez entrer une description
                                                </Form.Control.Feedback>
                                            </Form.Group>
                                        </Form>
                                    </Col>
                                </Row>
                            </Container>}
                        </tbody>
                    </table>
                </Container>
            </Modal.Body>
            <Modal.Footer>
                <Button id={"button1"} onClick={handleSubmit}>Postuler</Button>
                <Button id={"button1"} onClick={props.onHide}>Fermer</Button>

            </Modal.Footer>
        </Modal>
    );
}

export default DetailModal;