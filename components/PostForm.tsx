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

  mode: "create" | "edit"; // 🔥 clave
  post?: Post; // 🔥 solo para edit

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

  // 🔥 estados iniciales dinámicos
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

      // 🆕 CREATE
      if (mode === "create") {
        currentPost = await postsService.create({
          title,
          description,
          category,
          style_id: styleId,
          client_id: clientId,
        });
      }

      // ✏️ UPDATE
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

      // 📷 imagen
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

      // 🎥 video
      if (externalUrl) {
        await postMediaService.create({
          post_id: currentPost.id,
          type: "video",
          url: null,
          external_url: externalUrl,
          sort_order: 0,
        });
      }

      // 🔥 comportamiento según modo
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
    <div className="space-y-6">
      {/* 🎨 STYLE */}
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
        <h2 className="text-xl font-bold">
          {title || "Título preview"}
        </h2>
        <p>{description || "Descripción preview..."}</p>
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

        <input
          type="file"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
        />

        <input
          placeholder="Enlace de video"
          value={externalUrl}
          onChange={(e) => setExternalUrl(e.target.value)}
          className="border p-2 w-full"
        />

        <button className="bg-black text-white px-4 py-2 rounded">
          {mode === "create" ? "Crear Post" : "Guardar cambios"}
        </button>
      </form>
    </div>
  );
}
