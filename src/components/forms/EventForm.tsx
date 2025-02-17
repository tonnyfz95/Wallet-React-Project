import React, { useState, useEffect } from "react";


type Evento = {
  id: string;
  nombre: string;
  descripcion: string;
  cantidad: number;
  fecha: string;
  tipo: string;
  imagen: string | null; 
};


interface EventFormProps {
  evento?: Evento | null;
  onClose: () => void;
}

const EventForm: React.FC<EventFormProps> = ({ evento, onClose }) => {
  const [id, setId] = useState<string>("");
  const [nombre, setNombre] = useState<string>("");
  const [descripcion, setDescripcion] = useState<string>("");
  const [cantidad, setCantidad] = useState<number | string>("");
  const [fecha, setFecha] = useState<string>("");
  const [tipo, setTipo] = useState<string>("ingreso");
  const [imagen, setImagen] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    if (evento) {
      setNombre(evento.nombre);
      setDescripcion(evento.descripcion);
      setCantidad(evento.cantidad.toString());
      setFecha(evento.fecha);
      setTipo(evento.tipo);
      if (evento.imagen) {
        setPreview(evento.imagen); 
      }
    }
  }, [evento]);
  
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  
    const nuevoEvento = {
      id: evento ? evento.id : crypto.randomUUID(),
      nombre,
      descripcion,
      cantidad: Number(cantidad),
      fecha,
      tipo,
      imagen: imagen || preview || null,
    };
  
    const eventosGuardados = JSON.parse(localStorage.getItem("eventos") || "[]");
  
    const fechaEvento = new Date(fecha);
    const mes = fechaEvento.toLocaleString("es-ES", { month: "long" });
    const anio = fechaEvento.getFullYear();
    const clave = `${mes.toUpperCase()} ${anio}`;
   
    let ingresos = 0;
    let egresos = 0;
  
    eventosGuardados.forEach((ev: Evento) => {
      const evFecha = new Date(ev.fecha);
      const evMes = evFecha.toLocaleString("es-ES", { month: "long" });
      const evAnio = evFecha.getFullYear();
      const evClave = `${evMes.toUpperCase()} ${evAnio}`;
  
      if (evClave === clave && ev.id !== nuevoEvento.id) { 
        if (ev.tipo === "ingreso") {
          ingresos += ev.cantidad;
        } else if (ev.tipo === "egreso") {
          egresos += ev.cantidad;
        }
      }
    });
  
    const valorGuardado = Number(localStorage.getItem("valorGuardado")) || 0;
    console.log(valorGuardado)
    const valorGlobal = valorGuardado + ingresos - egresos;
  
    if (tipo === "egreso" && nuevoEvento.cantidad > valorGlobal) {
      alert(`Error: No puedes gastar más de lo disponible $ ${valorGlobal} en ${clave}.`);
      return;
    }
    
    if (evento) {
      const eventosActualizados = eventosGuardados.map((ev: Evento) =>
        ev.id === evento.id ? nuevoEvento : ev
      );
      localStorage.setItem("eventos", JSON.stringify(eventosActualizados));
    } else {
      localStorage.setItem("eventos", JSON.stringify([...eventosGuardados, nuevoEvento]));
    }
  
    onClose?.();
  };
  
  

  const handleCancel = () => {
    // Reseteo los valores del formulario
    setNombre("");
    setDescripcion("");
    setCantidad("");
    setFecha("");
    setTipo("ingreso");
    setImagen(null);
    setPreview(null);
    onClose?.();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader(); 
  
      reader.onloadend = () => {
        // Al terminar de cargar el archivo, se llama a esta función
        const base64Image = reader.result as string; 
        setImagen(base64Image); 
        setPreview(base64Image);
      };
  
      reader.readAsDataURL(file);
    }
  };
  
  
  
  

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-6 bg-gray-100 dark:bg-gray-700 rounded-lg shadow-md">
      <input type="hidden" value={id} onChange={(e) => setId(e.target.value)} />

      <div>
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">Nombre</label>
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
          maxLength={20}
          className="w-full p-2 mt-1 border rounded-md bg-white dark:bg-gray-800"
        />
      </div>
      <div>
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">Descripción</label>
        <input
          type="text"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          maxLength={100}
          className="w-full p-2 mt-1 border rounded-md bg-white dark:bg-gray-800"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">Cantidad</label>
        <input
          type="number"
          value={cantidad}
          onChange={(e) => setCantidad(e.target.value)}
          required
          min="0"
          step="any"
          className="w-full p-2 mt-1 border rounded-md bg-white dark:bg-gray-800"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">Fecha</label>
        <input
          type="date"
          value={fecha}
          onChange={(e) => setFecha(e.target.value)}
          required
          className="w-full p-2 mt-1 border rounded-md bg-white dark:bg-gray-800"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">Tipo</label>
        <select
          value={tipo}
          onChange={(e) => setTipo(e.target.value)}
          required
          className="w-full p-2 mt-1 border rounded-md bg-white dark:bg-gray-800"
        >
          <option value="ingreso">Ingreso</option>
          <option value="egreso">Egreso</option>
        </select>
      </div>

      {/* Cargador de Imagen */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">Imagen</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="w-full p-2 mt-1 border rounded-md bg-white dark:bg-gray-800"
        />
        {preview && (
          <div className="mt-2">
            <img src={preview} alt="Vista previa" className="w-24 h-24 object-cover rounded-md border" />
          </div>
        )}
      </div>

      {/* Botones */}
      <div className="flex justify-between mt-4">
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
          Guardar Evento
        </button>
        <button 
          type="button" 
          onClick={handleCancel} 
          className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
};

export default EventForm;