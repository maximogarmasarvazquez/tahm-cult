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
      className="group relative rounded-2xl overflow-hidden border shadow-sm hover:shadow-xl transition-all duration-300"
      style={{
        backgroundColor: style?.bg_color || "#fff",
        color: style?.text_color || "#000",
        fontFamily: style?.font_family || "inherit",
      }}
    >
      {/* 🖼️ MEDIA */}
      {media?.type === "image" && media?.url && (
        <img
          src={media.url}
          alt={post.title}
          className="w-full h-56 object-cover"
        />
      )}

      {media?.type === "video" && media?.external_url && (
        <iframe
          className="w-full h-56"
          src={media.external_url}
          title={post.title}
          allowFullScreen
        />
      )}

      {!media && (
        <div className="w-full h-56 flex items-center justify-center text-sm opacity-50">
          Sin contenido multimedia
        </div>
      )}

      {/* 🔥 ACTIONS (hover) */}
      <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition">
        <button
          onClick={() => onEdit?.(post)}
          className="p-2 rounded-full bg-black/70 hover:bg-blue-600 text-white"
        >
          <Pencil size={16} />
        </button>

        <button
          onClick={handleDelete}
          className="p-2 rounded-full bg-black/70 hover:bg-red-600 text-white"
        >
          <Trash2 size={16} />
        </button>
      </div>

      {/* CONTENT */}
      <div className="p-4 space-y-2">
        <h2 className="text-lg font-semibold leading-tight">
          {post.title}
        </h2>

        {post.description && (
          <p className="text-sm opacity-80 line-clamp-3">
            {post.description}
          </p>
        )}
      </div>
    </div>
  );
}
