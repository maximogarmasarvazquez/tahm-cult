import { postsService } from "@/services/posts.service";
import { stylesService } from "@/services/styles.service";

interface Props {
  params: Promise<{
    clientId: string;
  }>;
}

export default async function ClientPage({ params }: Props) {
  const { clientId } = await params;

  const posts = await postsService.getAll(clientId);
  const styles = await stylesService.getAllByClient(clientId);

  return (
    <main className="min-h-screen p-6 space-y-6">
      <h1 className="text-3xl font-bold">Galería</h1>

      <div className="grid gap-6">
        {posts.map((post) => {
          const style = styles.find((s) => s.id === post.style_id);

          return (
            <div
              key={post.id}
              className="p-6 rounded-xl shadow"
              style={{
                backgroundColor: style?.bg_color || "#fff",
                color: style?.text_color || "#000",
                fontFamily: style?.font_family || "inherit",
              }}
            >
              <h2 className="text-xl font-bold">{post.title}</h2>
              <p>{post.description}</p>
            </div>
          );
        })}
      </div>
    </main>
  );
}
