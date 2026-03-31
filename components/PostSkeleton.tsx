export default function PostSkeleton() {
  return (
    <div className="w-full max-w-2xl mx-auto animate-pulse rounded-2xl overflow-hidden border border-gray-700 shadow-md bg-[#111]">
      
      {/* 🖼️ Imagen fake */}
      <div className="w-full h-56 bg-gray-700" />

      {/* 🧾 Contenido */}
      <div className="p-4 space-y-3">
        <div className="h-5 bg-gray-600 rounded w-3/4" />
        <div className="h-4 bg-gray-600 rounded w-full" />
        <div className="h-4 bg-gray-600 rounded w-2/3" />
      </div>

    </div>
  );
}