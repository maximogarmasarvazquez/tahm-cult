import { Post } from "@/types";

export default function CardPost({ post }: { post: Post }) {
  const media = post.post_media ?? [];
  const first = media[0];
  const style = post.style;

  return (
    <div
      className="group rounded-3xl overflow-hidden shadow-xl transition-all duration-300 hover:scale-[1.02]"
      style={{
        backgroundColor: style?.bg_color || "#18181b",
        color: style?.text_color || "#fff",
        fontFamily: style?.font_family || "inherit",
      }}
    >
      {/* 🖼 IMAGEN GRANDE */}
      <div className="relative w-full h-[420px] overflow-hidden">
        {first?.url ? (
          <img
            src={first.url}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="h-full flex items-center justify-center opacity-40">
            Sin imagen
          </div>
        )}

        {/* 🔥 GRADIENT OVERLAY */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
      </div>

      {/* 📝 CONTENIDO */}
      <div className="p-6 space-y-3">
        <h2 className="text-2xl font-bold leading-tight">
          {post.title}
        </h2>

        {post.description && (
          <p className="text-sm opacity-80 leading-relaxed max-w-xl">
            {post.description}
          </p>
        )}
      </div>
    </div>
  );
}
