import { Post } from "@/types";

export default function ImageFirstPost({ post }: { post: Post }) {
  const style = post.style;
  const image = post.post_media?.[0]?.url;

  return (
    <div
      className="relative h-[500px] rounded-3xl overflow-hidden shadow-2xl group"
      style={{
        fontFamily: style?.font_family || "inherit",
        color: style?.text_color || "#fff",
      }}
    >
      {/* 🖼️ IMAGE FULL */}
      {image ? (
        <img
          src={image}
          alt={post.title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center bg-zinc-800 text-sm opacity-50">
          Sin imagen
        </div>
      )}

      {/* 🌑 OVERLAY FUERTE */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

      {/* 📝 CONTENIDO */}
      <div className="absolute bottom-0 p-8 z-10 max-w-xl space-y-3">
        <h2 className="text-3xl md:text-4xl font-bold leading-tight">
          {post.title}
        </h2>

        {post.description && (
          <p className="text-sm md:text-base opacity-80 leading-relaxed">
            {post.description}
          </p>
        )}

        {/* detalle */}
        <div className="text-xs uppercase tracking-widest opacity-60 pt-2">
          {style?.name || "Visual"}
        </div>
      </div>
    </div>
  );
}
