import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from "react-router";
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { Field, Label, Switch } from '@headlessui/react';
import { addTask } from '../../features/tareas/tareaSlice';

const RegisterTask = () => {
    const [formData, setFormData] = useState({
        titulo: '',
        descripcion: '',
        fecha_limite: '',
        estado: 'pendiente'
    });

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error } = useSelector((state) => state.tasks); // Cambia 'tareas' a 'tasks'
    const handleClick = () => {
        navigate('/tareas');
    };
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const resultAction = await dispatch(addTask(formData));

            if (addTask.fulfilled.match(resultAction)) {
                navigate('/tareas');
            }
        } catch (err) {
            console.error("Error al crear tarea:", err);
        }
    };

    return (
        <div className="isolate bg-gray-100 px-6 py-5 sm:py-6 lg:px-8">
            <div
                aria-hidden="true"
                className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]"
            >
            </div>

            <div className="mx-auto max-w-2xl text-center">
                <h2 className="text-4xl font-semibold tracking-tight text-balance text-gray-900 sm:text-5xl">
                    Crear Nueva Tarea
                </h2>
            </div>

            <form onSubmit={handleSubmit} className="mx-auto mt-8 max-w-xl sm:mt-10">
                <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                    {/* Campo Título */}
                    <div className="sm:col-span-2">
                        <label htmlFor="titulo" className="block text-sm/6 font-semibold text-gray-900">
                            Título
                        </label>
                        <div className="mt-2.5">
                            <input
                                id="titulo"
                                name="titulo"
                                type="text"
                                value={formData.titulo}
                                onChange={handleChange}
                                required
                                className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
                            />
                        </div>
                    </div>

                    <div className="sm:col-span-2">
                        <label htmlFor="descripcion" className="block text-sm/6 font-semibold text-gray-900">
                            Descripción
                        </label>
                        <div className="mt-2.5">
                            <textarea
                                id="descripcion"
                                name="descripcion"
                                rows={3}
                                value={formData.descripcion}
                                onChange={handleChange}
                                required
                                className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
                            />
                        </div>
                    </div>

                    {/* Campo Fecha Límite */}
                    <div className="sm:col-span-2">
                        <label htmlFor="fecha_limite" className="block text-sm/6 font-semibold text-gray-900">
                            Fecha Límite
                        </label>
                        <div className="mt-2.5">
                            <input
                                id="fecha_limite"
                                name="fecha_limite"
                                type="date"
                                value={formData.fecha_limite}
                                onChange={handleChange}
                                required
                                className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
                            />
                        </div>
                    </div>
                </div>

                {/* Botón de enviar */}
                <div className="mt-10 flex row gap-2">
                    <button
                        onClick={handleClick}
                        disabled={loading}
                        className="block w-full rounded-md bg-gray-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-xs hover:bg-gray-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Volver a Tareas
                    </button>
                    <button
                        type="submit"
                        disabled={loading}
                        className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? 'Creando Tarea...' : 'Crear Tarea'}
                    </button>
                </div>

                {/* Mostrar errores */}
                {
                    error && (
                        <div className="mt-4 p-2 bg-red-100 text-red-700 rounded text-sm">
                            Error: {error?.message || 'No se pudo crear la tarea'}
                        </div>
                    )
                }
            </form >
        </div >
    );
};

export default RegisterTask;