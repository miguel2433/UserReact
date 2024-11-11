import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import './animation.css';

export default function UserCard() {
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch('https://672bdcc01600dda5a9f697c6.mockapi.io/Usuario');
                if (!response.ok) {
                    throw new Error('Failed to fetch users');
                }
                const usersData = await response.json();
                setUsers(usersData);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, []);

    if (users.length === 0) {
        return <div className="h-screen text-white flex justify-center items-center">Loading...</div>;
    }

    return (
        <div className="min-h-screen pb-44 w-full flex justify-center items-center">
            <div className="w-full flex-col flex justify-center items-center rounded-lg">
                <h1 id="titulo-card" className="sticky top-0 left-0 w-full bg-clip-text text-transparent bg-gradient-to-b from-pink-300 to-violet-800 text-3xl font-bold text-center">Lista de Usaurios</h1>
                <div className="text-white grid grid-cols-1 gap-4">
                    {users.map((user) => (
                        <div key={user.id} className="usuario-card rounded-xl mt-4 bg-purple-800 w-full text-xl font-bold p-4 shadow-lg" onClick={() => navigate(`/profile/${user.id}`)}>
                            <p>Name: {user.Nombre}</p>
                            <p>Apellido: {user.Apellido}</p>
                            <p>Email: {user.Email}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}