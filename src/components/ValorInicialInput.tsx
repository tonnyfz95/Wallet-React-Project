import React, { useState } from "react";

interface Props {
  guardarValor: (valor: number) => void;
}

const ValorInicialInput: React.FC<Props> = ({ guardarValor }) => {
  const [valorInicial, setValorInicial] = useState<string>("");


  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (/^\d*\.?\d*$/.test(value)) setValorInicial(value);
    
  };

  return (
    <div className="text-xl font-semibold mb-4">
            <label className="block text-sm font-semibold mb-1 text-left"></label>
            <div className="flex items-center space-x-3">
      <input
        type="text"
        value={valorInicial}
        onChange={handleInputChange}
        className="w-48 h-10 p-3 text-sm border rounded-md bg-white dark:bg-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Ingrese valor"
        maxLength={10}
      />
      <button
        onClick={() => guardarValor(parseFloat(valorInicial) || 0)}
        className="w-30 p-2.5 bg-blue-500 text-sm text-white rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
      >
        Guardar
      </button>
    </div>
    </div>
  );
};

export default ValorInicialInput;
