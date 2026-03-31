"use client";

import React, { useState } from "react";
import { postsService } from "@/services/posts.service";
import { postMediaService } from "@/services/postMedia.service";
import { uploadImage } from "@/services/uploadImage.service"; // 🔥 tu service para imágenes
import { Style } from "@/types";
import { useRouter } from "next/navigation";

interface Props {
  styles: Style[];
  clientId: string; // 🔥 obligatorio para asignar el post al cliente
}

export default function PostForm({ styles, clientId }: Props) {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [styleId, setStyleId] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [externalUrl, setExternalUrl] = useState<string>(""); // 🔹 para videos

  const selectedStyle = styles.find((s) => s.id === styleId);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // 🔹 1. Crear post
      const post = await postsService.create({
        title,
        description,
        category,
        style_id: styleId,
        client_id: clientId,
      });

      // 🔹 2. Subir imagen si hay file
      if (file) {
        const imageUrl = await uploadImage(file);

        await postMediaService.create({
          post_id: post.id,
          type: "image",
          url: imageUrl,
          external_url: null,
          sort_order: 0,
        });
      }

      // 🔹 3. Guardar video externo si hay URL
      if (externalUrl) {
        await postMediaService.create({
          post_id: post.id,
          type: "video",
          url: null,
          external_url: externalUrl,
          sort_order: 0,
        });
      }

      // 🔹 reset
      setTitle("");
      setDescription("");
      setCategory("");
      setStyleId(null);
      setFile(null);
      setExternalUrl("");

      router.refresh();
    } catch (err) {
      console.error("Error:", err);
    }
  };

  return (
    <div className="space-y-6">
      {/* 🎨 STYLE SELECT */}
      <select
        value={styleId ?? ""}
        onChange={(e) => setStyleId(e.target.value)}
        className="border p-2 w-full"
      >
        <option value="">Seleccionar estilo</option>
        {styles.map((style) => (
          <option key={style.id} value={style.id}>
            {style.name}
          </option>
        ))}
      </select>

      {/* ⚡ PREVIEW */}
      <div
        className="p-4 rounded-xl border"
        style={{
          backgroundColor: selectedStyle?.bg_color || "#fff",
          color: selectedStyle?.text_color || "#000",
          fontFamily: selectedStyle?.font_family || "inherit",
        }}
      >
        <h2 className="text-xl font-bold">{title || "Título preview"}</h2>
        <p>{description || "Descripción preview..."}</p>
        {externalUrl && (
          <iframe
            width="100%"
            height="200"
            src={externalUrl}
            title="Video preview"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        )}
      </div>

      {/* 🧾 FORM */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          placeholder="Título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 w-full"
        />

        <textarea
          placeholder="Descripción"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border p-2 w-full"
        />

        <input
          placeholder="Categoría"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border p-2 w-full"
        />

        {/* 📷 IMAGEN */}
        <input
          type="file"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
        />

        {/* 🎥 VIDEO */}
        <input
          placeholder="Enlace de video (opcional)"
          value={externalUrl}
          onChange={(e) => setExternalUrl(e.target.value)}
          className="border p-2 w-full"
        />

        <button className="bg-black text-white px-4 py-2 rounded">
          Crear Post
        </button>
      </form>
    </div>
  );
}
