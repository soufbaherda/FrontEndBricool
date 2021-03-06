import React, { useEffect, useState } from "react";
import "./Profil.css"
import Button from '@mui/material/Button';
import {  Link } from "react-router-dom";

import { useLocation } from "react-router-dom";
import Rating from "./Rating";



export default function Profil() {
    const [employee, setEmployee] = useState(null);
    const location = useLocation();
    const { from } = location.state;

    useEffect(() => {
        (async function () {
            const res = await fetch("http://localhost:8080/GetCompte/"+from);
            setEmployee(await res.json())
        })()
    }, [])

    return (
        <div className="back" >
            {employee && <div className="back-profil">
                <figure className="circle"><h2 className="user">{employee.nom[0].toUpperCase()}{employee.prenom[0].toUpperCase()}</h2></figure>
                <div key={employee.id}>
                    <label style={{ fontWeight: "bold", marginTop: "5%", fontSize: "24px" }} id={"employee"} >{employee.nom} {employee.prenom}</label>
                    <label id={"employee"}>{employee.username}</label>
                    <br />
                    <br />
                    <br />
                    <label id={"employee"}><label style={{ fontWeight: "bold", display: "flex" }} >Email : </label>{employee.email}</label>
                    <label id={"employee"}><label style={{ fontWeight: "bold", display: "flex" }} >Tel : </label> {employee.tel}</label>
                    <label id={"employee"}><label style={{ fontWeight: "bold", display: "flex" }} >Adresse : </label> {employee.adresse}</label>
                    <Rating idemploye = {employee.id}/>
                    <Button
                component={Link} to={'/ProfilSet'} state={{ from: from}}
                sx={{ my: 2, color: 'blue', display: 'block' }}
              >
                Modifier
              </Button>
                    
                </div>
            </div>}
        </div>
    );
    }