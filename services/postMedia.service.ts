// services/postMedia.ts
import { supabase } from "@/lib/supabase";

export interface PostMediaCreate {
  post_id: string;
  type: "image" | "video";
  url?: string | null;          // URL de imagen en Supabase
  external_url?: string | null; // URL de video externo (YouTube, etc)
  sort_order?: number;
}

export const postMediaService = {
  // 🔹 Crear media (imagen o video)
  create: async (data: PostMediaCreate) => {
    if (data.type === "image" && data.url) {
      // insert en la tabla post_media
      const { error } = await supabase.from("post_media").insert([
        {
          post_id: data.post_id,
          type: "image",
          url: data.url,
          external_url: null,
          sort_order: data.sort_order || 0,
        },
      ]);

      if (error) throw error;

    } else if (data.type === "video" && data.external_url) {
      const { error } = await supabase.from("post_media").insert([
        {
          post_id: data.post_id,
          type: "video",
          url: null,
          external_url: data.external_url,
          sort_order: data.sort_order || 0,
        },
      ]);

      if (error) throw error;

    } else {
      throw new Error(
        "Debe proporcionar url para imagen o external_url para video"
      );
    }
  },

  // 🔹 Obtener todos los medias de un post
  getByPostId: async (post_id: string) => {
    const { data, error } = await supabase
      .from("post_media")
      .select("*")
      .eq("post_id", post_id)
      .order("sort_order", { ascending: true });

    if (error) throw error;
    return data;
  },

  // 🔹 Borrar media
  delete: async (id: string) => {
    const { error } = await supabase.from("post_media").delete().eq("id", id);
    if (error) throw error;
  },
};
