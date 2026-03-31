"use client";

import { Post } from "@/types";
import { Trash2, Pencil } from "lucide-react";

type Props = {
  post: Post;
  onDelete?: (id: string) => void;
  onEdit?: (post: Post) => void;
};

export default function PostCard({ post, onDelete, onEdit }: Props) {
  const style = post.style;
  const media = post.post_media?.[0];

  const handleDelete = () => {
    if (!confirm("¿Eliminar este post?")) return;
    onDelete?.(post.id);
  };

  return (
    <div
      className="relative rounded-2xl overflow-hidden shadow-md border transition hover:scale-[1.02]"
      style={{
        backgroundColor: style?.bg_color || "#fff",
        color: style?.text_color || "#000",
        fontFamily: style?.font_family || "inherit",
      }}
    >
      {/* 🔥 ACTIONS */}
      <div className="absolute top-2 right-2 flex gap-2 z-10">
        <button
          onClick={() => onEdit?.(post)}
          className="bg-black/60 hover:bg-blue-600 text-white p-2 rounded-full"
        >
          <Pencil size={18} />
        </button>

        <button
          onClick={handleDelete}
          className="bg-black/60 hover:bg-red-600 text-white p-2 rounded-full"
        >
          <Trash2 size={18} />
        </button>
      </div>

      {/* 🖼️ IMAGE */}
      {media?.type === "image" && media?.url && (
        <img
          src={media.url}
          alt={post.title}
          className="w-full h-56 object-cover"
        />
      )}

      {/* 🎥 VIDEO */}
      {media?.type === "video" && media?.external_url && (
        <iframe
          className="w-full h-56"
          src={media.external_url}
          title={post.title}
        />
      )}

      {/* CONTENT */}
      <div className="p-4 space-y-2">
        <h2 className="text-xl font-bold">{post.title}</h2>

        {post.description && (
          <p className="text-sm opacity-80">{post.description}</p>
        )}
      </div>
    </div>
  );
}
