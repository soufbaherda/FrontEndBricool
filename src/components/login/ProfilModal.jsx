import React, {useEffect, useState} from "react";
import Modal from "react-bootstrap/Modal"
export default function ProfilModal(props) {
    const [employee,setEmployee] = useState();
    console.log(props.id)
    useEffect(() => {
      (async function () {
          const res = await fetch("http://localhost:8080/GetCompte/"+props.id);
          setEmployee(await res.json())
      })()
  }, [])

    return (
      <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Profil
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
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
                </div>
            </div>}
        </div>
        </Modal.Body>
      </Modal>
    );
  }