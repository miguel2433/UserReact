import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import "./animation.css";

export default function UserForm() {
    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");
    const [email, setEmail] = useState("");
    const [userId, setUserId] = useState(null);
    const [token, setToken] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const userData = {
            Email: email,
            Nombre: nombre,
            Apellido: apellido,
        };

        try {
            const response = await fetch('https://672bdcc01600dda5a9f697c6.mockapi.io/Usuario', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Usuario registrado:', data);
                setUserId(data.id);
                setToken(data.token);
                navigate('/UserCard', { state: { userId: data.id, token: data.token } });
            } else {
                console.error('Error al registrar el usuario:', response.statusText);
            }
        } catch (error) {
            console.error('Error en la solicitud:', error);
        }
    };

    return (
        <main className="h-90vh text-white w-full flex-col flex justify-start items-center">
            <section className="hover:shadow-xl hover:shadow-violet-800 transition-all duration-300 mt-8 h-4/5 w-2/6 backdrop-blur-xl bg-black/20 rounded-xl flex flex-col justify-start items-center">
                <h1 className="mt-16 font-bold text-3xl">Complete El Formulario</h1>
                <form method="POST" onSubmit={handleSubmit} className="w-full mt-8 flex flex-col justify-center items-center">
                    <label className="mt-4 text-xl font-bold">Nombre</label>
                    <input required value={nombre} onChange={(e) => setNombre(e.target.value)} className="h-10 mt-2 outline-none bg-transparent border-b-2 border-white w-3/4" type="text" />
                    
                    <label className="mt-4 text-xl font-bold">Apellido</label>
                    <input required value={apellido} onChange={(e) => setApellido(e.target.value)} className="mt-2 outline-none bg-transparent border-b-2 border-white w-3/4" type="text" />
                    
                    <label className="mt-4 text-xl font-bold">Email</label>
                    <input required value={email} onChange={(e) => setEmail(e.target.value)} className="mt-2 outline-none bg-transparent border-b-2 border-white w-3/4" type="email" />
                    
                    <button className="mt-8 bg-purple-600 hover:bg-purple-800 transition-all duration-300 text-white text-xl font-bold rounded-xl px-4 py-2" type="submit">Registrarse</button>
                </form>
            </section>
        </main>
    );
}
