import React from "react";
import "./profil.css"
import { useEffect } from "react";
import { useState } from "react";
import { useRef } from "react";
import Avatar from '@mui/material/Avatar';
import { useLocation } from 'react-router-dom'
import Nav from "react-bootstrap/Nav"

export default function Profil(){
    const[compte,setCompte]=useState({});
    const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [tel, setTel] = useState("");
  const [adresse, setAdresse] = useState("");
  const [mdp, setMdp] = useState("");
  const [cmdp, setCmdp] = useState("");
  const[mdperror,setMdperror]=useState(false);
  const[mdpsucc,setMdpsucc]=useState(false);
  const [type, setType] = useState("");
  const count = useRef(0);
  const [securite,setSecurite]=useState(false);
  const location = useLocation();
  const { from } = location.state;
  function stringToColor(string) {
    let hash = 0;
    let i;
  
    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }
  
    let color = '#';
  
    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */
  
    return color;
  }
  
  function stringAvatar(name) {
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
    };
  }
 
  const update=()=>{
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    fetch("http://localhost:8080/login/"+from, requestOptions)
    .then(response => response.json())
    .then(data =>{setCompte(data);setNom(data.nom);setPrenom(data.prenom);setUsername(data.username);setAdresse(data.adresse);setEmail(data.email);setTel(data.tel)})
    
  }
 

    
    useEffect(() => {
        if(count.current===0){
            update();
            count.current = count.current + 1;
        }
        
        
      });
      const save = () => {
        var account = JSON.stringify({
            "id":from,
            "nom": nom,
            "prenom": prenom,
            "username":username,
            "email":email,
            "tel":tel,
            "adresse":adresse,
            "mdp":compte.mdp
          
      });
      var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: account,
          redirect: 'follow'
      };
    
      fetch("http://localhost:8080/register", requestOptions)
      .then(update)
      }
      const changemdp=()=>{
          if(mdp!==compte.mdp){
              setMdperror(true);
          }
          else{
            var account = JSON.stringify({
                "id":from,
                "nom": compte.nom,
                "prenom": compte.prenom,
                "username":compte.username,
                "email":compte.email,
                "tel":compte.tel,
                "adresse":compte.adresse,
                "mdp":cmdp
              
          });
          var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            var requestOptions = {
              method: 'POST',
              headers: myHeaders,
              body: account,
              redirect: 'follow'
          };
        
          fetch("http://localhost:8080/register", requestOptions)
          setMdperror(false);setMdp("");setCmdp("");setMdpsucc(true);
          }
      }
      
    return(
        <div className="container rounded bg-white mt-5 mb-5">
            <Nav
            variant="pills"
            defaultActiveKey="home"
            onSelect={(selectedKey) => setSecurite(selectedKey)}
            >
            <Nav.Item>
                <Nav.Link eventKey="home">Informations personnelles</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link eventKey="securite">Sécurité</Nav.Link>
            </Nav.Item>
            </Nav>
            {securite==="securite"
          ? 
          <>
          <div className="col-md-6"><label className="labels">Mot de passe actuel</label><input type="password" onChange={(e) => setMdp(e.target.value)} value ={mdp} className="form-control" ></input></div>
         <div className="row mt-2">
         <div className="col-md-6"><label className="labels">nouveau mot de passe</label><input type="password" onChange={(e) => setCmdp(e.target.value)} value ={cmdp} className="form-control" ></input></div>
         {mdperror===true ?<p className="error">mot de passe  incorrect !</p>:<></>}
         {mdpsucc===true ?<p className="success">mot de passe a été changé!</p>:<></>}
        </div><div className="mt-5 text-center"><button className="btn btn-primary profile-button" type="button" onClick={changemdp} >Sauvegarder</button></div>
        </>

          
          : 
        
    <div className="row">
        <div className="col-md-3 border-right">
            <div className="d-flex flex-column align-items-center text-center p-3 py-5"><Avatar {...stringAvatar(compte.nom+ " "+compte.prenom)} sx={{ width: 56, height: 56 }}/>  <span className="font-weight-bold">{compte.username}</span><span className="text-black-50">{compte.email}</span><span></span></div>
        </div>
        <div className="col-md-5 border-right">
            <div className="p-3 py-5">
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h4 className="text-right">Profile</h4>
                </div>
                <div className="col-md-6"><label className="labels">Username</label><input type="text" onChange={(e) => setUsername(e.target.value)} value ={username} className="form-control" ></input></div>
                <div className="row mt-2">
                    <div className="col-md-6"><label className="labels">Nom</label><input type="text" onChange={(e) => setNom(e.target.value)} value ={nom} className="form-control" ></input></div>
                    <div className="col-md-6"><label className="labels">Prenom</label><input type="text" className="form-control"  onChange={(e) => setPrenom(e.target.value)} value ={prenom}></input></div>
                </div>
                <div className="row mt-3">
                    <div className="col-md-12"><label className="labels">Email</label><input type="text" className="form-control" onChange={(e) => setEmail(e.target.value)} value ={email} ></input></div>
                    <div className="col-md-12"><label className="labels">Tel</label><input type="text" className="form-control" onChange={(e) => setTel(e.target.value)} value ={tel}></input></div>
                    <div className="col-md-12"><label className="labels">Address</label><input type="text" className="form-control" onChange={(e) => setAdresse(e.target.value)} value ={adresse}></input></div>
                    
                </div>
                <div className="mt-5 text-center"><button className="btn btn-primary profile-button" type="button" onClick={save} >Sauvegarder</button></div>
            </div>
        </div>
    </div>
}
</div>

    )
}