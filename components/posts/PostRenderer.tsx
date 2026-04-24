import { Post } from "@/types";

import CardPost from "./layouts/CardPost";
import ImageFirstPost from "./layouts/ImageFirstPost";
import MagazinePost from "./layouts/MagazinePost";
import CarouselPost from "./layouts/CarouselPost";

export default function PostRenderer({ post }: { post: Post }) {
  const layout = post.style?.layout;

  switch (layout) {
    case "image-first":
      return <ImageFirstPost post={post} />;

    case "magazine":
      return <MagazinePost post={post} />;

    case "carousel":
      return <CarouselPost post={post} />;

    default:
      return <CardPost post={post} />;
  }
}
