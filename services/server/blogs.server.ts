/**
 * Blogs Server Service
 *
 * Server-side data access for Blogs.
 * Used by Server Components (ISR) and Server Actions.
 */

import axiosInstance from "@/lib/axios.config";
import { IBlogsResponse, INormalizedBlog } from "@/types/blog.types";
import { buildBlogsQuery, normalizeBlog } from "@/utils/blog.utils";
import { BLOG_PAGE_SIZE } from "@/constants/blog.constants";

/**
 * Fetch a paginated list of blogs.
 */
export async function getBlogs(params: {
  page?: number;
  pageSize?: number;
  categorySlug?: string;
  tagSlug?: string;
  search?: string;
}): Promise<{ data: INormalizedBlog[]; meta: IBlogsResponse["meta"] }> {
  try {
    const query = buildBlogsQuery(params);
    const { data } = await axiosInstance.get<IBlogsResponse>(`/api/blogs?${query}`);

    return {
      data: data.data.map(normalizeBlog),
      meta: data.meta,
    };
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return {
      data: [],
      meta: {
        pagination: {
          page: 1,
          pageSize: params.pageSize || BLOG_PAGE_SIZE,
          pageCount: 0,
          total: 0,
        },
      },
    };
  }
}

/**
 * Fetch a single blog by slug (with full population).
 */
export async function getBlogBySlug(slug: string): Promise<INormalizedBlog | null> {
  if (!slug) return null;

  try {
    const query = buildBlogsQuery({ slug });
    const { data } = await axiosInstance.get<IBlogsResponse>(`/api/blogs?${query}`);

    if (!data.data || data.data.length === 0) {
      return null;
    }

    return normalizeBlog(data.data[0]);
  } catch (error) {
    console.error(`Error fetching blog by slug [${slug}]:`, error);
    return null;
  }
}

/**
 * Fetch recent blogs (excluding a specific ID).
 */
export async function getRecentBlogs(params: {
  limit?: number;
  excludeId?: number;
}): Promise<INormalizedBlog[]> {
  try {
    const query = buildBlogsQuery({
      page: 1,
      pageSize: params.limit || 5,
      excludeId: params.excludeId,
    });
    const { data } = await axiosInstance.get<IBlogsResponse>(`/api/blogs?${query}`);
    return data.data.map(normalizeBlog);
  } catch (error) {
    console.error("Error fetching recent blogs:", error);
    return [];
  }
}

