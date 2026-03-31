import { supabase } from "@/lib/supabase";

export const stylesService = {
  getAllByClient: async (clientId: string) => {
    const { data, error } = await supabase
      .from("styles")
      .select("*")
      .eq("client_id", clientId);

    if (error) {
      console.error("ERROR STYLES:", error);
      return [];
    }

    return data;
  },
};