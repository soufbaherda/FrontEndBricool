import React, { useEffect, useState } from "react";
import logo from "../../login2.png";
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import Col from "react-bootstrap/Col"
import Profil from "./ProfilSet";
import Navbar from "./nav";
import { io } from "socket.io-client";
import "./style.scss";

export default function LoginTry(props) {
  const socket = props.socket;
  const [validated, setValidated] = useState(false);
  const [email, setEmail] = useState("");
  const [id, setId] = useState("");
  const [mdp, setMdp] = useState("");
  const [connexion, setConnexion] = useState({});
  const [compte, setCompte] = useState({});
  const [mess, setMess] = useState("false");
  const handleSubmit = (event) => {
    const form = event.currentTarget;
    event.preventDefault();
  
    var compte = JSON.stringify({
      "email": email,
      "mdp": mdp,
    });
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: compte,
      redirect: 'follow'
    };

      fetch("http://localhost:8080/login", requestOptions)
      .then(response => response.json())
      .then(data => {setId(data.id) 
        connect(data);});
     };
     useEffect(() => {
        socket?.emit("newUser", id);
        console.log({socket});
    }, [socket, id]);
  
  const connect = (d) => {
    setConnexion(d);
    if (d.status === "true") {
      setId(d.id);
      //console.log({id})
      props.updateconnection(d);
    }
    else {
      setMess("true");
    }
  }
  return (

    <div className="content">
      <div className="image">
        <img src={logo} width="40" alt="logo" />
      </div>
      <Form className="form" noValidate validated={validated} onSubmit={handleSubmit} >
        <Form.Group as={Col} md="8" controlId="formBasicEmail" onChange={(e) => setEmail(e.target.value)} >
          <Form.Label className="label">Email</Form.Label>
          <Form.Control
            required
            type="email"
            placeholder="Example@gmail.com"

          />
          <Form.Control.Feedback type="invalid" >Entrer mail valide.</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="8" controlId="formBasicPassword" onChange={(e) => setMdp(e.target.value)} >
          <Form.Label className="label">Mot de passe</Form.Label>
          <Form.Control
            required
            type="password"
            placeholder="password"
          />

          <Form.Control.Feedback type="invalid">Entrer mot de passe valide.</Form.Control.Feedback>
        </Form.Group>
        <div><p> </p></div>
        <Button type="submit">Se connecter</Button>
      </Form>
      {mess === "true" ? <p className="error">mot de passe ou email incorrect !</p> : <></>}
    </div>
  );
}
