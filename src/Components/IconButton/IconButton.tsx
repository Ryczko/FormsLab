import React from "react";

interface IconButtonProps {
    icon: string;
    selected?: boolean;
}

function IconButton({ icon, onClick, selected = false }: IconButtonProps & React.HTMLProps<HTMLButtonElement>) {
    return (
        <button
            className={`bg-white text-3xl p-3 border-4 border-transparent rounded-xl duration-100 m-2 shadow-lg ${
                selected ? "scale-90 border-slate-300" : ""
            }`}
            onClick={onClick}
        >
            {icon}
        </button>
    );
}

export default IconButton;
