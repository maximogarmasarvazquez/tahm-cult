"use client";

import { useState } from "react";
import { brandsService } from "@/services/brands.service";
import { Brand } from "@/types";
import { useRouter } from "next/navigation";

interface Props {
  clientId: string;
  brand?: Brand | null;
}

export default function BrandForm({ clientId, brand }: Props) {
  const router = useRouter();

  const [name, setName] = useState(brand?.name || "");
  const [title, setTitle] = useState(brand?.title || "");
  const [tagline, setTagline] = useState(brand?.tagline || "");
  const [description, setDescription] = useState(
    brand?.description || ""
  );
  const [category, setCategory] = useState(
    brand?.category || ""
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await brandsService.upsertByClient(clientId, {
        name,
        title,
        tagline,
        description,
        category,
      });

      router.refresh();
    } catch (err) {
      console.error("Error updating brand:", err);
    }
  };

  return (
    <div className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800 shadow-lg space-y-6">
      <h2 className="text-xl font-semibold text-white">
        Editar Homepage
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nombre de la marca"
          className="w-full p-3 rounded-lg bg-zinc-800 text-white border border-zinc-700"
        />

        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Título principal"
          className="w-full p-3 rounded-lg bg-zinc-800 text-white border border-zinc-700"
        />

        <input
          value={tagline}
          onChange={(e) => setTagline(e.target.value)}
          placeholder="Frase (tagline)"
          className="w-full p-3 rounded-lg bg-zinc-800 text-white border border-zinc-700"
        />

        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Descripción"
          className="w-full p-3 rounded-lg bg-zinc-800 text-white border border-zinc-700"
        />

        <input
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Categoría (ej: tatuador, diseñador)"
          className="w-full p-3 rounded-lg bg-zinc-800 text-white border border-zinc-700"
        />

        <button className="w-full bg-blue-600 hover:bg-blue-700 p-3 rounded-lg text-white">
          Guardar cambios
        </button>
      </form>
    </div>
  );
}
