import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import delivery from "./login/images/delivery.jpg"
import { Button, CardActionArea, CardActions, Grid } from '@mui/material';
import { useLocation } from "react-router-dom";
import Modal from "react-bootstrap/Modal";

export default function ListeTravaux() {
  const [Offres, setOffres] = useState([]);
  const location = useLocation();
  const { from } = location.state;
  var id = from;
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };
  const Cloturer = (IdOffre) => {
    fetch(`http://localhost:8080/offre/CloturerOffre/${IdOffre}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: 'React Hooks PUT Request Example' }),
    })
      .then((res) => console.log(res))
      .catch((error) => console.log(error))
  }

  const rafraichir = () => {
    fetch(`http://localhost:8080/offre/GetEmployee/${id}`)
      .then(res => res.json())
      .then((result) => {
        setOffres(result);
      }
      )
  }

  useEffect(() => {
    rafraichir()
  })


  return (
    <div id={"results"}>
      <label style={{
        fontfamily: "Candara",
        width: "20%",
        height: "20%",
        textalign: "left",
        padding: "1%"
      }}>
        {Offres.length} postulation(s)
      </label>
      
      <Grid style={{
        margin: "1%",
        display: "flex",
        background: "rgba(222, 222, 222, 0.75)",
        borderRadius: "10px"
      }} container spacing={2} >
        {Offres.map((Offre) => {
          return (
            <Grid item xs={3} style={{ marginBottom: "1%" }}>
              <Card sx={{ maxWidth: 250, minHeight: 400, maxHeight: 600 }}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="30%"
                    width="30%"
                    image={delivery}
                    alt="green iguana"
                  />
                  <CardContent sx={{ height: 200 }}>
                    <Typography gutterBottom variant="h5" component="div">
                      {Offre.titre}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {Offre.description}
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  {(Offre.status == "En_cours") ? <Button size="small" color="primary" onClick={() => { handleOpen() }}>
                    Terminer
                  </Button>
                    : <Button size="small" color="primary" disabled>
                      Cloturer
                    </Button>}
                </CardActions>
                <Modal show={open} onHide={() => setOpen(false)} key={Offre.id}>
                  <Modal.Header closeButton>
                    <Modal.Title> Fin de service</Modal.Title>
                  </Modal.Header>
                  <Modal.Body >
                    <p style={{ textAlign: "center" }}> Voulez vous mettre fin au service ?</p>
                  </Modal.Body>
                  <Modal.Footer  >
                    <div stule={{ display: " inline-block" }}>
                      <Button style={{ textAlign: "center", marginTop: "10%", left: "10%" }} type="button"
                        class="btn btn-success"
                        onClick={() => {
                          console.log(Offre.id);
                          Cloturer(Offre.id);
                          handleClose();
                        }}>
                        Confirmer
                      </Button>
                      <Button style={{ textAlign: "center", marginTop: "10%", left: "20%", }} onClick={() => {
                        handleClose();
                      }}
                        type="button" class="btn btn-danger">Annuler</Button>
                    </div>
                  </Modal.Footer>
                </Modal>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
}
