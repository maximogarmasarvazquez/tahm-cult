"use client";

import { useState } from "react";
import { Post, Style } from "@/types";
import { postsService } from "@/services/posts.service";
import { postMediaService } from "@/services/postMedia.service";
import { uploadImage } from "@/services/uploadImage.service";

interface Props {
  post: Post;
  styles: Style[];
  onClose: () => void;
  onUpdated: (updatedPost: Post) => void;
}

export default function EditPostForm({
  post,
  styles,
  onClose,
  onUpdated,
}: Props) {
  const [title, setTitle] = useState(post.title);
  const [description, setDescription] = useState(post.description || "");
  const [category, setCategory] = useState(post.category || "");
  const [styleId, setStyleId] = useState<string | null>(
    post.style_id || null
  );
  const [file, setFile] = useState<File | null>(null);
  const [externalUrl, setExternalUrl] = useState("");

  const selectedStyle = styles.find((s) => s.id === styleId);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // 🔥 1. update post
      await postsService.update(post.id, {
        title,
        description,
        category,
        style_id: styleId,
      });

      // 🔥 2. imagen nueva (opcional)
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

      // 🔥 3. video nuevo (opcional)
      if (externalUrl) {
        await postMediaService.create({
          post_id: post.id,
          type: "video",
          url: null,
          external_url: externalUrl,
          sort_order: 0,
        });
      }

      // 🔥 devolver post actualizado al padre
      onUpdated({
        ...post,
        title,
        description,
        category,
        style_id: styleId,
      });

      onClose();
    } catch (err) {
      console.error("Error update:", err);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl w-[400px] space-y-4">
      <h2 className="text-lg font-bold">Editar Post</h2>

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
        className="p-4 border rounded"
        style={{
          backgroundColor: selectedStyle?.bg_color || "#fff",
          color: selectedStyle?.text_color || "#000",
        }}
      >
        <h2 className="font-bold">{title || "Preview título"}</h2>
        <p>{description || "Preview descripción"}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 w-full"
        />

        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border p-2 w-full"
        />

        <input
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border p-2 w-full"
        />

        <input type="file" onChange={(e) => setFile(e.target.files?.[0] || null)} />

        <input
          placeholder="Video URL"
          value={externalUrl}
          onChange={(e) => setExternalUrl(e.target.value)}
          className="border p-2 w-full"
        />

        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-300 px-3 py-1 rounded"
          >
            Cancelar
          </button>

          <button className="bg-blue-600 text-white px-3 py-1 rounded">
            Guardar
          </button>
        </div>
      </form>
    </div>
  );
}
