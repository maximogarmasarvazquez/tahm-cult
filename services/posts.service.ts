import { supabase } from "@/lib/supabase";
import { Post } from "@/types";

export const postsService = {
  // Obtener todos los posts, opcionalmente filtrando por cliente
  getAll: async (clientId?: string): Promise<Post[]> => {
    let query = supabase
      .from("posts")
      .select(`
        *,
        styles(*),
        post_media(*)
      `)
      .order("created_at", { ascending: false });

    if (clientId) {
      query = query.eq("client_id", clientId);
    }

    const { data, error } = await query;

    if (error) {
      throw new Error(error.message);
    }

    return data as Post[];
  },

  // Crear un post
  create: async (post: Partial<Post>): Promise<Post> => {
    const { data, error } = await supabase
      .from("posts")
      .insert(post)
      .select()
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return data as Post;
  },

  // Actualizar un post
  update: async (id: string, post: Partial<Post>): Promise<Post> => {
    const { data, error } = await supabase
      .from("posts")
      .update(post)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return data as Post;
  },

  // Eliminar un post
  delete: async (id: string): Promise<void> => {
    const { error } = await supabase
      .from("posts")
      .delete()
      .eq("id", id);

    if (error) {
      throw new Error(error.message);
    }
  },
};
