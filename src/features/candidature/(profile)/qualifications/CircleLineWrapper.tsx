import { useLocale } from "next-intl";
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
  const isRTL = useLocale() === "ar";
  return (
    <div
      className={`relative flex flex-col items-${
        isRTL ? "end" : "start"
      } w-full ${isRTL ? "pr-2" : "pl-2"}`}
    >
      <div
        className={`absolute w-4 h-4 ${color} rounded-full`}
        style={isRTL ? { right: leftStyle } : { left: leftStyle }}
      ></div>
      <div
        className={`${
          isRTL ? "border-r-2 pr-5" : "border-l-2 pl-5"
        } border-primaryHex-400 w-full mt-2`}
      >
        {children}
      </div>
    </div>
  );
};

export default CircleLineWrapper;
