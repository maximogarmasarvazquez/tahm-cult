"use client";

import { useState } from "react";
import { Post, Style } from "@/types";
import { postsService } from "@/services/posts.service";
import PostCard from "./PostCard";
import PostForm from "./PostForm";

interface Props {
  initialPosts: Post[];
  clientId?: string;
  styles: Style[];
}

export default function PostsList({ initialPosts, clientId, styles }: Props) {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [editingPost, setEditingPost] = useState<Post | null>(null);

  if (!clientId) {
    return <p>Error: clientId requerido</p>;
  }

  // DELETE
  const handleDelete = async (id: string) => {
    if (!confirm("¿Eliminar este post?")) return;

    try {
      await postsService.delete(id);
      setPosts((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      console.error(err);
      alert("Error al borrar");
    }
  };

  // EDIT CLICK
  const handleEdit = (post: Post) => {
    setEditingPost(post);
  };

  // UPDATE
  const handleUpdated = (updatedPost: Post) => {
    setPosts((prev) =>
      prev.map((p) => (p.id === updatedPost.id ? updatedPost : p))
    );
  };

  return (
    <div className="space-y-6">

      {/* EDIT FORM */}
      {editingPost && (
        <PostForm
          mode="edit"
          post={editingPost}
          styles={styles}
          clientId={clientId}
          onUpdated={handleUpdated}
          onClose={() => setEditingPost(null)}
        />
      )}

      {/* LIST */}
      <div className="grid gap-4">
        {posts.length === 0 ? (
          <p>No hay posts</p>
        ) : (
          posts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              onDelete={handleDelete}
              onEdit={handleEdit}
            />
          ))
        )}
      </div>
    </div>
  );
}
