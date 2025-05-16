import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from "react-router";
import TaskCard from "../taskcard/taskCard";
import {
  fetchTasks,
  fetchTasksByStatus,
  fetchTasksByName,
  clearSearchResults
} from '../../features/tareas/tareaSlice';

const HomeView = () => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState('');
  const {
    items: tasks,
    loading,
    error,
    searchResults,
    searchLoading
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
    setSearchTerm(''); // Limpiar búsqueda al aplicar filtro
  };

  const handleShowAllTasks = () => {
    setActiveFilter('all');
    dispatch(fetchTasks());
    setSearchTerm(''); // Limpiar búsqueda al mostrar todas
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      dispatch(fetchTasksByName(searchTerm));
    } else {
      dispatch(clearSearchResults());
      // Optionally refetch based on the active filter
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

  // Determinar qué tareas mostrar (resultados de búsqueda o tareas normales)
  const tasksToDisplay = searchResults.length > 0 ? searchResults : tasks;

  if (loading || searchLoading) {
    return (
      <div className="bg-indigo-600 py-6 sm:py-8">
        <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8 bg-white">
          <p>Cargando tareas...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-indigo-600 py-6 sm:py-8">
        <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8 bg-white">
          <p className="text-red-500 mb-5">Error: {error.message}</p>
          <NavLink
            to="/tareas/crear"
            className="mt-2 col-span-2 sm:col-span-1 rounded-md bg-stone-200 px-3 py-1.5 text-sm font-semibold text-black shadow-sm hover:bg-stone-300 transition-colors"
          >
            Crear nueva tarea
          </NavLink>
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

        {/* Sección de búsqueda y filtros */}
        <div className="mx-auto mt-2 grid max-w-2xl grid-cols-12 gap-x-4 gap-y-4 border-t border-gray-200 pt-5 sm:mt-5 sm:pt-8 lg:mx-0 lg:max-w-none">
          {/* Buscador */}
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

          {/* Filtros por estado */}
          <div className="col-span-12 sm:col-span-6 flex flex-wrap items-center gap-2 sm:gap-4 justify-end">
            <span className="text-sm font-medium text-gray-700">Filtrar por:</span>
            <button
              onClick={() => handleFilterByStatus('pendiente')}
              className={`rounded-md px-3 py-1.5 text-sm font-semibold shadow-sm transition-colors ${
                activeFilter === 'pendiente'
                  ? 'bg-indigo-700 text-white'
                  : 'bg-indigo-600 text-white hover:bg-indigo-500'
              }`}
            >
              Pendientes
            </button>

            <button
              onClick={() => handleFilterByStatus('en_progreso')}
              className={`rounded-md px-3 py-1.5 text-sm font-semibold shadow-sm transition-colors ${
                activeFilter === 'en_progreso'
                  ? 'bg-yellow-700 text-white'
                  : 'bg-yellow-600 text-white hover:bg-yellow-500'
              }`}
            >
              En Progreso
            </button>

            <button
              onClick={() => handleFilterByStatus('completada')}
              className={`rounded-md px-3 py-1.5 text-sm font-semibold shadow-sm transition-colors ${
                activeFilter === 'completada'
                  ? 'bg-green-700 text-white'
                  : 'bg-green-600 text-white hover:bg-green-500'
              }`}
            >
              Completadas
            </button>

            <button
              onClick={handleShowAllTasks}
              className={`rounded-md px-3 py-1.5 text-sm font-semibold shadow-sm transition-colors ${
                activeFilter === 'all'
                  ? 'bg-gray-700 text-white'
                  : 'bg-gray-200 text-black hover:bg-gray-300'
              }`}
            >
              Todas
            </button>
          </div>
        </div>

        {/* Resultados */}
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
                  : 'No hay tareas para mostrar'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomeView;