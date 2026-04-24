import { postsService } from "@/services/posts.service";
import PostRenderer from "@/components/posts/PostRenderer";

interface Props {
  params: Promise<{
    clientId: string;
  }>;
}

export default async function ClientPage({ params }: Props) {
  const { clientId } = await params; // 🔥 FIX

  const posts = await postsService.getAll(clientId);

  return (
    <main className="min-h-screen bg-zinc-950 text-white p-8">
      {/* HEADER */}
      <div className="mb-10">
        <h1 className="text-4xl font-bold">Galería</h1>
        <p className="text-zinc-400 text-sm mt-2">
          Explorá las publicaciones
        </p>
      </div>

      {/* GRID */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.length > 0 ? (
          posts.map((post) => (
            <PostRenderer key={post.id} post={post} />
          ))
        ) : (
          <div className="col-span-full text-center text-zinc-500">
            No hay publicaciones todavía
          </div>
        )}
      </div>
    </main>
  );
}
