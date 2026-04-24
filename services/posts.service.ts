import { supabase } from "@/lib/supabase";
import { Post } from "@/types";

export const postsService = {
  getAll: async (clientId?: string): Promise<Post[]> => {
    let query = supabase
      .from("posts")
      .select(`
        *,
        style:styles(*),
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

    // 🔥 SOLO ESTO FALTABA
    return (data ?? []).map((post) => ({
      ...post,
      style: post.style
        ? {
            id: post.style.id,
            name: post.style.name,
            bg_color: post.style.bg_color,
            text_color: post.style.text_color,
            font_family: post.style.font_family,
            layout: post.style.layout,
          }
        : null,
    }));
  },

  create: async (post: Partial<Post>): Promise<Post> => {
    const { data, error } = await supabase
      .from("posts")
      .insert(post)
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data as Post;
  },

  update: async (id: string, post: Partial<Post>): Promise<Post> => {
    const { data, error } = await supabase
      .from("posts")
      .update(post)
      .eq("id", id)
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data as Post;
  },

  delete: async (id: string): Promise<void> => {
    await supabase.from("post_media").delete().eq("post_id", id);
    await supabase.from("posts").delete().eq("id", id);
  },
};
