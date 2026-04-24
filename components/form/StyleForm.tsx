"use client";

import React, { useState } from "react";
import { stylesService } from "@/services/styles.service";
import { useRouter } from "next/navigation";
import { Style, LayoutType } from "@/types";

interface Props {
  clientId: string;
  mode: "create" | "edit";
  style?: Style;
  onClose?: () => void;
  onUpdated?: (style: Style) => void;
}

export default function StyleForm({
  clientId,
  mode,
  style,
  onClose,
  onUpdated,
}: Props) {
  const router = useRouter();

  const [name, setName] = useState(style?.name || "");
  const [bgColor, setBgColor] = useState(style?.bg_color || "#1e293b");
  const [textColor, setTextColor] = useState(style?.text_color || "#ffffff");
  const [fontFamily, setFontFamily] = useState(
    style?.font_family || "sans-serif"
  );
  const [layout, setLayout] = useState<LayoutType>(
    style?.layout || "card"
  );

  // 🔥 NUEVO: control auto/manual
  const [isTextAuto, setIsTextAuto] = useState(!style?.text_color);

  // 🎨 contraste automático
  const getContrastColor = (bg: string) => {
    const color = bg.replace("#", "");
    const r = parseInt(color.substring(0, 2), 16);
    const g = parseInt(color.substring(2, 4), 16);
    const b = parseInt(color.substring(4, 6), 16);

    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness > 125 ? "#000000" : "#ffffff";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (mode === "create") {
        const newStyle = await stylesService.create({
          name,
          bg_color: bgColor,
          text_color: textColor,
          font_family: fontFamily,
          layout,
          client_id: clientId,
        });

        resetForm();
        router.refresh();
        onUpdated?.(newStyle);
      }

      if (mode === "edit" && style?.id) {
        const updated = await stylesService.update(style.id, {
          name,
          bg_color: bgColor,
          text_color: textColor,
          font_family: fontFamily,
          layout,
        });

        onUpdated?.(updated);
        onClose?.();
      }
    } catch (err) {
      console.error("Error Style:", err);
    }
  };

  const resetForm = () => {
    setName("");
    setBgColor("#1e293b");
    setTextColor("#ffffff");
    setFontFamily("sans-serif");
    setLayout("card");
    setIsTextAuto(true);
  };

  const autoText = getContrastColor(bgColor);

  return (
    <div className="max-w-xl mx-auto space-y-6 p-6 bg-white rounded-2xl shadow-xl border">
      <h1 className="text-2xl font-bold text-gray-800">
        {mode === "create" ? "Crear Estilo" : "Editar Estilo"}
      </h1>

      {/* PREVIEW */}
      <div
        className="p-6 rounded-xl shadow-lg transition-all"
        style={{
          backgroundColor: bgColor,
          color: textColor,
          fontFamily: fontFamily,
        }}
      >
        <h2 className="text-xl font-bold">
          {name || "Preview estilo"}
        </h2>
        <p className="opacity-80">Este es un ejemplo del estilo</p>
        <div className="text-xs mt-2 opacity-60">
          Layout: {layout}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* NAME */}
        <input
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nombre del estilo"
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
        />

        {/* BG COLOR */}
        <div>
          <label className="text-sm text-gray-600">
            Color de fondo
          </label>
          <input
            type="color"
            value={bgColor}
            onChange={(e) => {
              const newColor = e.target.value;
              setBgColor(newColor);

              if (isTextAuto) {
                setTextColor(getContrastColor(newColor));
              }
            }}
            className="w-full h-12 rounded cursor-pointer"
          />
        </div>

        {/* TEXT COLOR */}
        <div className="space-y-2">
          <label className="text-sm text-gray-600">
            Color de texto
          </label>

          <input
            type="color"
            value={textColor}
            onChange={(e) => {
              setTextColor(e.target.value);
              setIsTextAuto(false); // 👈 el usuario toma control
            }}
            className="w-full h-12 rounded cursor-pointer"
          />

          {/* BOTÓN AUTO */}
          <button
            type="button"
            onClick={() => {
              const auto = getContrastColor(bgColor);
              setTextColor(auto);
              setIsTextAuto(true);
            }}
            className="text-xs text-blue-500 hover:underline"
          >
            Usar contraste automático
          </button>
        </div>

        {/* FONT */}
        <input
          value={fontFamily}
          onChange={(e) => setFontFamily(e.target.value)}
          placeholder="Font family (ej: Arial, sans-serif)"
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
        />

        {/* LAYOUT */}
        <select
          value={layout}
          onChange={(e) =>
            setLayout(e.target.value as LayoutType)
          }
          className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
        >
          <option value="card">Card</option>
          <option value="image-first">Image First</option>
          <option value="magazine">Magazine</option>
          <option value="carousel">Carousel</option>
        </select>

        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg transition">
          {mode === "create"
            ? "Crear Estilo"
            : "Guardar Cambios"}
        </button>
      </form>
    </div>
  );
}
