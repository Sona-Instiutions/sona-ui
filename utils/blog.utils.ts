/**
 * Blog Utilities
 *
 * Helpers for normalizing blog data and building API queries.
 */

import qs from "qs";
import { IBlog, INormalizedBlog, IBlogAuthor, IBlogAuthorData } from "@/types/blog.types";
import { IStrapiMedia } from "@/types/common.types";

/**
 * Type guard to check if value is an object with author-like properties.
 */
const isAuthorData = (value: unknown): value is IBlogAuthorData => {
  return typeof value === "object" && value !== null && !Array.isArray(value);
};

/**
 * Safely extracts author property with fallback to alternative naming.
 */
const getAuthorProperty = <T extends string | undefined>(
  data: IBlogAuthorData,
  primaryKey: keyof IBlogAuthorData,
  fallbackKey: keyof IBlogAuthorData
): T => {
  return (data[primaryKey] || data[fallbackKey]) as T;
};

/**
 * Normalizes a Strapi media object (single file).
 */
export const normalizeStrapiMedia = (media: unknown): IStrapiMedia | null => {
  if (!media) return null;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const m = media as any;

  // If it's already in the simplified format
  if (m.url && m.mime) return m as IStrapiMedia;

  const data = m.data || m;
  if (!data) return null;

  const attributes = data.attributes || data;
  if (!attributes || !attributes.url) return null;

  return {
    id: data.id || attributes.id,
    url: attributes.url,
    name: attributes.name,
    mime: attributes.mime,
    size: attributes.size,
    alternativeText: attributes.alternativeText,
    caption: attributes.caption,
    width: attributes.width,
    height: attributes.height,
    formats: attributes.formats,
  };
};

/**
 * Normalizes raw blog data into a clean interface.
 */
export const normalizeBlog = (blog: IBlog): INormalizedBlog => {
  const authorData = blog.author;
  let normalizedAuthor: IBlogAuthor | null = null;

  if (typeof authorData === "string") {
    // If author is just a name string
    normalizedAuthor = {
      name: authorData,
    };
  } else if (isAuthorData(authorData)) {
    normalizedAuthor = {
      name: getAuthorProperty(authorData, "name", "authorName") || "Sona Author",
      role: getAuthorProperty(authorData, "role", "authorRole"),
      bio: getAuthorProperty(authorData, "bio", "authorBio"),
      image: normalizeStrapiMedia(authorData.authorImage || authorData.image),
      linkedin: getAuthorProperty(authorData, "linkedin", "authorLinkedin"),
      twitter: getAuthorProperty(authorData, "twitter", "authorTwitter"),
      email: getAuthorProperty(authorData, "email", "authorEmail"),
    };
  }

  // Fallback if some author fields are directly on the blog
  if (!normalizedAuthor && isAuthorData(blog)) {
    normalizedAuthor = {
      name: getAuthorProperty(blog, "name", "authorName") || "Sona Author",
      role: getAuthorProperty(blog, "role", "authorRole"),
      bio: getAuthorProperty(blog, "bio", "authorBio"),
      image: normalizeStrapiMedia(blog.authorImage || blog.image),
      linkedin: getAuthorProperty(blog, "linkedin", "authorLinkedin"),
      twitter: getAuthorProperty(blog, "twitter", "authorTwitter"),
      email: getAuthorProperty(blog, "email", "authorEmail"),
    };
  }

  return {
    id: blog.id,
    documentId: blog.documentId,
    title: blog.title,
    slug: blog.slug,
    excerpt: blog.excerpt || "",
    content: blog.content || null,
    publishedDate: blog.publishedDate,
    readTime: blog.readTime || null,
    bannerImage: normalizeStrapiMedia(blog.bannerImage),
    thumbnail: normalizeStrapiMedia(blog.thumbnail),
    author: normalizedAuthor,
    featured: blog.featured || false,
    viewCount: blog.viewCount || 0,
    metaTitle: blog.metaTitle || null,
    metaDescription: blog.metaDescription || null,
    categories: Array.isArray(blog.categories) ? blog.categories : [],
    tags: Array.isArray(blog.tags) ? blog.tags : [],
    relatedBlogs: Array.isArray(blog.relatedBlogs)
      ? blog.relatedBlogs.map((b) => normalizeBlog(b))
      : [],
  };
};

/**
 * Builds the Strapi query string for fetching blogs.
 */
export const buildBlogsQuery = ({
  page = 1,
  pageSize = 9,
  categorySlug,
  tagSlug,
  slug,
  excludeId,
  search,
}: {
  page?: number;
  pageSize?: number;
  categorySlug?: string;
  tagSlug?: string;
  slug?: string;
  excludeId?: number;
  search?: string;
}) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const query: any = {
    populate: {
      bannerImage: { fields: ["url", "alternativeText", "width", "height", "mime"] },
      thumbnail: { fields: ["url", "alternativeText", "width", "height", "mime"] },
      authorImage: { fields: ["url", "alternativeText", "width", "height", "mime"] },
      categories: { fields: ["name", "slug", "color"] },
      tags: { fields: ["name", "slug"] },
      relatedBlogs: {
        populate: {
          thumbnail: { fields: ["url"] },
          categories: { fields: ["name", "color"] },
        },
      },
    },
    sort: ["publishedDate:desc", "publishedAt:desc"],
    pagination: {
      page,
      pageSize,
    },
    filters: {},
  };

  if (slug) {
    query.filters.slug = { $eq: slug };
  }

  if (categorySlug) {
    query.filters.categories = { slug: { $eq: categorySlug } };
  }

  if (tagSlug) {
    query.filters.tags = { slug: { $eq: tagSlug } };
  }

  if (excludeId) {
    query.filters.id = { $ne: excludeId };
  }

  if (search) {
    query.filters.$or = [
      { title: { $containsi: search } },
      { excerpt: { $containsi: search } },
    ];
  }

  return qs.stringify(query, { encodeValuesOnly: true });
};

