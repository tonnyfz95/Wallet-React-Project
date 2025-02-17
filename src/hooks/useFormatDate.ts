
export const formatearFecha = (fechaISO: string) => {
  const [year, month, day] = fechaISO.split("-"); // obtengo el año, mes y día
  return `${day}/${month}/${year}`; // me devuelve en formato "DD/MM/YYYY"
};
