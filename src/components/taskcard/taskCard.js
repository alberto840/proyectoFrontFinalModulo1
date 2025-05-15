import React from "react";

const TaskCard = ({ _id, created_at, titulo, usuarioId, descripcion, fecha_limite, estado }) => {
    return (
        <article key={_id} className="flex max-w-xl flex-col items-start justify-between">
            <div className="flex items-center gap-x-4 text-xs">
                <time dateTime={created_at} className="text-gray-500">
                    {created_at}
                </time>
                <a
                    href={estado}
                    className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
                >
                    {titulo}
                </a>
            </div>
            <div className="group relative">
                <h3 className="mt-3 text-lg/6 font-semibold text-gray-900 group-hover:text-gray-600">
                    <a>
                        <span className="absolute inset-0" />
                        {titulo}
                    </a>
                </h3>
                <p className="mt-5 line-clamp-3 text-sm/6 text-gray-600">{descripcion}</p>
            </div>
            <div className="relative mt-8 flex items-center gap-x-4">
                <div className="text-sm/6">
                    <p className="font-semibold text-gray-900">
                        <a>
                            <span className="absolute inset-0" />
                            {usuarioId}
                        </a>
                    </p>
                    <p className="text-gray-600">{usuarioId}</p>
                </div>
            </div>
        </article>
    );
};

export default TaskCard;