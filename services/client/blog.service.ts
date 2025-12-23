import { fetchAPI } from "@/lib/fetcher";
import { Blog, Category, Tag } from "@/types/blog";

/* =========================
   COMMON TYPES
========================= */
type StrapiResponse<T> = {
  data: T[];
};

type SidebarData = {
  categories: Category[];
  recentPosts: Blog[];
  tags: Tag[];
};

/* =========================
   BLOG – SERVER & CLIENT
========================= */

/* GET BLOG BY SLUG */
export async function getBlogBySlug(slug: string): Promise<Blog | null> {
  const res = await fetchAPI<StrapiResponse<Blog>>(
    `/api/blogs?filters[slug][$eq]=${slug}&populate=*`
  );
  return res.data[0] ?? null;
}

/* SIDEBAR DATA */
export async function getSidebarData(): Promise<SidebarData> {
  const [categoriesRes, recentPostsRes, tagsRes] = await Promise.all([
    fetchAPI<StrapiResponse<Category>>("/api/categories"),
    fetchAPI<StrapiResponse<Blog>>(
      "/api/blogs?sort=publishedAt:desc&pagination[limit]=5&populate=*"
    ),
    fetchAPI<StrapiResponse<Tag>>("/api/tags"),
  ]);

  return {
    categories: categoriesRes.data,
    recentPosts: recentPostsRes.data,
    tags: tagsRes.data,
  };
}

/* RELATED BLOGS */
export async function getRelatedBlogs(
  categorySlug?: string,
  currentSlug?: string,
  tagSlug?: string
): Promise<Blog[]> {
  let filters = "";

  if (categorySlug) {
    filters += `filters[categories][slug][$eq]=${categorySlug}&`;
  }
  if (tagSlug) {
    filters += `filters[tags][slug][$eq]=${tagSlug}&`;
  }
  if (currentSlug) {
    filters += `filters[slug][$ne]=${currentSlug}&`;
  }

  const res = await fetchAPI<StrapiResponse<Blog>>(
    `/api/blogs?${filters}pagination[limit]=3&populate=*`
  );

  return res.data;
}

/* BLOGS BY CATEGORY */
export async function getBlogsByCategory(
  categorySlug: string
): Promise<Blog[]> {
  const res = await fetchAPI<StrapiResponse<Blog>>(
    `/api/blogs?filters[categories][slug][$eq]=${categorySlug}&populate=*`
  );

  return res.data;
}

/* =========================
   BLOG SERVICE (CLIENT)
========================= */
export const blogService = {
  /* GET ALL BLOGS */
  async getAll(): Promise<Blog[]> {
    const res = await fetchAPI<StrapiResponse<Blog>>(
      "/api/blogs?populate=*"
    );
    return res.data;
  },

  /* GET BLOGS BY CATEGORY */
  async getByCategory(categorySlug: string): Promise<Blog[]> {
    const res = await fetchAPI<StrapiResponse<Blog>>(
      `/api/blogs?filters[categories][slug][$eq]=${categorySlug}&populate=*`
    );
    return res.data;
  },

  /* SEARCH BLOGS */
  async search(query: string): Promise<Blog[]> {
    if (!query) return [];

    const res = await fetchAPI<StrapiResponse<Blog>>(
      `/api/blogs?filters[title][$containsi]=${query}&populate=*`
    );
    return res.data;
  },
};
