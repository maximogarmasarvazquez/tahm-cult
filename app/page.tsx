import { Suspense } from "react";
import { stylesService } from "@/services/styles.service";
import PostForm from "@/components/PostForm";
import PostsList from "@/components/PostList";
import PostSkeleton from "@/components/PostSkeleton";

export default async function Page() {
  const clientId = "f613387e-46f6-4ccc-92ee-faf5020e07aa";

  const styles = await stylesService.getAllByClient(clientId);

  return (
    <main className="max-w-2xl mx-auto py-10 space-y-10">

      {/* 🧾 FORM */}
      <PostForm styles={styles} clientId={clientId} />

      {/* 📰 POSTS */}
      <Suspense
        fallback={
          <div className="space-y-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <PostSkeleton key={i} />
            ))}
          </div>
        }
      >
        <PostsList clientId={clientId} />
      </Suspense>

    </main>
  );
}
