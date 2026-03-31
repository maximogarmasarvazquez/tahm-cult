import { Post } from "@/types";

export default function PostCard({ post }: { post: Post }) {
  const style = post.style; // 🔥 ahora es uno solo
  const media = post.post_media?.[0]; // 🔥 el primer media (imagen o video)

  return (
    <div
      className="rounded-2xl overflow-hidden shadow-md border transition hover:scale-[1.02]"
      style={{
        backgroundColor: style?.bg_color || "#fff",
        color: style?.text_color || "#000",
        fontFamily: style?.font_family || "inherit",
      }}
    >
      {/* 🖼️ / 🎬 MEDIA */}
      {media && media.type === "image" && media.url && (
        <img
          src={media.url}
          alt={post.title}
          className="w-full h-56 object-cover"
        />
      )}
      {media && media.type === "video" && media.external_url && (
        <div className="w-full h-56">
          <iframe
            width="100%"
            height="100%"
            src={media.external_url}
            title={post.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      )}

      {/* 🧾 CONTENT */}
      <div className="p-4 space-y-2">
        <h2 className="text-xl font-bold">{post.title}</h2>
        {post.description && (
          <p className="text-sm opacity-80">{post.description}</p>
        )}
        {post.category && (
          <span className="text-xs opacity-60">{post.category}</span>
        )}
      </div>
    </div>
  );
}
