import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Register from "./components/login/Register";
import Login from "./components/login/Login";
import Navbar from "./components/login/nav";
import Profil from "./components/login/Profil";
import RegisterModal from "./components/login/RegisterModal";
import "./App.scss";
import Mainbar from './components/login/Mainbar';
import Home from './components/login/Home';
export function App(){
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Mainbar />}>
          <Route index element={<Home/>} />
          <Route path="Profil" element={<Profil />} />
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

