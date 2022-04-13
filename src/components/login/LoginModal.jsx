import React from "react";
import Modal from "react-bootstrap/Modal"
import LoginTry from "./LoginTry";
export default function LoginModal(props) {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Connexion
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <LoginTry  updateconnection={props.updateconnection}/>
        </Modal.Body>
      </Modal>
    );
  }