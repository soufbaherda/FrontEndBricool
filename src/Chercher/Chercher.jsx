import React, {useState} from "react";
import "./chercher.css";
import sch from "./Ressources/Search.png"
import sh from "./Ressources/Sh.png"
import DetailModal from "./DetailModal/DetailModal";
import {styled, TextField} from "@mui/material";
import { useLocation } from "react-router-dom";


function Chercher() {
    const location = useLocation();
    const { from } = location.state;
    const [data, setData] = useState([]);
    const [tres,setTres] = useState("");
    const [nres, setNres] = useState("");
    const [modalShow, setModalShow] = useState(false);
    const [user, setUser] = useState(false);
    const [i,setI]=useState({})
    var today = new Date();
    var mindate = today.getFullYear()+"-"+(today.getMonth()+1)+"-"+today.getDate();

    const SearchTextField = styled(TextField)({
        '& label.Mui-focused': {
            color: '#ff8800',
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: '#ff8800',
        },
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: '#131313',
            },
            '&:hover fieldset': {
                borderColor: '#894E0A',
            },
            '&.Mui-focused fieldset': {
                borderColor: '#ff8800',
            },
        },
    });

 /*   const setPick = (x) =>{
        if(x==="Livraison") return del
        else if(x==="Plombier") return plb
        else if(x==="Chhiwat") return cook
        else if(x==="Eléctricien") return elect
        else if(x==="Nettoyage") return cln
        else return others
    }*/
    const rafraichir = () => {


        var keywords = document.getElementById("searchbar").value;
        console.log(keywords);
        var date = document.getElementById("datepicker").value;
        console.log(date);
        var domaine = document.getElementById("domainlist").value;
        console.log(domaine)
        var region = document.getElementById("regionlist").value;
        console.log(region)
        var ville = document.getElementById("villeinput").value;
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        fetch("http://localhost:8080/offre/get?Titre=" + keywords + "&Domaine=" + domaine + "&Region=" + region + "&Ville=" + ville + "&Date=" + date, requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result.length == 0) {
                    setTres("")
                    setNres("Aucune offre correspond à vos infos")
                } else if (result.length == 1) {
                    setTres("Résultat:")
                    setNres(" 1 offre trouvée")
                } else {
                    setTres("Résultat:")
                    setNres("" +result.length + " offres trouvées")
                }
                setData(result)
            })
            .catch(error => console.log('error', error));
        console.log(data)
    }

    const FindUser =(id) => {
        var requestOptions = {
            method: "GET",
            redirect: "follow",
        };

        fetch("http://localhost:8080/login/" +id, requestOptions)
            .then((response) => response.json())
            .then((res) => {
                setUser(res)
            });
    }
    return (
        <div id="Search">
            <div>
                <img id="iconglb" src={sch} alt="icon"/>
            </div>
            <div id={"searchblock"}>
                <SearchTextField id={"searchbar"} type={"search"} label="Rechercher" variant="outlined" sx={{ width: '100%' }} onKeyPress={(e)=>{
                    if(e.key ==="Enter"){
                        e.preventDefault()
                        rafraichir()}
                }}/>
            </div>
            <div id={"filter"}>
                <div id={"regionblock"}>
                    <label id={"region"}>Région:</label>
                    <select id={"regionlist"}>
                        <option>Toutes</option>
                        <option>Tanger-Tetouan-Al Hoceima</option>
                        <option>Oriental</option>
                        <option>Fès-Meknès</option>
                        <option>Rabat-Salé-Kénitra</option>
                        <option>Béni Mellal-Khénifra</option>
                        <option>Casablanca-Settat</option>
                        <option>Marrakech-Safi</option>
                        <option>Drâa-Tafilalet</option>
                        <option>Souss-Massa</option>
                        <option>Guelmim-Oued Noun</option>
                        <option>Laâyoune-Sakia El Hamra</option>
                        <option>Dakhla-Oued Ed-Dahab</option>
                    </select>
                </div>
                <div id={"villeblock"}>
                    <label id={"ville"}>Ville:</label>
                    <input id={"villeinput"} type={"text"}></input>
                </div>

                <div id={"domainblock"}>
                    <label id={"domain"}>Domaine:</label>
                    <select id={"domainlist"}>
                        <option>Toutes</option>
                        <option>Plombier</option>
                        <option>Chhiwat</option>
                        <option>Démenagement</option>
                        <option>Eléctricien</option>
                        <option>Jardinage</option>
                        <option>Dépannages</option>
                        <option>Mécanicien</option>
                        <option>Livraison</option>
                        <option>Autres</option>
                    </select>
                </div>
                <div id={"dateblock"}>
                    <label id={"date"}>Postée le:</label>
                    <input id={"datepicker"} type={"date"} min={mindate}/>

                </div>
            </div>
            <button id={"search"} onClick={rafraichir}>Rechercher</button>

            <div id={"results"}>
                <label id={"infores"}>{nres}</label>
                <div id ={"offres"}>
                    {data.map((item) => {
                        return (
                            <div id={"offer"} key = {item.id} >
                                <div id="iconcont">
                                    <img id={"icon"} src={sh}/></div>
                                <div id={"Titre"}>
                                    <label id={"title"}>{item["titre"]}</label>
                                </div>
                                <div>
                                    <label id={"place"}>{item["ville"]}</label>
                                </div>
                                <label id={"details"} onClick={()=>{setModalShow(true);setI(item);FindUser(item.utilisateur.id)}}>Voir plus</label >
                                <DetailModal item = {i} idUser ={from}user = {user} show={modalShow} onHide={() => setModalShow(false)} />

                            </div>
                        );
                    })}
                </div>

            </div>

        </div>
    );

}

export default Chercher;
