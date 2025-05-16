'use client'
import React, { useState } from 'react';
import { NavLink } from "react-router";
import { useDispatch } from 'react-redux';
import { createUser } from '../../features/usuarios/usuarioSlice';

const RegisterView = () => {
    const dispatch = useDispatch();
    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (password !== repeatPassword) {
            setError('Las contraseñas no coinciden');
            return;
        }

        const userData = {
            nombre,
            email,
            password,
        };

        try {
            await dispatch(createUser(userData)).unwrap();
            window.location.href = '/';
        } catch (err) {
            if (err.error) {
                setError(err.error);
            } else if (err.message) {
                setError(err.message);
            } else {
                setError('Ocurrió un error durante el registro');
            }
            console.error("Error al registrar usuario:", err);
        }
    };

    return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-5 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm border-2 border-emerald-300 rounded-lg p-6">
                <h2 className="mt-2 mb-2 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
                    Registrate
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="nombre" className="block text-sm/6 font-medium text-gray-900">
                            Nombre
                        </label>
                        <div className="mt-2">
                            <input
                                id="nombre"
                                name="nombre"
                                type="text"
                                value={nombre}
                                onChange={(e) => setNombre(e.target.value)}
                                required
                                autoComplete="nombre"
                                className="block w-full rounded-md bg-gray-300 px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                            Email
                        </label>
                        <div className="mt-2">
                            <input
                                id="email"
                                name="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                autoComplete="email"
                                className="block w-full rounded-md bg-gray-300 px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                            />
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
                                Password
                            </label>
                        </div>
                        <div className="mt-2">
                            <input
                                id="password"
                                name="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                autoComplete="current-password"
                                className="block w-full rounded-md bg-gray-300 px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                            />
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="repeatPassword" className="block text-sm/6 font-medium text-gray-900">
                                Repite Password
                            </label>
                        </div>
                        <div className="mt-2">
                            <input
                                id="repeatPassword"
                                name="repeatPassword"
                                type="password"
                                value={repeatPassword}
                                onChange={(e) => setRepeatPassword(e.target.value)}
                                required
                                autoComplete="current-password"
                                className="block w-full rounded-md bg-gray-300 px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                            />
                        </div>
                    </div>
                    {error && <p className="text-red-500 text-sm">{error}</p>}

                    <div>
                        <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-emerald-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-emerald-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
                        >
                            Registrarme
                        </button>
                    </div>
                </form>

                <p className="mt-10 text-center text-sm/6 text-gray-500">
                    ¿Ya tienes una cuenta?{' '}
                    <NavLink
                        to="/"
                        className="font-semibold text-emerald-600 hover:text-emerald-500">
                        Inicia sesión
                    </NavLink>
                </p>
            </div>
        </div>
    );
};

export default RegisterView;
