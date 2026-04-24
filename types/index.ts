export type LayoutType =
  | "card"
  | "image-first"
  | "magazine"
  | "carousel";

export interface Style {
  id?: string; // 👈 mejor opcional
  name: string;
  bg_color?: string | null;
  text_color?: string | null;
  font_family?: string | null;
  layout: LayoutType;
  client_id?: string | null;
}
export interface PostMedia {
  id: string;
  type: "image" | "video";
  url: string | null;
  external_url: string | null;
  sort_order: number;
}

export interface Brand {
  id: string;
  client_id: string;
  name: string;
  title?: string | null;
  description?: string | null;
  tagline?: string | null;
  category?: string | null;
}

export interface Post {
  id: string;
  title: string;
  description?: string | null;
  category?: string | null;
  created_at: string;

  client_id?: string | null;
  style_id?: string | null;

  style?: Style | null;
  post_media?: PostMedia[];
}



