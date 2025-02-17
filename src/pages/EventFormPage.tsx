import React, { useState } from "react";
import EventForm from "../components/forms/EventForm";

const EventFormPage: React.FC = () => {
  // Estado del cierre del formulario
  const [isFormOpen, setIsFormOpen] = useState(true);

  // Función para cerrar el formulario
  const handleClose = () => {
    setIsFormOpen(false); 
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-semibold text-center mb-6">Crear Evento</h1>
      {isFormOpen && <EventForm onClose={handleClose} />}
    </div>
  );
};

export default EventFormPage;
