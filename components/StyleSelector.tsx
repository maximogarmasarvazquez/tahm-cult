// components/StyleSelector.tsx
import React from "react";
import { Style } from "../types";

interface Props {
  styles: Style[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}

const StyleSelector: React.FC<Props> = ({ styles, selectedId, onSelect }) => {
  return (
    <div className="flex gap-2">
      {styles.map((style) => (
        <button
          key={style.id}
          style={{
            backgroundColor: style.bg_color || "#eee",
            color: style.text_color || "#000",
            fontFamily: style.font_family || "sans-serif",
            border: selectedId === style.id ? "2px solid black" : "1px solid #ccc",
          }}
          className="px-4 py-2 rounded"
          onClick={() => onSelect(style.id)}
        >
          {style.name}
        </button>
      ))}
    </div>
  );
};

export default StyleSelector;
