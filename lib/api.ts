import { Blog, Category, Tag } from "@/types/blog";
const API_URL = process.env.NEXT_PUBLIC_STRAPI_URL;

if (!API_URL) {
  throw new Error("NEXT_PUBLIC_STRAPI_URL is not defined");
}

const mediaUrl = (file?: { url?: string }) =>
  file?.url ? `${API_URL}${file.url}` : null;

/* ---------------- BLOG LISTING ---------------- */
export async function getBlogs() {
  const res = await fetch(`${API_URL}/api/blogs?populate=*`, {
    cache: "no-store",
  });

  const json = await res.json();

  return json.data.map((item: Blog) => ({
    id: item.id,
    title: item.title,
    slug: item.slug,
    excerpt: item.excerpt,
    date: item.publishedDate,
    thumbnail: item.thumbnail,
    categories: item.categories || [],
  }));
}

/* ---------------- SINGLE BLOG ---------------- */
const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

export async function getBlogBySlug(slug: string) {
  const res = await fetch(
    `${STRAPI_URL}/api/blogs?filters[slug][$eq]=${slug}&populate=*`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch blog");
  }

  const json = await res.json();

  // ✅ IMPORTANT: return the FIRST blog
  return json.data?.[0] ?? null;
}

/* ---------------- RELATED BLOGS ---------------- */
export async function getRelatedBlogs(
  categorySlug: string,
  currentSlug: string
) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/blogs?filters[categories][slug][$eq]=${categorySlug}&filters[slug][$ne]=${currentSlug}&pagination[limit]=4&populate=thumbnail`,
    { cache: "no-store" }
  );

  const json = await res.json();
  return Array.isArray(json?.data) ? json.data : [];
}


/* ---------------- SIDEBAR BLOGS ---------------- */
export async function getSidebarData() {
  /* =======================
     CATEGORIES WITH COUNT
  ======================= */
  const catRes = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/categories?populate=blogs`,
    { cache: "no-store" }
  );
  const catJson = await catRes.json();

  const categories = catJson.data.map((cat: Category & { blogs?: Blog[] }) => ({
    id: cat.id,
    name: cat.name,
    slug: cat.slug,
    blogsCount: cat.blogs?.length || 0,
  }));

  /* =======================
     TAGS WITH COUNT
  ======================= */
  const tagRes = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/tags?populate=blogs`,
    { cache: "no-store" }
  );
  const tagJson = await tagRes.json();

  const tags = tagJson.data.map((tag: Tag & { blogs?: Blog[] }) => ({
    id: tag.id,
    name: tag.name,
    slug: tag.slug,
    blogsCount: tag.blogs?.length || 0,
  }));

  /* =======================
     RECENT POSTS
  ======================= */
  const recentRes = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/blogs?sort=publishedAt:desc&pagination[limit]=5&populate=thumbnail`,
    { cache: "no-store" }
  );
  const recentJson = await recentRes.json();

  const recentPosts = recentJson.data.map((post: Blog) => ({
    id: post.id,
    title: post.title,
    slug: post.slug,
    publishedAt: post.publishedAt,
    thumbnail: post.thumbnail ?? null,
  }));

  return {
    categories,
    tags,
    recentPosts,
  };
}

/* ---------------- CATEGORY PAGE ---------------- */
// lib/api.ts
export async function getBlogsByCategory(slug: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/blogs?populate[]=categories&populate[]=thumbnail`,
    { cache: "no-store" }
  );
  const json = await res.json();

  if (!json?.data) return [];

  // ✅ MANUAL FILTER (THIS WILL WORK)
  const filteredBlogs = json.data.filter((blog: Blog) => {
    return (
      Array.isArray(blog.categories) &&
      blog.categories.some(
        (cat: Category) => cat.slug === slug
      )
    );
  });

  console.log("Category:", slug);
  console.log("Filtered blogs:", filteredBlogs);

  return filteredBlogs;
}













