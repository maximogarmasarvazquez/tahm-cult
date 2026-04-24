"use client";

import { useState } from "react";
import PostForm from "@/components/form/PostForm";
import StyleForm from "@/components/form/StyleForm";
import { Style } from "@/types";

interface Props {
  styles: Style[];
  clientId: string;
}

export default function CreatorPanel({ styles, clientId }: Props) {
  const [tab, setTab] = useState<"post" | "style">("post");

  return (
    <div className="bg-zinc-900 p-6 rounded-2xl shadow-lg border border-zinc-800 space-y-6">
      
      {/* TABS */}
      <div className="flex gap-2 bg-zinc-800 p-1 rounded-xl">
        <button
          onClick={() => setTab("post")}
          className={`flex-1 py-2 rounded-lg text-sm transition ${
            tab === "post"
              ? "bg-blue-600 text-white"
              : "text-zinc-400 hover:text-white"
          }`}
        >
          Crear Post
        </button>

        <button
          onClick={() => setTab("style")}
          className={`flex-1 py-2 rounded-lg text-sm transition ${
            tab === "style"
              ? "bg-purple-600 text-white"
              : "text-zinc-400 hover:text-white"
          }`}
        >
          Crear Estilo
        </button>
      </div>

      {/* CONTENT */}
      {tab === "post" && (
        <PostForm
          mode="create"
          styles={styles}
          clientId={clientId}
        />
      )}

      {tab === "style" && (
        <StyleForm
          mode="create"
          clientId={clientId}
        />
      )}
    </div>
  );
}
