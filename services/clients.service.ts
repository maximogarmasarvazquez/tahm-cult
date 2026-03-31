import { supabase } from "@/lib/supabase";

export const clientsService = {
  create: async (data: { name: string; slug: string }) => {
    const { data: result, error } = await supabase
      .from("clients")
      .insert([data])
      .select()
      .single();
    if (error) throw error;
    return result;
  },

  getAll: async () => {
    const { data, error } = await supabase.from("clients").select("*");
    if (error) throw error;
    return data;
  },

  getById: async (id: string) => {
    const { data, error } = await supabase
      .from("clients")
      .select("*")
      .eq("id", id)
      .single();
    if (error) throw error;
    return data;
  },

  getBySlug: async (slug: string) => {
    const { data, error } = await supabase
      .from("clients")
      .select("*")
      .eq("slug", slug)
      .single();
    if (error) throw error;
    return data;
  },

  update: async (id: string, data: Partial<{ name: string; slug: string }>) => {
    const { data: result, error } = await supabase
      .from("clients")
      .update(data)
      .eq("id", id)
      .select()
      .single();
    if (error) throw error;
    return result;
  },

  delete: async (id: string) => {
    const { data, error } = await supabase
      .from("clients")
      .delete()
      .eq("id", id)
      .select()
      .single();
    if (error) throw error;
    return data;
  },
};
