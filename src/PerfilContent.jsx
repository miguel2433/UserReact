import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function UserProfile() {
    const { userId } = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');

    useEffect(() => {
        const fetchUser = async () => {
            const response = await fetch(`https://672bdcc01600dda5a9f697c6.mockapi.io/Usuario/${userId}`);
            const userData = await response.json();
            setUser(userData);
            setName(userData.Nombre);
            setLastName(userData.Apellido);
        };

        fetchUser();
    }, [userId]);

    const handleUpdate = async () => {
        const response = await fetch(`https://672bdcc01600dda5a9f697c6.mockapi.io/Usuario/${userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ Nombre: name, Apellido: lastName }),
        });
        if (response.ok) {
            const updatedUser = await response.json();
            setUser(updatedUser);
            setEditMode(false);
        }
    };

    const handleDelete = async () => {
        const response = await fetch(`https://672bdcc01600dda5a9f697c6.mockapi.io/Usuario/${userId}`, {
            method: 'DELETE',
        });
        if (response.ok) {
            navigate('/UserCard');
        }
    };

    if (!user) {
        return <div className='h-90vh text-white text-2xl flex flex-col items-center justify-center'>Loading...</div>;
    }

    return (
        <div className='h-90vh text-white text-2xl flex flex-col items-center justify-center'>
            {editMode ? (
                <>
                    <div className='flex mb-4 rounded-xl bg-purple-800 items-center justify-center'>
                        <p>Nombre:</p>  
                        <input className='outline-none bg-purple-800 rounded-md p-2' value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className='flex bg-purple-800 mb-4 rounded-xl items-center justify-center'>
                        <p>Apellido:</p>
                        <input className='bg-purple-800 rounded-md p-2 outline-none' value={lastName} onChange={(e) => setLastName(e.target.value)} />
                    </div>
                    <div className='flex gap-4'>
                        <button className='hover:bg-violet-500 hover:text-white hover:scale-105 transition-all duration-300 bg-white text-black text-xl font-bold rounded-md p-2' onClick={handleUpdate}>Guardar Cambios</button>
                        <button className='hover:bg-violet-500 hover:text-white hover:scale-105 transition-all duration-300 bg-white text-black text-xl font-bold rounded-md p-2' onClick={() => setEditMode(false)}>Cancelar</button>
                    </div>
                </>
            ) : (
                <>
                    <div className='hover:scale-105 transition-all duration-300 hover:shadow-xl hover:shadow-violet-500 rounded-xl bg-white/5 w-2/6 h-2/4 flex flex-col items-center justify-center'>
                        <div className='w-96 flex bg-purple-800 mb-4 rounded-xl'>
                            <p>Nombre:</p>  
                            <p className='ml-2'>{user.Nombre}</p>
                        </div>
                        <div className='w-96 flex bg-purple-800 mb-4 rounded-xl'>
                            <p>Apellido:</p>
                            <p className='ml-2'>{user.Apellido}</p>
                        </div>
                        <p className='bg-purple-800 mb-4 w-96 rounded-xl'>Email: {user.Email}</p>
                        <div className='flex gap-4'> 
                            <button className='hover:bg-violet-500 hover:text-white hover:scale-105 transition-all duration-300 bg-white text-black text-xl font-bold rounded-md p-2' onClick={() => setEditMode(true)}>Editar</button>
                            <button className='hover:bg-violet-500 hover:text-white hover:scale-105 transition-all duration-300 bg-white text-black text-xl font-bold rounded-md p-2' onClick={handleDelete}>Eliminar</button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
