/**
 * Blog Utilities
 *
 * Helpers for normalizing blog data and building API queries.
 */

import qs from "qs";
import { IBlog, INormalizedBlog, IBlogAuthor } from "@/types/blog.types";
import { normalizeStrapiMedia, isAuthorData, getAuthorProperty, buildContentFilters } from "@/utils/common.utils";

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
      name: getAuthorProperty<string>(authorData, "name", "authorName") || "Sona Author",
      role: getAuthorProperty<string | undefined>(authorData, "role", "authorRole"),
      bio: getAuthorProperty<string | undefined>(authorData, "bio", "authorBio"),
      image: normalizeStrapiMedia(authorData.authorImage || authorData.image),
      linkedin: getAuthorProperty<string | undefined>(authorData, "linkedin", "authorLinkedin"),
      twitter: getAuthorProperty<string | undefined>(authorData, "twitter", "authorTwitter"),
      email: getAuthorProperty<string | undefined>(authorData, "email", "authorEmail"),
    };
  }

  // Fallback if some author fields are directly on the blog
  if (!normalizedAuthor && isAuthorData(blog)) {
    normalizedAuthor = {
      name: getAuthorProperty<string>(blog, "name", "authorName") || "Sona Author",
      role: getAuthorProperty<string | undefined>(blog, "role", "authorRole"),
      bio: getAuthorProperty<string | undefined>(blog, "bio", "authorBio"),
      image: normalizeStrapiMedia(blog.authorImage || blog.image),
      linkedin: getAuthorProperty<string | undefined>(blog, "linkedin", "authorLinkedin"),
      twitter: getAuthorProperty<string | undefined>(blog, "twitter", "authorTwitter"),
      email: getAuthorProperty<string | undefined>(blog, "email", "authorEmail"),
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
    showComments: blog.showComments || false,
    metaTitle: blog.metaTitle || null,
    metaDescription: blog.metaDescription || null,
    categories: Array.isArray(blog.categories) ? blog.categories : [],
    tags: Array.isArray(blog.tags) ? blog.tags : [],
    relatedBlogs: Array.isArray(blog.relatedBlogs) ? blog.relatedBlogs.map((b) => normalizeBlog(b)) : [],
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
    filters: buildContentFilters({ slug, categorySlug, tagSlug, excludeId, search }),
  };

  return qs.stringify(query, { encodeValuesOnly: true });
};
