import React from "react";
import Modal from "react-bootstrap/Modal"
import RegisterTry from "./RegisterTry";
export default function RegisterModal(props) {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Inscription
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <RegisterTry/>
        </Modal.Body>
      </Modal>
    );
  }