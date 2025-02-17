import React from "react";

type Evento = {
  id: string;
  nombre: string;
  descripcion: string;
  cantidad: number;
  fecha: string;
  tipo: string;
  imagen: string | null;
};

interface Props {
  setIsModalOpen: (estado: boolean) => void;
  setEventoSeleccionado: (evento: Evento | null) => void;
  disabled: boolean;
}

const BotonAgregarEvento: React.FC<Props> = ({ setIsModalOpen, setEventoSeleccionado, disabled }) => {
  return (
    <button
      onClick={() => {
        setEventoSeleccionado(null);
        setIsModalOpen(true);
      }}
      disabled={disabled}
      className={`px-4 py-3 rounded-lg shadow-md ${
        disabled
          ? "bg-gray-300 text-gray-500 cursor-not-allowed"
          : "bg-green-400 hover:bg-green-500 text-white"
      }`}
    >
      Agregar Evento
    </button>
  );
};

export default BotonAgregarEvento;
