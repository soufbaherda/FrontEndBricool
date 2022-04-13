import React from "react";
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import InputGroup from "react-bootstrap/InputGroup"
import { useState } from "react";
import "./style.scss";
import Navbar from "./nav";

export default function Register () {
  const [validated, setValidated] = useState(false);
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [tel, setTel] = useState("");
  const [adresse, setAdresse] = useState("");
  const [mdp, setMdp] = useState("");
  const [type, setType] = useState("");
  const [mailerror, setMailerror] = useState("false");
  const verify=()=>{
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
  };

  fetch("http://localhost:8080/verify/"+email, requestOptions)
  .then(response => response.json())
    .then(data =>setMailerror(data.exist))
  }
  const handleSubmit = (event) => {
    verify();
    const form = event.currentTarget;
    if (form.checkValidity() === false || mailerror==="false") {
      event.preventDefault();
      event.stopPropagation();
      
    }
    else{
      var compte = JSON.stringify({
        "nom": nom,
        "prenom": prenom,
        "username":username,
        "email":email,
        "tel":tel,
        "adresse":adresse,
        "mdp":mdp,
        "type":type
      
  });
  var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: compte,
      redirect: 'follow'
  };

  fetch("http://localhost:8080/register", requestOptions)
}
    setValidated(true);
  };
    return (
      <div className="App" >
    <div className="login">
    <div className="container" >
      <div className="base-container" >
        <Navbar/>
        <div className="header">Inscription</div>
        <div className="content">
        <Form  className="form" noValidate validated={validated} onSubmit={handleSubmit} >
        <Row className="mb-3">
        <Form.Group  as={Col} md="6" controlId="validationCustom01" onChange={(e) => setNom(e.target.value)}>
          <Form.Label className="label">Nom</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Nom"
            
          />
          
        </Form.Group>
        <Form.Group as={Col} md="6" controlId="validationCustom02" onChange={(e) => setPrenom(e.target.value)} >
          <Form.Label>Prenom</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Prenom"
            
          />
        </Form.Group>
      </Row>
      <Form.Group as={Col} md="8" controlId="validationCustomUsername" onChange={(e) => setUsername(e.target.value)} >
          <Form.Label>Nom d'utilisateur</Form.Label>
          <InputGroup hasValidation>
            <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
            <Form.Control
              type="text"
              placeholder="Username"
              aria-describedby="inputGroupPrepend"
              required
              
            />
            <Form.Control.Feedback type="invalid">
              Entrer nom d'utilisateur valide.
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>
        <Form.Group  as={Col} md="8" controlId="formBasicEmail"   onChange={(e) => setEmail(e.target.value)} >
          <Form.Label className="label">Email</Form.Label>
          <Form.Control
            required
            type="email"
            placeholder="Example@gmail.com"
            
          />
        <Form.Control.Feedback type="invalid">Entrer mail valide.</Form.Control.Feedback>
        {mailerror==="true" ?<p className="error"> email déja existe !</p>:<></>}
        </Form.Group>
        <Form.Group as={Col} md="8" controlId="validationCustom03" onChange={(e) => setTel(e.target.value)} >
          <Form.Label>Telephone</Form.Label>
          <Form.Control type="text" placeholder="Tel" required />
        </Form.Group>
        <Form.Group  as={Col} md="8" controlId="validationCustom04"  onChange={(e) => setAdresse(e.target.value)}>
          <Form.Label className="label">Adresse</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="adresse"
            
          />
        </Form.Group>
        <Form.Group  as={Col} md="8" controlId="formBasicPassword" onChange={(e) => setMdp(e.target.value)} >
          <Form.Label className="label">Mot de pass e</Form.Label>
          <Form.Control
            required
            type="password"
            placeholder="password"
          />
        <Form.Control.Feedback type="invalid">Entrer mot de passe valide.</Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3" onChange={(e) => setType(e.target.value)} >
        <Form.Check
          type="radio"
          name="group1"
          inline
          required
          label="Employé"
          feedback="Choisir type compte"
          feedbackType="invalid"
          value="employe"
        />
        <Form.Check
          type="radio"
          name="group1"
          inline
          required
          label="Employeur"
          feedback="Choisir type compte"
          feedbackType="invalid"
          value="employeur"
          
        />
      </Form.Group>
        <Button type="submit">S'inscrire</Button>
        </Form>
        </div>
      </div>
      </div>
      </div>
      </div>
    );
  }
  