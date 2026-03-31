"use client";

import { useEffect, useState } from "react";
import { postsService } from "@/services/posts.service";
import PostCard from "./PostCard";
import { Post } from "@/types";

interface Props {
  clientId?: string;
}

export default function PostsList({ clientId }: Props) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await postsService.getAll(clientId);
        setPosts(data);
      } catch (err) {
        console.error("Error al obtener posts:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [clientId]);

  if (loading) return <p>Cargando posts...</p>;
  if (posts.length === 0) return <p>No hay posts aún 🚀</p>;

  return (
    <div className="space-y-6">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}
