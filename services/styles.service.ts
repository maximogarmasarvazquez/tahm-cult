import { supabase } from "@/lib/supabase";
import { Style } from "@/types";

export const stylesService = {
  // ✅ Obtener todos los estilos de un cliente
  getAllByClient: async (clientId: string) => {
    const { data, error } = await supabase
      .from("styles")
      .select("*")
      .eq("client_id", clientId)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("ERROR GET STYLES:", error);
      return [];
    }

    return data;
  },

  // ✅ Crear un estilo
  create: async (style: Partial<Style>) => {
    const { data, error } = await supabase
      .from("styles")
      .insert([style])
      .select()
      .single();

    if (error) {
      console.error("ERROR CREATE STYLE:", error);
      throw new Error(error.message);
    }

    return data;
  },

  // ✅ Actualizar un estilo
  update: async (id: string, updates: Partial<Style>) => {
    const { data, error } = await supabase
      .from("styles")
      .update(updates)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("ERROR UPDATE STYLE:", error);
      throw new Error(error.message);
    }

    return data;
  },

  // ✅ Eliminar un estilo
  delete: async (id: string) => {
    const { error } = await supabase
      .from("styles")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("ERROR DELETE STYLE:", error);
      throw new Error(error.message);
    }

    return true;
  },
};