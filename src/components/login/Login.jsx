import React from "react";
import loginImg from "../../login.jpg";
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import { useState } from "react";
import Col from "react-bootstrap/Col"
import Profil from "./Profil";
import Navbar from "./nav";
import "./style.scss";

export default function Login () {
  const [validated, setValidated] = useState(false);
  const [email, setEmail] = useState("");
  const [id,setid] = useState("");
  const [mdp, setMdp] = useState("");
  const[connexion,setConnexion]=useState({});
  const[compte,setCompte]=useState({});
  const[mess,setMess]=useState("false");
  const handleSubmit = (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    
    
    var compte = JSON.stringify({
      "email":email,
      "mdp":mdp,
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
.then(data => {setid(data.id);connect(data)})

;

  };
  const connect=(d)=>{
    setConnexion(d);
    if(d.status==="true"){
      setid(d.id);
    
    }
    else{
      setMess("true");
    }
  }
    return (
      <>
      {connexion.status==="true"
          ? 
          <div><Profil id={id}/></div>
          
          : 
      <div className="App" >
    <div className="login">
    <div className="container" >
      <div className="base-container" >
          <div className="content">
            <Navbar/>
            <div className="header">Connexion</div>
          <div className="image">
            <img src={loginImg} alt="logo"/>
          </div>
          <Form  className="form" noValidate validated={validated} onSubmit={handleSubmit} >
          <Form.Group  as={Col} md="8" controlId="formBasicEmail" onChange={(e) => setEmail(e.target.value)} >
          <Form.Label className="label">Email</Form.Label>
          <Form.Control
            required
            type="email"
            placeholder="Example@gmail.com"
            
          />
        <Form.Control.Feedback type="invalid">Entrer mail valide.</Form.Control.Feedback>
        </Form.Group>
        <Form.Group  as={Col} md="8" controlId="formBasicPassword" onChange={(e) => setMdp(e.target.value)} >
          <Form.Label className="label">Mot de passe</Form.Label>
          <Form.Control
            required
            type="password"
            placeholder="password"
            
          />
        <Form.Control.Feedback type="invalid">Entrer mot de passe valide.</Form.Control.Feedback>
        </Form.Group>
        <div><p></p></div>
        <Button type="submit">Se connecter</Button>
        </Form>
        {mess==="true" ?<p className="error">mot de passe ou email incorrect !</p>:<></>}
        </div>
          
      
      </div>
      </div>
      </div>
      </div>}
      </>
    );
  }
