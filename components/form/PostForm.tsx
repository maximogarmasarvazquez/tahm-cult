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

  const isImageLayout =
    selectedStyle?.layout === "card" ||
    selectedStyle?.layout === "image-first" ||
    selectedStyle?.layout === "magazine";

  const isCarousel = selectedStyle?.layout === "carousel";

  // 🎨 contraste automático
  const getContrastColor = (bg: string) => {
    if (!bg) return "#000";

    const color = bg.replace("#", "");
    const r = parseInt(color.substring(0, 2), 16);
    const g = parseInt(color.substring(2, 4), 16);
    const b = parseInt(color.substring(4, 6), 16);

    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness > 125 ? "#000" : "#fff";
  };

  const bg = selectedStyle?.bg_color || "#1e293b"; // 🔥 default oscuro
  const text = selectedStyle?.text_color || getContrastColor(bg);

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

      if (file && isImageLayout) {
        const imageUrl = await uploadImage(file);

        await postMediaService.create({
          post_id: currentPost.id,
          type: "image",
          url: imageUrl,
          external_url: null,
          sort_order: 0,
        });
      }

      if (externalUrl && !isCarousel) {
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
    <div className="max-w-2xl mx-auto space-y-6 p-6 bg-white rounded-2xl shadow-xl border">

      <h1 className="text-2xl font-bold text-gray-800">
        {mode === "create" ? "Crear Post" : "Editar Post"}
      </h1>

      {/* SELECT */}
      <select
        value={styleId ?? ""}
        onChange={(e) => setStyleId(e.target.value)}
        className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
      >
        <option value="">Seleccionar estilo</option>
        {styles.map((style) => (
          <option key={style.id} value={style.id}>
            {style.name} ({style.layout})
          </option>
        ))}
      </select>

      {/* PREVIEW */}
      {selectedStyle && (
        <div
          className="p-6 rounded-xl shadow-lg transition-all"
          style={{
            backgroundColor: bg,
            color: text,
            fontFamily: selectedStyle.font_family || "sans-serif",
          }}
        >
          <h2 className="text-xl font-bold mb-2">
            {title || "Preview título"}
          </h2>

          <p className="opacity-80">
            {description || "Preview descripción..."}
          </p>

          <div className="mt-3 text-xs opacity-60">
            Layout: {selectedStyle.layout}
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Título"
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
        />

        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Descripción"
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
        />

        <input
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Categoría"
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
        />

        {isImageLayout && (
          <input
            type="file"
            className="w-full p-2 border rounded"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
          />
        )}

        {!isCarousel && (
          <input
            value={externalUrl}
            onChange={(e) => setExternalUrl(e.target.value)}
            placeholder="Video URL"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />
        )}

        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg transition">
          {mode === "create" ? "Crear" : "Guardar"}
        </button>
      </form>
    </div>
  );
}