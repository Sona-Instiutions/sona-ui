// Base Strapi URL
const API_URL = process.env.NEXT_PUBLIC_STRAPI_URL;

/**
 * Fetch a single blog by slug
 */
export async function getBlogBySlug(slug: string) {
  const url = `${API_URL}/api/blogs?filters[slug][$eq]=${slug}&populate=*`;

  const res = await fetch(url, { cache: "no-store" });
  const json = await res.json();

  if (!json?.data?.length) {
    const err: any = new Error("Blog not found");
    err.status = 404;
    throw err;
  }

  const item = json.data[0];

  // Format clean data
  return {
    id: item.id,
    slug: item.attributes.slug,
    title: item.attributes.title,
    date: item.attributes.date,
    category: item.attributes.category,
    bannerImage: item.attributes.bannerImage?.data?.attributes?.url
      ? API_URL + item.attributes.bannerImage.data.attributes.url
      : null,
    content: item.attributes.content, // Rich Text (Blocks)
  };
}


/**
 * Fetch related blogs from the same category
 */
export async function getRelatedBlogs(category: string, excludeSlug: string) {
  const url = `${API_URL}/api/blogs?filters[category][$eq]=${category}&filters[slug][$ne]=${excludeSlug}&populate=*`;

  const res = await fetch(url, { cache: "no-store" });
  const json = await res.json();

  if (!json?.data?.length) return [];

  return json.data.map((item: any) => ({
    id: item.id,
    slug: item.attributes.slug,
    title: item.attributes.title,
    date: item.attributes.date,
    image: item.attributes.bannerImage?.data?.attributes?.url
      ? API_URL + item.attributes.bannerImage.data.attributes.url
      : null,
  }));
}
