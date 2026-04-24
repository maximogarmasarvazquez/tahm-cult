import { supabase } from "@/lib/supabase";
import { Brand } from "@/types";

export const brandsService = {
  // 🔹 GET (1 por cliente)
  getByClient: async (clientId: string): Promise<Brand | null> => {
    const { data, error } = await supabase
      .from("brands")
      .select("*")
      .eq("client_id", clientId)
      .single();

    if (error) {
      console.error("ERROR BRAND:", error);
      return null;
    }

    return data;
  },

  // 🔹 CREATE
  create: async (brand: Partial<Brand>): Promise<Brand> => {
    const { data, error } = await supabase
      .from("brands")
      .insert([brand])
      .select()
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return data;
  },

  // 🔹 UPDATE
  update: async (
    id: string,
    updates: Partial<Brand>
  ): Promise<Brand> => {
    const { data, error } = await supabase
      .from("brands")
      .update(updates)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return data;
  },

  // 🔹 UPSERT (🔥 clave para tu caso)
  upsertByClient: async (
    clientId: string,
    values: Partial<Brand>
  ): Promise<Brand> => {
    const { data, error } = await supabase
      .from("brands")
      .upsert(
        {
          ...values,
          client_id: clientId,
        },
        {
          onConflict: "client_id", // 👈 usa tu UNIQUE
        }
      )
      .select()
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return data;
  },

  // 🔹 DELETE (opcional)
  delete: async (id: string) => {
    const { error } = await supabase
      .from("brands")
      .delete()
      .eq("id", id);

    if (error) {
      throw new Error(error.message);
    }
  },
};
