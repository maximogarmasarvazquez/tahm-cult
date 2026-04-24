"use client";

import { useState } from "react";
import { Post, Style } from "@/types";
import { postsService } from "@/services/posts.service";
import PostRenderer from "./posts/PostRenderer";
import PostForm from "./form/PostForm";

interface Props {
  initialPosts: Post[];
  clientId?: string;
  styles: Style[];
}

export default function PostsList({
  initialPosts,
  clientId,
  styles,
}: Props) {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [loadingId, setLoadingId] = useState<string | null>(null);

  if (!clientId) {
    return (
      <p className="text-center text-red-500">
        Error: clientId requerido
      </p>
    );
  }

  // 🗑 DELETE
  const handleDelete = async (id: string) => {
    if (!confirm("¿Eliminar este post?")) return;

    try {
      setLoadingId(id);
      await postsService.delete(id);
      setPosts((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      console.error(err);
      alert("Error al borrar");
    } finally {
      setLoadingId(null);
    }
  };

  // ✏️ EDIT
  const handleEdit = (post: Post) => {
    setEditingPost(post);
  };

  // 🔄 UPDATE
  const handleUpdated = (updatedPost: Post) => {
    setPosts((prev) =>
      prev.map((p) =>
        p.id === updatedPost.id ? updatedPost : p
      )
    );
  };

  return (
    <div className="space-y-8">

      {/* ✏️ EDIT PANEL */}
      {editingPost && (
        <div className="p-4 border rounded-2xl bg-zinc-50 dark:bg-zinc-900">
          <PostForm
            mode="edit"
            post={editingPost}
            styles={styles}
            clientId={clientId}
            onUpdated={handleUpdated}
            onClose={() => setEditingPost(null)}
          />
        </div>
      )}

      {/* 📦 LIST */}
      {posts.length === 0 ? (
        <div className="text-center py-10 text-gray-500">
          No hay posts todavía
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2">
          {posts.map((post) => (
            <div
              key={post.id}
              className={`relative group ${
                loadingId === post.id
                  ? "opacity-50 pointer-events-none"
                  : ""
              }`}
            >
              {/* 🎨 RENDER DINÁMICO */}
              <PostRenderer post={post} />

              {/* 🔥 ACTIONS (hover) */}
              <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition flex gap-2">
                <button
                  onClick={() => handleEdit(post)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-lg text-xs shadow"
                >
                  Editar
                </button>

                <button
                  onClick={() => handleDelete(post.id)}
                  className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-lg text-xs shadow"
                >
                  Borrar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
