import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from "react-router";
import TaskCard from "../taskcard/taskCard";
import {
  fetchTasks,
  fetchTasksByStatus,
  fetchTasksByName,
  clearSearchResults,
  fetchTasksByDateRange,
  selectDateRangeResults,
  selectDateRangeLoading,
  selectDateRangeError,
} from '../../features/tareas/tareaSlice';

import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { Field, Label, Switch } from '@headlessui/react';

const HomeView = () => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState('');
  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaFin, setFechaFin] = useState('');
  const {
    items: tasks,
    loading,
    error,
    searchResults,
    searchLoading,
    dateRangeResults,
    dateRangeLoading,
    dateRangeError,
  } = useSelector((state) => state.tasks);

  const usuarioNombre = localStorage.getItem('usuarioNombre') || 'Usuario';
  const [activeFilter, setActiveFilter] = useState('all');

  useEffect(() => {
    const usuarioId = localStorage.getItem('usuarioId');
    if (usuarioId) {
      dispatch(fetchTasks());
    }
  }, [dispatch]);

  const handleFilterByStatus = (estado) => {
    setActiveFilter(estado);
    dispatch(fetchTasksByStatus(estado));
    setSearchTerm('');
    setFechaInicio('');
    setFechaFin('');
  };

  const handleShowAllTasks = () => {
    setActiveFilter('all');
    dispatch(fetchTasks());
    setSearchTerm('');
    setFechaInicio('');
    setFechaFin('');
    //navigate('/tareas');
    window.location.reload();
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      dispatch(fetchTasksByName(searchTerm));
    } else {
      dispatch(clearSearchResults());
      if (activeFilter === 'all') {
        dispatch(fetchTasks());
      } else {
        dispatch(fetchTasksByStatus(activeFilter));
      }
    }
  };

  const handleClearSearch = () => {
    setSearchTerm('');
    dispatch(clearSearchResults());
    if (activeFilter === 'all') {
      dispatch(fetchTasks());
    } else {
      dispatch(fetchTasksByStatus(activeFilter));
    }
  };

  const handleFilterByDateRange = () => {
    if (fechaInicio && fechaFin) {
      dispatch(fetchTasksByDateRange({ fechaInicio, fechaFin }));
    } else {
      alert('Por favor, selecciona ambas fechas para filtrar.');
    }
  };

  const handleResetFilters = () => {
    setFechaInicio('');
    setFechaFin('');
    dispatch(fetchTasks()); // Vuelve a cargar todas las tareas
  };

  const tasksToDisplay = searchResults.length > 0
    ? searchResults
    : dateRangeResults.length > 0
      ? dateRangeResults
      : tasks;

  if (loading || searchLoading || dateRangeLoading) {
    return (
      <div className="bg-indigo-600 py-6 sm:py-8">
        <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8 bg-white">
          <p>Cargando tareas...</p>
        </div>
      </div>
    );
  }

  if (error || dateRangeError) {
    return (
      <div className="bg-indigo-600 py-6 sm:py-8">
        <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8 bg-white">
          {error && <p className="text-red-500 mb-5">Error: {error.message}</p>}
          {dateRangeError && <p className="text-red-500 mb-5">Error al filtrar por fecha: {dateRangeError.message}</p>}
          <div className="flex flex-col sm:flex-row gap-2">
            <NavLink
              to="/tareas/crear"
              className="mt-2 col-span-2 sm:col-span-1 rounded-md bg-stone-200 px-3 py-1.5 text-sm font-semibold text-black shadow-sm hover:bg-stone-300 transition-colors"
            >
              Crear nueva tarea
            </NavLink>
            {/* Botón para intentar recargar las tareas */}
            <button
              onClick={handleShowAllTasks} // Utiliza la función para mostrar todas las tareas
              className="mt-2 rounded-md bg-gray-200 px-3 py-1.5 text-sm font-semibold text-gray-700 shadow-sm hover:bg-gray-300 transition-colors"
            >
              Reintentar Cargar Tareas
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-indigo-600 py-6 sm:py-8">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8 bg-white">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl">Tus Tareas</h2>
          <p className="mt-2 mb-2 text-lg/8 text-gray-600">Bienvenido {usuarioNombre}, aquí podrás gestionar tus tareas de una forma simple.</p>
          <NavLink
            to="/tareas/crear"
            className="mt-2 col-span-2 sm:col-span-1 rounded-md bg-stone-200 px-3 py-1.5 text-sm font-semibold text-black shadow-sm hover:bg-stone-300 transition-colors"
          >
            Crear nueva tarea
          </NavLink>
        </div>

        <div className="mx-auto mt-2 grid max-w-2xl grid-cols-12 gap-x-4 gap-y-4 border-t border-gray-200 pt-5 sm:mt-5 sm:pt-8 lg:mx-0 lg:max-w-none">
          <div className="col-span-12 sm:col-span-6">
            <form onSubmit={handleSearch} className="flex gap-2">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar tareas por titulo..."
                className="flex-1 rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              <button
                type="submit"
                className="rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 transition-colors"
              >
                Buscar
              </button>
              {searchResults.length > 0 && (
                <button
                  type="button"
                  onClick={handleClearSearch}
                  className="rounded-md bg-gray-200 px-3 py-1.5 text-sm font-semibold text-gray-700 shadow-sm hover:bg-gray-300 transition-colors"
                >
                  Limpiar
                </button>
              )}
            </form>
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="fecha_inicio" className="block text-sm/6 font-semibold text-gray-900">
              Desde
            </label>
            <div className="mt-2.5">
              <input
                id="fecha_inicio"
                name="fecha_inicio"
                type="date"
                value={fechaInicio}
                onChange={(e) => setFechaInicio(e.target.value)}
                className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
              />
            </div>
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="fecha_fin" className="block text-sm/6 font-semibold text-gray-900">
              Hasta
            </label>
            <div className="mt-2.5">
              <input
                id="fecha_fin"
                name="fecha_fin"
                type="date"
                value={fechaFin}
                onChange={(e) => setFechaFin(e.target.value)}
                className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
              />
            </div>
          </div>
          <div className="sm:col-span-2 flex items-end">
            <button
              onClick={handleFilterByDateRange}
              className="rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 transition-colors"
            >
              Filtrar por Fecha
            </button>
          </div>
          <div className="col-span-12 sm:col-span-6 flex flex-wrap items-center gap-2 sm:gap-4">
            <span className="text-sm font-medium text-gray-700">Filtrar por:</span>
            <button
              onClick={() => handleFilterByStatus('pendiente')}
              className={`rounded-md px-3 py-1.5 text-sm font-semibold shadow-sm transition-colors ${activeFilter === 'pendiente' ? 'bg-indigo-700 text-white' : 'bg-indigo-600 text-white hover:bg-indigo-500'
                }`}
            >
              Pendientes
            </button>

            <button
              onClick={() => handleFilterByStatus('en_progreso')}
              className={`rounded-md px-3 py-1.5 text-sm font-semibold shadow-sm transition-colors ${activeFilter === 'en_progreso' ? 'bg-yellow-700 text-white' : 'bg-yellow-600 text-white hover:bg-yellow-500'
                }`}
            >
              En Progreso
            </button>

            <button
              onClick={() => handleFilterByStatus('completada')}
              className={`rounded-md px-3 py-1.5 text-sm font-semibold shadow-sm transition-colors ${activeFilter === 'completada' ? 'bg-green-700 text-white' : 'bg-green-600 text-white hover:bg-green-500'
                }`}
            >
              Completadas
            </button>

            <button
              onClick={handleClearSearch}
              className={`rounded-md px-3 py-1.5 text-sm font-semibold shadow-sm transition-colors ${activeFilter === 'all' ? 'bg-gray-700 text-white' : 'bg-gray-200 text-black hover:bg-gray-300'
                }`}
            >
              Todas
            </button>
          </div>
        </div>

        <div className="mx-auto mt-5 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-5 sm:mt-8 sm:pt-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {tasksToDisplay.length > 0 ? (
            tasksToDisplay.map((task) => (
              <TaskCard
                key={task._id}
                _id={task._id}
                created_at={task.created_at}
                titulo={task.titulo}
                usuarioId={task.usuarioId}
                descripcion={task.descripcion}
                fecha_limite={task.fecha_limite}
                estado={task.estado}
              />
            ))
          ) : (
            <div className="col-span-3 text-center py-8">
              <p className="text-gray-500">
                {searchTerm
                  ? `No se encontraron tareas con el titulo "${searchTerm}"`
                  : dateRangeResults.length > 0
                    ? 'No se encontraron tareas en el rango de fechas seleccionado'
                    : 'No hay tareas para mostrar'}
              </p>
              {/* Botón para restablecer los filtros y mostrar todas las tareas */}
              {(searchTerm || fechaInicio || fechaFin || activeFilter !== 'all') && (
                <button
                  onClick={handleResetFilters}
                  className="mt-4 rounded-md bg-gray-200 px-3 py-1.5 text-sm font-semibold text-gray-700 shadow-sm hover:bg-gray-300 transition-colors"
                >
                  Mostrar Todas las Tareas
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomeView;