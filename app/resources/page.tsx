import { getAllPosts } from "@/lib/cms";
import { getSiteContent } from "@/lib/site-content";
import ResourcesPageClient from "./ResourcesPageClient";

export const revalidate = 60;

export default async function ResourcesPage() {
  const [posts, site] = await Promise.all([getAllPosts("published"), getSiteContent()]);
  return <ResourcesPageClient posts={posts} copy={site.resourcesPage} />;
}
