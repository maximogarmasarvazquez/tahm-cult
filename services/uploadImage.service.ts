import { supabase } from "@/lib/supabase";

export const uploadImage = async (file: File) => {
  try {
    const fileName = `${Date.now()}-${file.name}`;

    // 🔥 SUBIR ARCHIVO
    const { error } = await supabase.storage
      .from("posts") // 👈 ESTE NOMBRE TIENE QUE EXISTIR EN SUPABASE
      .upload(fileName, file);

    if (error) {
      console.error("Error subiendo imagen:", error);
      return null;
    }

    // 🔥 OBTENER URL PÚBLICA
    const { data } = supabase.storage
      .from("posts")
      .getPublicUrl(fileName);

    return data.publicUrl;
  } catch (err) {
    console.error("Upload error:", err);
    return null;
  }
};
