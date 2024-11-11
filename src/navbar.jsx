import React from "react";
import "./animation.css";
import { Link } from "react-router-dom";

export default function Navbar() {
    return (
        <header className="h-10vh w-full flex justify-center items-center">
            <nav className="flex rounded-xl text-white h-1/2 font-bold w-3/6 justify-around items-center">
                <div className="flex flex-col items-start justify-center hover:scale-105 transition-all duration-300">
                    <Link className="link mr-2" to="/">Inicio</Link>
                    <span className="linea border-white border-2 bg-white"></span>
                </div>
                <div className="hover:scale-105 transition-all duration-300 flex flex-col items-start justify-center">
                    <Link className="link mr-2" to="/UserCard">Usuarios</Link>
                    <span className="linea border-white border-2 bg-white"></span>
                </div>
                <div className="flex flex-col items-start justify-center hover:scale-105 transition-all duration-300">
                    <Link className="link mr-2" to="/UserForm">Formulario</Link>
                    <span className="linea border-white border-2 bg-white"></span>
                </div>
            </nav>
        </header>
    );
}