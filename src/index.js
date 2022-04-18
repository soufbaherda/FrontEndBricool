import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import ProfilSet from "./components/login/ProfilSet";
import Mainbar from './components/login/Mainbar';
import Home from './components/login/Home';
import PosterOffre from './components/login/PosterOffre';
import Profil from './components/login/profil';
import ListeOffere from './components/login/ListeOffre';
import Chercher from './Chercher/Chercher';
export function App(){
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Mainbar />}>
          <Route index element={<Home/>} />
          <Route path="ProfilSet" element={<ProfilSet />} />
          <Route path="Chercher" element={<Chercher/>} />
          <Route path="Profil" element={<Profil />} />
          <Route path="Mesoffres" element={<ListeOffere />} />
          <Route path="Poster" element={<PosterOffre/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
};
ReactDOM.render(
  <>
  <App/>
  </>
   ,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

