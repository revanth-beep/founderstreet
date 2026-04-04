import { notFound } from "next/navigation";
import { getPostBySlug } from "@/lib/cms";
import EditPostForm from "./EditPostForm";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function EditPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();
  return <EditPostForm post={post} />;
}
