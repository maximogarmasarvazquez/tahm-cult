export interface Style {
  id: string;
  name: string;
  bg_color?: string | null;
  text_color?: string | null;
  font_family?: string | null;
  layout?: string | null;
  client_id?: string | null;
}

export interface PostMedia {
  id: string;
  type: "image" | "video";
  url: string | null;
  external_url: string | null;
  sort_order: number;
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
