import React from "react";
import { useDispatch } from 'react-redux';
import { startTask, completeTask } from '../../features/tareas/tareaSlice';

const TaskCard = ({ _id, created_at, titulo, usuarioId, descripcion, fecha_limite, estado }) => {
  const dispatch = useDispatch();

  // Determinar el color según el estado
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
    // Optionally, you can handle the 'completada' state (e.g., show a message)
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
      <div className="relative mt-8 flex items-center gap-x-4">
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
      </div>
    </article>
  );
};

export default TaskCard;