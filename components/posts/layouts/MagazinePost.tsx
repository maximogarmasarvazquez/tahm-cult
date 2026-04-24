import { Post } from "@/types";

export default function MagazinePost({ post }: { post: Post }) {
  const image = post.post_media?.[0]?.url;

  return (
    <div className="relative h-[600px] w-full overflow-hidden shadow-2xl group">
      
      {/* 🖼️ IMAGEN FULL */}
      {image && (
        <img
          src={image}
          alt={post.title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      )}

      {/* 🎨 OVERLAY SUAVE */}
      <div className="absolute inset-0 bg-black/30" />

      {/* 🧠 CONTENIDO */}
      <div className="relative z-10 h-full flex flex-col justify-between p-8">
        
        {/* 🏷️ TOP (tipo categoría / marca) */}
        <div className="text-xs uppercase tracking-widest opacity-70">
          {post.category || "Editorial"}
        </div>

        {/* 🧱 TITULO GRANDE */}
        <div className="max-w-2xl">
          <h2 className="text-4xl md:text-6xl font-extrabold leading-tight">
            {post.title}
          </h2>

          {post.description && (
            <p className="mt-4 text-sm md:text-base opacity-80">
              {post.description}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
