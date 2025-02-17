import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../features/theme/themeSlice";
import { RootState } from "../store/store";
import { useEventos } from "../hooks/useEventos";
import { useValorGuardado } from "../hooks/useValorGuardado";
import { useDebouncedSearch } from "../hooks/useDebouncedSearch";
import EventosLista from "../components/EventosLista";
import ValorInicialInput from "../components/ValorInicialInput";
import BotonAgregarEvento from "../components/BotonAgregarEvento";
import SearchBar from "../components/SearchReusable";
import ModalReusable from "../components/ModalReusable";
import EventForm from "../components/forms/EventForm";

type Evento = {
  id: string;
  nombre: string;
  descripcion: string;
  cantidad: number;
  fecha: string;
  tipo: string;
  imagen: string | null;
};

const HomePage: React.FC = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state: RootState) => state.theme.theme);
  const { agruparEventos, actualizarEventos } = useEventos();
  const { valorGuardado, guardarValor } = useValorGuardado();
  const { searchQuery, debouncedSearchQuery, handleSearchChange } = useDebouncedSearch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [eventoSeleccionado, setEventoSeleccionado] = useState<Evento | null>(null);  // 🔹 Tipo correcto aquí

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    document.body.className = theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-black";
  }, [theme]);

  const eventosAgrupados = agruparEventos().filter((grupo) =>
    grupo.nombre.toLowerCase().includes(debouncedSearchQuery.toLowerCase())
  );

  const handleEventoGuardado = () => {
    setIsModalOpen(false);
    actualizarEventos(); 
  };

  return (
    <div className="text-center">
      <div className="app relative">
        {/* Boton para cambiar tema de ligth a dark y viceversa */}
        <div className="flex justify-between items-center px-4 py-8 bg-gray-50 dark:bg-gray-700 shadow-lg">
                  <button
                    onClick={() => dispatch(toggleTheme())}
                    className="px-4 py-2 bg-gray-200 dark:bg-gray-800 rounded-md absolute top-3 right-[20px] flex items-center justify-center"
                  >
                    {theme === "light" ? "☀️" : "🌙"}
                  </button>
                </div>
        <div className="flex justify-between items-center p-10">
          <ValorInicialInput guardarValor={guardarValor} />
          <BotonAgregarEvento setIsModalOpen={setIsModalOpen} disabled={valorGuardado <= 0} setEventoSeleccionado={setEventoSeleccionado} />
        </div>
        <div className="flex flex-wrap justify-start gap-4 px-10">
            <div className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-300 px-6 py-4 rounded-xl shadow-lg text-lg font-semibold">
                <span className="text-xl font-bold">
                💰 Valor Inicial: ${valorGuardado}
                </span>
            </div>
            <SearchBar searchQuery={searchQuery} handleSearchChange={handleSearchChange} />
          </div>

        

        <EventosLista
          eventosAgrupados={eventosAgrupados}
          setEventoSeleccionado={setEventoSeleccionado}
          setIsModalOpen={setIsModalOpen}
        />

        {isModalOpen && (
          <ModalReusable isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
            <EventForm evento={eventoSeleccionado} onClose={handleEventoGuardado} />
          </ModalReusable>
        )}
      </div>
    </div>
  );
};

export default HomePage;
