import { useState } from "react";

export const useValorGuardado = () => {
  const [valorGuardado, setValorGuardado] = useState<number>(Number(localStorage.getItem("valorGuardado") || 0));

  const guardarValor = (nuevoValor: number) => {
    const nuevoTotal = valorGuardado + nuevoValor;
    setValorGuardado(nuevoTotal);
    localStorage.setItem("valorGuardado", String(nuevoTotal));
    window.dispatchEvent(new Event("storage"));
    return nuevoTotal;
  };

  return { valorGuardado, guardarValor };
};
