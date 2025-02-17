import React from "react";
import { Tooltip as ReactTooltip } from "react-tooltip"; // Si estás usando la librería react-tooltip

interface TooltipReusableProps {
  id: string;
  place: "top" | "bottom" | "left" | "right";
  children: React.ReactNode;
}

const TooltipReusable: React.FC<TooltipReusableProps> = ({
  id,
  place,
  children,
}) => {
  return (
    <>
      <ReactTooltip
        id={id}
        place={place}
        className="bg-black text-white p-3 rounded-lg shadow-lg w-60 text-center"
      >
        {children}
      </ReactTooltip>
    </>
  );
};

export default TooltipReusable;
