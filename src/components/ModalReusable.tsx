import React from "react";
interface ModalReusableProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const ModalReusable: React.FC<ModalReusableProps> = ({ isOpen, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-lg w-full">
        {children}
      </div>
    </div>
  );
};

export default ModalReusable;
