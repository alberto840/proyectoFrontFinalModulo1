import React, { useState } from 'react';
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../features/auth/authSlice';

const LoginView = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error } = useSelector((state) => state.auth);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const login = async (e) => {
        e.preventDefault();        
        try {
            const resultAction = await dispatch(loginUser({
                email: formData.email,
                password: formData.password
            }));
            
            if (loginUser.fulfilled.match(resultAction)) {
                navigate('/tareas'); // Redirige si el login es exitoso
            }
        } catch (err) {
            // El error ya está manejado en el slice
        }
    };

    return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <img
                    alt="Your Company"
                    src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
                    className="mx-auto h-10 w-auto"
                />
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm border-2 border-indigo-300 rounded-lg p-6">
                <h2 className="mt-5 mb-5 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
                    Inicia sesión
                </h2>
                
                {error && (
                    <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">
                        {error.message || 'Credenciales incorrectas'}
                    </div>
                )}
                
                <form onSubmit={login} className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                            Email
                        </label>
                        <div className="mt-2">
                            <input
                                id="email"
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
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
                                value={formData.password}
                                onChange={handleChange}
                                required
                                autoComplete="current-password"
                                className="block w-full rounded-md bg-gray-300 px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? 'Cargando...' : 'Iniciar sesión'}
                        </button>
                    </div>
                </form>

                <p className="mt-10 text-center text-sm/6 text-gray-500">
                    ¿No estas registrado?{' '}
                    <a
                        to="/register"
                        className="font-semibold text-indigo-600 hover:text-indigo-500">
                        Registrate aqui!
                    </a>
                </p>
            </div>
        </div>
    );
};

export default LoginView;