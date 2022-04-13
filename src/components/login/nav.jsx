import React from "react";
import Nav from "react-bootstrap/Nav"
import { Outlet, Link } from "react-router-dom"
export default function Navbar(){
    return(
        <div>
            <Nav fill variant="tabs" >
            <Nav.Item>
                <Nav.Link href="/">Connexion</Nav.Link>
                
            </Nav.Item>
            <Nav.Item>
                <Nav.Link eventKey="/register" href="/register">Inscription</Nav.Link>
                
            </Nav.Item>
            </Nav>
            <Outlet />
        </div>
    );
}