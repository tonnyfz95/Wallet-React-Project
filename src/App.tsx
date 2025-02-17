import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage"; // Componente para la página principal
import EventFormPage from "./pages/EventFormPage"; // Componente para la página del formulario

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Página principal */}
        <Route path="/" element={<HomePage />} />

        {/* Página del formulario */}
        <Route path="/event-form" element={<EventFormPage />} />
      </Routes>
    </Router>
  );
};

export default App;
