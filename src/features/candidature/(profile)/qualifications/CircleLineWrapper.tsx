import React from "react";

interface CircleLineWrapperProps {
  color?: string;
  leftStyle?: string;
  children: React.ReactNode;
}

const CircleLineWrapper: React.FC<CircleLineWrapperProps> = ({
  color = "bg-primaryHex-500",
  leftStyle = "0.5px",
  children,
}) => {
  return (
    <div className="relative flex flex-col items-start w-full pl-2">
      <div
        className={`absolute w-4 h-4 ${color} rounded-full`}
        style={{ left: leftStyle }}
      ></div>
      <div className="border-l-2 border-primaryHex-400 pl-5 w-full mt-2">
        {children}
      </div>
    </div>
  );
};

export default CircleLineWrapper;
