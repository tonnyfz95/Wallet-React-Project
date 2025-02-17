import { useState, useEffect } from "react";

type Evento = {
  id: string;
  nombre: string;
  descripcion: string;
  cantidad: number;
  fecha: string;
  tipo: string;
  imagen: string | null;
};

export const useEventos = () => {
  const [eventos, setEventos] = useState<Evento[]>([]);

  const obtenerValorGuardado = () => {
    const valorGuardado = localStorage.getItem("valorGuardado");
    console.log(valorGuardado)
    return valorGuardado ? Number(valorGuardado) : 0;
   
  };
  const valorGuardado = obtenerValorGuardado();

  useEffect(() => {
    actualizarEventos();
    window.addEventListener("storage", actualizarEventos);
    return () => window.removeEventListener("storage", actualizarEventos);
  }, []);

  const actualizarEventos = () => {
    const eventosGuardados = JSON.parse(
      localStorage.getItem("eventos") || "[]"
    );
    setEventos(eventosGuardados);
  };

  const agruparEventos = () => {
    const grupos: {
      [key: string]: {
        nombre: string;
        eventos: Evento[];
        ingresos: number;
        egresos: number;
        global: number;
      };
    } = {};
    eventos
      .sort((a, b) => new Date(a.fecha).getTime() - new Date(b.fecha).getTime())
      .forEach((evento) => {
        const fecha = new Date(`${evento.fecha}T00:00:00`);
        const mes = fecha.toLocaleString("es-ES", { month: "long" });
        const anio = fecha.getFullYear();
        const clave = `${mes.toUpperCase()} ${anio}`;

        if (!grupos[clave]) {
          grupos[clave] = {
            nombre: clave,
            eventos: [],
            ingresos: 0,
            egresos: 0,
            global: 0,
          };
        }

        grupos[clave].eventos.push(evento);

        if (evento.tipo === "ingreso") {
          grupos[clave].ingresos += parseFloat(evento.cantidad.toString());
        } else if (evento.tipo === "egreso") {
          grupos[clave].egresos += parseFloat(evento.cantidad.toString());
        }
      });

    

    Object.values(grupos).forEach((grupo) => {
      grupo.global =
        parseFloat(valorGuardado.toString()) + grupo.ingresos - grupo.egresos;
    });

    return Object.values(grupos);
  };

  return { eventos, agruparEventos, actualizarEventos };
};
