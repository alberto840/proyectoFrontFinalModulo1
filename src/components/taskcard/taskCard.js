import React from "react";
import { useDispatch } from 'react-redux';
import { startTask, completeTask, deleteTask } from '../../features/tareas/tareaSlice'; // Importa deleteTask action

const TaskCard = ({ _id, created_at, titulo, usuarioId, descripcion, fecha_limite, estado }) => {
  const dispatch = useDispatch();

  const estadoStyles = {
    pendiente: "bg-indigo-600 text-white hover:bg-indigo-700",
    en_progreso: "bg-yellow-100 text-yellow-900 hover:bg-yellow-300",
    completada: "bg-green-100 text-green-800 hover:bg-green-200",
  };

  const estadoStylesCard = {
    pendiente: "bg-indigo-300",
    en_progreso: "bg-yellow-200",
    completada: "bg-gray-100",
  };

  const estadoTexts = {
    pendiente: "Pendiente",
    en_progreso: "En Progreso",
    completada: "Completada",
  };

  const estadoClass = estadoStyles[estado.toLowerCase()] || "bg-gray-100 text-gray-800 hover:bg-gray-200";
  const estadoStyleCard = estadoStylesCard[estado.toLowerCase()] || "bg-gray-100";
  const estadoText = estadoTexts[estado.toLowerCase()] || "Sin estado";

  const handleEstadoClick = () => {
    if (estado.toLowerCase() === 'pendiente') {
      dispatch(startTask(_id));
    } else if (estado.toLowerCase() === 'en_progreso') {
      dispatch(completeTask(_id));
    }
  };

  const handleDeleteClick = () => {
    dispatch(deleteTask({ id: _id, userId: usuarioId }));
  };

  return (
    <article key={_id} className={`flex max-w-xl flex-col items-start justify-between ${estadoStyleCard} p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300`}>
      <div className="flex items-center gap-x-4 text-xs">
        <time dateTime={_id} className="text-emerald-700 font-bold">
          {_id}
        </time>
        <button
          onClick={handleEstadoClick}
          className={`relative z-10 rounded-full px-3 py-1.5 font-medium ${estadoClass}`}
        >
          {estadoText}
        </button>
      </div>
      <div className="group relative">
        <h3 className="mt-3 text-lg/6 font-semibold text-gray-900 group-hover:text-gray-600">
          <a>
            <span className="absolute inset-0" />
            {titulo}
          </a>
        </h3>
        <p className="mt-5 line-clamp-3 text-sm/6 text-gray-800">{descripcion}</p>
      </div>
      <div className="mt-8 flex items-center justify-between"> {/* Utilizamos justify-between para alinear los elementos */}
        <div className="text-sm/6">
          <p className="font-semibold text-gray-900">
            <a>
              <span className="absolute inset-0" />
              Creada: {new Date(created_at).toLocaleDateString('es-ES', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </a>
          </p>
          <p className="text-gray-600">Fecha entrega: {new Date(fecha_limite).toLocaleDateString('es-ES', {
            day: '2-digit',
            month: 'long',
            year: 'numeric'
          })}
          </p>
        </div>
        {estado.toLowerCase() === 'completada' && ( // Renderiza el botón solo si el estado es "completada"
          <button
            onClick={handleDeleteClick}
            className="ml-10 mt-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus-shadow-outline"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-5a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        )}
      </div>
    </article>
  );
};

export default TaskCard;