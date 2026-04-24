import { Suspense } from "react";
import { stylesService } from "@/services/styles.service";
import { postsService } from "@/services/posts.service";
import { brandsService } from "@/services/brands.service";
import PostsList from "@/components/PostList";
import PostSkeleton from "@/components/PostSkeleton";
import CreatorPanel from "@/components/CreatorPanel";
import BrandForm from "@/components/form/BrandForm";

export default async function Page() {
  const clientId = "f613387e-46f6-4ccc-92ee-faf5020e07aa";

  const styles = await stylesService.getAllByClient(clientId);
  const posts = await postsService.getAll(clientId);
  const brand = await brandsService.getByClient(clientId);

  return (
    <main className="min-h-screen bg-zinc-950 px-6 py-10 space-y-10">
      
      <div className="max-w-7xl mx-auto space-y-10">

        {/* 🏠 HOME CONFIG */}
        <div className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800 shadow-lg">
          <BrandForm clientId={clientId} brand={brand} />
        </div>

        {/* GRID */}
        <div className="grid lg:grid-cols-3 gap-10">

          {/* FORM POSTS */}
          <div className="lg:col-span-1 bg-zinc-600 p-6 rounded-2xl shadow-lg h-fit border border-zinc-800">
            <h2 className="text-xl font-semibold mb-6 text-white">
              Crear publicación
            </h2>

            <CreatorPanel styles={styles} clientId={clientId} />
          </div>

          {/* POSTS */}
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-xl font-semibold text-white">
              Tus publicaciones
            </h2>

            <Suspense
              fallback={
                <div className="grid gap-6 sm:grid-cols-2">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <PostSkeleton key={i} />
                  ))}
                </div>
              }
            >
              <PostsList
                initialPosts={posts}
                clientId={clientId}
                styles={styles}
              />
            </Suspense>
          </div>

        </div>
      </div>
    </main>
  );
}
