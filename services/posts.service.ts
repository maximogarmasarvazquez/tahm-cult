import { supabase } from "@/lib/supabase";
import { Post } from "@/types";

export const postsService = {
  // ✅ Obtener todos los posts
  getAll: async (clientId?: string): Promise<Post[]> => {
    let query = supabase
      .from("posts")
      .select(`
        *,
        style:styles(*),
        post_media(*)
      `)
      .order("created_at", { ascending: false }); // ✅ FIX

    if (clientId) {
      query = query.eq("client_id", clientId);
    }

    const { data, error } = await query;

    if (error) {
      throw new Error(error.message);
    }

    return data as Post[];
  },

  // ✅ Crear post
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

  // ✅ Actualizar post
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

  // ✅ Eliminar post + media
  delete: async (id: string): Promise<void> => {
    // 🔥 borrar media primero
    const { error: mediaError } = await supabase
      .from("post_media")
      .delete()
      .eq("post_id", id);

    if (mediaError) {
      throw new Error(mediaError.message);
    }

    // 🔥 borrar post
    const { error } = await supabase
      .from("posts")
      .delete()
      .eq("id", id);

    if (error) {
      throw new Error(error.message);
    }
  },
};
