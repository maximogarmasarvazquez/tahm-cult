import { Post } from "@/types";

export default function CarouselPost({ post }: { post: Post }) {
  const media = post.post_media ?? [];
  const style = post.style;

  return (
    <div
      className="p-4 rounded-2xl"
      style={{
        backgroundColor: style?.bg_color || "#18181b",
        color: style?.text_color || "#fff",
        fontFamily: style?.font_family || "inherit",
      }}
    >
      <div className="flex gap-4 overflow-x-auto">
        {media.map((img) =>
          img.url ? (
            <img
              key={img.id}
              src={img.url}
              className="w-64 h-40 object-cover rounded-lg"
            />
          ) : null
        )}
      </div>
    </div>
  );
}
