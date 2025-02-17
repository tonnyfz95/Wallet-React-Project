import React from "react";
import TooltipReusable from "./Tooltip";
import { formatearFecha } from "../hooks/useFormatDate";

type Evento = {
  id: string;
  nombre: string;
  descripcion: string;
  cantidad: number;
  fecha: string;
  tipo: string;
  imagen: string | null;
};

interface GrupoEventos {
    nombre: string;
    eventos: Evento[];
    ingresos: number;
    egresos: number;
    global: number;
}



interface Props {
  eventosAgrupados: GrupoEventos[];
  setEventoSeleccionado: (evento: Evento | null) => void;
  setIsModalOpen: (estado: boolean) => void;
}

const EventosLista: React.FC<Props> = ({ eventosAgrupados, setEventoSeleccionado, setIsModalOpen }) => {
    if (eventosAgrupados.length === 0) {
    return <p className="text-center text-gray-500 dark:text-gray-400 w-full">No hay eventos registrados.</p>;
  }

  const obtenerValorGuardado = () => {
    const valorGuardado = localStorage.getItem("valorGuardado");
    console.log(valorGuardado)
    return valorGuardado ? Number(valorGuardado) : 0;
   
  };

  const valorGuardado =obtenerValorGuardado();

  return (
    <div className="flex flex-wrap justify-start gap-4 px-10 p-10">
      {eventosAgrupados.map((grupo) => (
        <div key={grupo.nombre} className="w-full md:w-[40%] lg:w-[25%] bg-gray-100 dark:bg-gray-800 rounded-2xl shadow-lg p-6">
          <h2 className="font-semibold text-gray-600 dark:text-gray-300 mb-4 text-center">{grupo.nombre}</h2>

          <div className="space-y-2 rounded-2xl">
            {grupo.eventos.map((evento) => (
              <div
                key={evento.id}
                className="flex justify-between items-start px-4 py-3 rounded-lg bg-white dark:bg-gray-700 cursor-pointer shadow-lg"
                onClick={() => {
                  setEventoSeleccionado(evento);
                  setIsModalOpen(true);
                }}
                data-tooltip-id={`tooltip-${evento.id}`}
              >
                <div className="text-left">
                  <span className="font-medium text-gray-600 dark:text-gray-300">{evento.nombre}</span>
                  <div className="text-sm text-gray-500 dark:text-gray-400">{formatearFecha(evento.fecha)}</div>
                </div>
                <span
                  className={`font-bold ${
                    evento.tipo === "ingreso" ? "text-green-500 dark:text-green-500" : "text-red-500 dark:text-red-500"
                  }`}
                >
                  ${evento.cantidad}
                </span>
                <TooltipReusable id={`tooltip-${evento.id}`} place="bottom">
                  <div className="flex flex-col items-center">
                    <p className="font-semibold text-sm">{evento.descripcion}</p>
                    {evento.imagen && <img src={evento.imagen} alt="Imagen del evento" className="mt-2 w-20 h-20 rounded-lg shadow-md" />}
                  </div>
                </TooltipReusable>
              </div>
            ))}
            {/* valor inicial */}
            <div className="flex justify-between p-4">
                  <div className="text-left">
                    <p>Valor Inicial</p>
                  </div>
                  <span>${valorGuardado}</span>
                </div>

                {/* muestro el total de ingresos, egresos y el valor global */}
                <div className="flex justify-between p-4">
                  <div className="text-left">
                    <p>Ingresos</p>
                  </div>
                  <span>${parseFloat(grupo.ingresos.toString()) || 0}</span>
                </div>
                <div className="flex justify-between p-4">
                  <div className="text-left">
                    <p>Egresos</p>
                  </div>
                  <span>${parseFloat(grupo.egresos.toString()) || 0}</span>
                </div>
                <div className="flex justify-between p-4">
                  <div className="text-left">
                    <p>Valor Global</p>
                  </div>
                  <span>${grupo.global}</span>
                </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default EventosLista;
