import Link from "next/link";
import { brandsService } from "@/services/brands.service";
import { postsService } from "@/services/posts.service";
import PostsList from "@/components/PostList";

export default async function Home() {
  const clientId = "f613387e-46f6-4ccc-92ee-faf5020e07aa";

  const brand = await brandsService.getByClient(clientId);
  const posts = await postsService.getAll(clientId);

  return (
    <main className="min-h-screen bg-zinc-950 text-white">

      {/* 🟣 HERO */}
      <section className="relative px-10 py-24 overflow-hidden">
        
        {/* 🔥 FUTURA IMAGEN DE FONDO */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-zinc-950 z-10" />

        {/* CONTENIDO */}
        <div className="relative z-20 max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">

          {/* TEXTO */}
          <div className="space-y-6">

            <h1 className="text-5xl md:text-6xl font-bold leading-tight">
              {brand?.title || "Tu marca"}
            </h1>

            <p className="text-lg text-zinc-300 max-w-xl">
              {brand?.description || "Acá podés contar qué hacés, tu estilo, tu identidad. Este texto es clave para generar impacto."}
            </p>

            <p className="text-sm text-zinc-500 uppercase tracking-widest">
              {brand?.category}
            </p>

            {/* CTA */}
            <div className="flex gap-4 pt-4">
              <Link
                href={`/${clientId}`}
                className="bg-blue-600 hover:bg-blue-700 px-5 py-3 rounded-lg font-medium"
              >
                Ver trabajos
              </Link>

              <Link
                href="/admin"
                className="bg-zinc-800 hover:bg-zinc-700 px-5 py-3 rounded-lg"
              >
                Admin
              </Link>
            </div>
          </div>

          {/* ESPACIO PARA IMAGEN / VISUAL */}
          <div className="hidden md:block">
            <div className="w-full h-[400px] bg-zinc-800 rounded-2xl border border-zinc-700 flex items-center justify-center text-zinc-500">
              Imagen / arte
            </div>
          </div>

        </div>
      </section>

      {/* 🟣 POSTS */}
      <section className="px-10 py-16 max-w-6xl mx-auto space-y-10">
        
        <h2 className="text-2xl font-semibold">
          Publicaciones
        </h2>

        <PostsList
          initialPosts={posts}
          clientId={clientId}
          styles={[]} // después podés pasar styles si querés
        />
      </section>

    </main>
  );
}
