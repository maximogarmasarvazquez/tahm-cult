"use client";

import React, { useState } from "react";
import { postsService } from "@/services/posts.service";
import { postMediaService } from "@/services/postMedia.service";
import { uploadImage } from "@/services/uploadImage.service";
import { Style, Post } from "@/types";
import { useRouter } from "next/navigation";

interface Props {
  styles: Style[];
  clientId: string;
  mode: "create" | "edit";
  post?: Post;
  onClose?: () => void;
  onUpdated?: (post: Post) => void;
}

export default function PostForm({
  styles,
  clientId,
  mode,
  post,
  onClose,
  onUpdated,
}: Props) {
  const router = useRouter();

  const [title, setTitle] = useState(post?.title || "");
  const [description, setDescription] = useState(post?.description || "");
  const [category, setCategory] = useState(post?.category || "");
  const [styleId, setStyleId] = useState<string | null>(
    post?.style_id || null
  );

  const [file, setFile] = useState<File | null>(null);
  const [externalUrl, setExternalUrl] = useState("");

  const selectedStyle = styles.find((s) => s.id === styleId);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      let currentPost = post;

      if (mode === "create") {
        currentPost = await postsService.create({
          title,
          description,
          category,
          style_id: styleId,
          client_id: clientId,
        });
      }

      if (mode === "edit" && post) {
        await postsService.update(post.id, {
          title,
          description,
          category,
          style_id: styleId,
        });

        currentPost = {
          ...post,
          title,
          description,
          category,
          style_id: styleId,
        };
      }

      if (!currentPost) return;

      if (file) {
        const imageUrl = await uploadImage(file);

        await postMediaService.create({
          post_id: currentPost.id,
          type: "image",
          url: imageUrl,
          external_url: null,
          sort_order: 0,
        });
      }

      if (externalUrl) {
        await postMediaService.create({
          post_id: currentPost.id,
          type: "video",
          url: null,
          external_url: externalUrl,
          sort_order: 0,
        });
      }

      if (mode === "create") {
        resetForm();
        router.refresh();
      }

      if (mode === "edit" && onUpdated) {
        onUpdated(currentPost);
        onClose?.();
      }
    } catch (err) {
      console.error("Error:", err);
    }
  };

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setCategory("");
    setStyleId(null);
    setFile(null);
    setExternalUrl("");
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8 p-6 bg-white text-black dark:bg-zinc-900 dark:text-white rounded-2xl shadow-lg border border-gray-200 dark:border-zinc-700">

      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-bold">
          {mode === "create" ? "Crear Post" : "Editar Post"}
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Completa la información del contenido
        </p>
      </div>

      {/* STYLE SELECT */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Estilo</label>
        <select
          value={styleId ?? ""}
          onChange={(e) => setStyleId(e.target.value)}
          className="w-full h-11 px-3 rounded-lg border border-gray-300 bg-white text-black dark:bg-zinc-800 dark:text-white dark:border-zinc-600 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
        >
          <option value="">Seleccionar estilo</option>
          {styles.map((style) => (
            <option key={style.id} value={style.id}>
              {style.name}
            </option>
          ))}
        </select>
      </div>

      {/* PREVIEW */}
      <div
        className="p-5 rounded-xl border shadow-sm transition-all"
        style={{
          backgroundColor: selectedStyle?.bg_color || "#fff",
          color: selectedStyle?.text_color || "#000",
          fontFamily: selectedStyle?.font_family || "inherit",
        }}
      >
        <h2 className="text-xl font-semibold mb-2">
          {title || "Título preview"}
        </h2>
        <p className="text-sm opacity-80">
          {description || "Descripción preview..."}
        </p>
      </div>

      {/* FORM */}
      <form onSubmit={handleSubmit} className="space-y-5">

        <div className="space-y-2">
          <label className="text-sm font-medium">Título</label>
          <input
            placeholder="Ej: Tattoo minimalista"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full h-11 px-3 rounded-lg border border-gray-300 bg-white text-black dark:bg-zinc-800 dark:text-white dark:border-zinc-600 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Descripción</label>
          <textarea
            placeholder="Describe el trabajo..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            className="w-full p-3 rounded-lg border border-gray-300 bg-white text-black dark:bg-zinc-800 dark:text-white dark:border-zinc-600 resize-none focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Categoría</label>
          <input
            placeholder="Ej: Tattoo / Ropa / Arte"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full h-11 px-3 rounded-lg border border-gray-300 bg-white text-black dark:bg-zinc-800 dark:text-white dark:border-zinc-600 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Imagen</label>
          <input
            type="file"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className="w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-black file:text-white hover:file:opacity-90"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Video (URL)</label>
          <input
            placeholder="https://..."
            value={externalUrl}
            onChange={(e) => setExternalUrl(e.target.value)}
            className="w-full h-11 px-3 rounded-lg border border-gray-300 bg-white text-black dark:bg-zinc-800 dark:text-white dark:border-zinc-600 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
          />
        </div>

        <button
          className="w-full h-11 rounded-lg bg-black text-white dark:bg-white dark:text-black font-medium hover:opacity-90 transition"
        >
          {mode === "create" ? "Crear Post" : "Guardar cambios"}
        </button>
      </form>
    </div>
  );
}
