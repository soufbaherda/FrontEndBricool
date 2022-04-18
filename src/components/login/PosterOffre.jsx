import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import img from "./images/Form-Builder-min.png";
import Form from "react-bootstrap/Form";
import DatePicker from "react-datepicker";
import moment from "moment";
import "./App.css";
import "react-datepicker/dist/react-datepicker.css";
import Button from "react-bootstrap/Button";
import Carousel from "react-bootstrap/Carousel";
import Card from "react-bootstrap/Card";
import clean from "./images/clean.png";
import cooking from "./images/cooking.png";
import delivery from "./images/delivery.jpg";
import electrician from "./images/electrician.jpg";
import plumber from "./images/plumbier.png";

function PosterOffre(props) {
  const [titre, setTitre] = useState([]);
  const [description, setDescription] = useState([]);
  const [nom, setNom] = useState([]);
  const [prenom, setPrenom] = useState([]);
  const [telephone, setTelephone] = useState([]);
  const [email, setEmail] = useState([]);
  const [date_service, setDate_service] = useState(new Date());
  const [ville, setVille] = useState([]);
  const [region, setRegion] = useState([]);
  const [validated, setValidated] = useState(false);

  const [field, setDomaines] = useState([]);
  const [colorclean, setColorclean] = useState("primary");
  const [colorCooking, setColorCooking] = useState("primary");
  const [colorLivraison, setColorLivraison] = useState("primary");
  const [colorElectricite, setColorElectricite] = useState("primary");
  const [colorPlomberie, setColorPlomberie] = useState("primary");

  const [selectedImages, setSelectedImages] = useState([]);

  const ImageHandleChange = (e) => {
    if (e.target.files) {
      const fileArray = Array.from(e.target.files).map((file) =>
        URL.createObjectURL(file)
      );
      console.log(fileArray);
      setSelectedImages((prevImages) => prevImages.concat(fileArray));
      Array.from(e.target.files).map((file) => URL.revokeObjectURL(file));
    }
  };

  const renderPhotos = (source) => {
    return source.map((photo) => {
      return (
        <div key = {photo} className="div-selected-img">
          <img
            className="selectedImage"
            src={photo}
            alt="selectedImg"
            key={photo}
          />
        </div>
      );
    });
  };

  var date_publication = Date();

  function formatDate(date) {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("/");
  }

  const sendOffre = () => {
    fetch("http://localhost:8080/offre/post", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        titre: titre,
        description: description,
        status: "active",
        domaine: field,
        dateP: formatDate(date_publication),
        dateS: formatDate(date_service),
        ville: ville,
        region: region,
        utilisateur: {
          nom: nom,
          prenom: prenom,
          email: email,
          telephone: telephone,
        },
        images: selectedImages,
      }),
    })
      .then((res) => console.log(res))
      .catch((error) => console.log(error))
      .then(console.log(field));
    console.log(nom);
  };
  /*
  const sendEmployer = () => {
    fetch("http://localhost:8080/mouloffre", {
      method: "POST",
      headers: {
       "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "nom": nom,
        "prenom": prenom,
        "telephone": telephone,
        "email": email,
      }),
    })
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
  };*/

  const handleChange1 = (event) => {
    setTitre(event.target.value);
  };

  const handleChange2 = (event) => {
    setDescription(event.target.value);
  };

  const handleChange5 = (event) => {
    setNom(event.target.value);
  };

  const handleChange6 = (event) => {
    setPrenom(event.target.value);
  };

  const handleChange7 = (event) => {
    setTelephone(event.target.value);
  };

  const handleChange8 = (event) => {
    setEmail(event.target.value);
  };

  const handleChange9 = (event) => {
    setVille(event.target.value);
  };

  const handleChange10 = (event) => {
    setRegion(event.target.value);
  };

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    event.preventDefault();
    setValidated(true);
    sendOffre();
  };

  return (
    <div className="Post">
      <section id="titre">
        <Container className="title-container">
          <Row className="title-row">
            <Col className="phrase">
              <h2>Poster votre offre en Remplissant le formumaire</h2>
            </Col>
            <Col className="picture">
              <img src={img} alt="small-jobs" />
            </Col>
          </Row>
        </Container>
      </section>

      <section id="forms">
        <Container className="formaulaire-container">
          <br />
          <Row>
            <Col className="info-text">
              <Form noValidate validated={validated}>
                <Form.Group controlId="validationCustom01">
                  <Form.Control
                    className="info"
                    size="xs"
                    type="text"
                    placeholder="Prénom"
                    onChange={handleChange6}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    veuillez entrer votre prénom.
                  </Form.Control.Feedback>
                </Form.Group>
                <br />
                <Form.Group controlId="validationCustom02">
                  <Form.Control
                    className="info"
                    size="xs"
                    type="text"
                    placeholder="Nom"
                    onChange={handleChange5}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    veuillez entrer votre nom.
                  </Form.Control.Feedback>
                </Form.Group>
                <br />
                <Form.Group controlId="validationCustom03">
                  <Form.Control
                    size="xs"
                    type="text"
                    placeholder="adresse email"
                    className="info"
                    onChange={handleChange8}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    veuillez donner une adresse mail.
                  </Form.Control.Feedback>
                </Form.Group>
                <br />
                <Form.Group controlId="validationCustom04">
                  <Form.Control
                    size="xs"
                    type="text"
                    placeholder="numéro de téléphone"
                    className="info"
                    onChange={handleChange7}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    veuillez entrer votre numéro de telephone.
                  </Form.Control.Feedback>
                </Form.Group>
                <br />
                <Form.Group controlId="validationCustom05">
                  <Form.Control
                    size="xs"
                    type="text"
                    placeholder="titre du Bricool"
                    className="info"
                    onChange={handleChange1}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    veuillez donner un titre du bricool.
                  </Form.Control.Feedback>
                </Form.Group>
                <br />
                <Form.Group controlId="validationCustom06">
                  <Form.Control
                    className="info"
                    as="textarea"
                    placeholder="Descriptionn du briCool"
                    rows={3}
                    onChange={handleChange2}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    veuillez donnez une description du bricool.
                  </Form.Control.Feedback>
                </Form.Group>
                <br />
                <Form.Group controlId="validationCustom7">
                  <DatePicker
                    selected={date_service}
                    onChange={(date) => setDate_service(date)}
                    minDate={moment().toDate()}
                    required
                  />
                </Form.Group>
                <br />
                <Form.Select
                  aria-label="Default select example"
                  onChange={handleChange9}
                  required
                >
                  <option>ville...</option>
                  <option>Agadir</option>
                  <option>Alhoceima</option>
                  <option>Beni mellal</option>
                  <option>Berkane</option>
                  <option>Casablanca</option>
                  <option>Dakhla</option>
                  <option>Essaouira</option>
                  <option>Errachidia</option>
                  <option>Fes</option>
                  <option>Guercif</option>
                  <option>Kenitra</option>
                  <option>Khouribga</option>
                  <option>Laayoune</option>
                  <option>Marrakech</option>
                  <option>Nador</option>
                  <option>Oujda</option>
                  <option>Rabat</option>
                  <option>Sale</option>
                  <option>Tanger</option>
                  <option>Tetouan</option>
                </Form.Select>
                <br />
                <Form.Select
                  aria-label="Default select example"
                  onChange={handleChange10}
                  required
                >
                  <option>Regions...</option>
                  <option>Casablanca-settat</option>
                  <option>Rabat-Sale-Kenitra</option>
                  <option>Tanger-Tetouan-Alhoceima</option>
                  <option>Oriental</option>
                  <option>Daraa-Tafilalet</option>
                  <option>Marrakech-safi</option>
                  <option>Fes-Meknes</option>
                  <option>Beni Mellal-Khenifra</option>
                  <option>Sousse-Massa</option>
                  <option>Guelmim-Oued Noun</option>
                  <option>Laayoun-Sakia El Hamra</option>
                  <option>Dakhla-Oued Dahab</option>
                </Form.Select>
                <br />
                <Form.Group controlId="formFileMultiple" className="mb-3">
                  <Form.Control
                    type="file"
                    multiple
                    onChange={ImageHandleChange}
                  />
                  <br />
                  <div className="result">{renderPhotos(selectedImages)}</div>
                </Form.Group>
              </Form>
            </Col>
            <Col className="col-caroussel">
              <Carousel className="domaine-caroussel" indicators={false}>
                <Carousel.Item>
                  <Card className="Domaine-card">
                    <Card.Img
                      className="Domaine-img"
                      variant="top"
                      src={clean}
                    />
                    <Card.Body>
                      <Card.Title>nettoyer</Card.Title>
                      <Card.Text>desc_nettoyage</Card.Text>
                      <Button
                        variant={colorclean}
                        onClick={(event) => {
                          event.preventDefault();
                          setDomaines("Nettoyage");
                          setColorclean("success");
                        }}
                      >
                        Sélectionner
                      </Button>
                    </Card.Body>
                  </Card>
                </Carousel.Item>
                <Carousel.Item className="Carousel-item">
                  <Card className="Domaine-card">
                    <Card.Img
                      className="Domaine-img"
                      variant="top"
                      src={cooking}
                    />
                    <Card.Body>
                      <Card.Title>cuisiner</Card.Title>
                      <Card.Text>desc_cuisiner</Card.Text>
                      <Button
                        variant={colorCooking}
                        onClick={(event) => {
                          event.preventDefault();
                          setDomaines("cuisine");
                          setColorCooking("success");
                        }}
                      >
                        Sélectionner
                      </Button>
                    </Card.Body>
                  </Card>
                </Carousel.Item>
                <Carousel.Item className="Carousel-item">
                  <Card className="Domaine-card">
                    <Card.Img
                      className="Domaine-img"
                      variant="top"
                      src={delivery}
                    />
                    <Card.Body>
                      <Card.Title>livraison</Card.Title>
                      <Card.Text>desc_livraison</Card.Text>
                      <Button
                        variant={colorLivraison}
                        onClick={(event) => {
                          event.preventDefault();
                          setDomaines("livraison");
                          setColorLivraison("success");
                        }}
                      >
                        Sélectionner
                      </Button>
                    </Card.Body>
                  </Card>
                </Carousel.Item>
                <Carousel.Item className="Carousel-item">
                  <Card className="Domaine-card">
                    <Card.Img
                      className="Domaine-img"
                      variant="top"
                      src={electrician}
                    />
                    <Card.Body>
                      <Card.Title>éléctricité</Card.Title>
                      <Card.Text>desc_éléctricité</Card.Text>
                      <Button
                        variant={colorElectricite}
                        onClick={(event) => {
                          event.preventDefault();
                          setDomaines("electricité");
                          setColorElectricite("success");
                        }}
                      >
                        Sélectionner
                      </Button>
                    </Card.Body>
                  </Card>
                </Carousel.Item>
                <Carousel.Item className="Carousel-item">
                  <Card className="Domaine-card">
                    <Card.Img
                      className="Domaine-img"
                      variant="top"
                      src={plumber}
                    />
                    <Card.Body>
                      <Card.Title>plomberie</Card.Title>
                      <Card.Text>desc_plomberie</Card.Text>
                      <Button
                        variant={colorPlomberie}
                        onClick={(event) => {
                          event.preventDefault();
                          setDomaines("plomberie");
                          setColorPlomberie("success");
                        }}
                      >
                        Sélectionner
                      </Button>
                    </Card.Body>
                  </Card>
                </Carousel.Item>
              </Carousel>
            </Col>
          </Row>
        </Container>
        <br />
        <br />
        <br />
        <Container className="confirmation-container">
          <Row>
            <Col>
              <Button
                className="Confirm-btn"
                variant="dark"
                onClick={handleSubmit}
              >
                poster
              </Button>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
}

export default PosterOffre;
