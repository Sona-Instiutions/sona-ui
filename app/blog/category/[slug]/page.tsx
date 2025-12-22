import { notFound } from "next/navigation";
import { getBlogsByCategory } from "@/services/client/blog.service";
import BlogCard from "@/components/blog/detailed/BlogCard";
import { Blog } from "@/types/blog";

export default async function CategoryPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;

    const blogs = await getBlogsByCategory(slug);

    if (!blogs) {
        notFound();
    }

    return (
        <section className="container mx-auto max-w-6xl px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 py-16">
            <div className="lg:col-span-3">
                <h1 className="text-2xl font-semibold mb-6 capitalize">
                    Category: {slug.replace(/-/g, " ")}
                </h1>
            </div>

            {blogs.length === 0 ? (
                <p className="text-gray-500">No blogs found in this category.</p>
            ) : (
                <div className="mx-auto max-w-6xl flex  justify-center gap-8">
                    {blogs.map((blog: Blog) => (
                        <BlogCard key={blog.id} blog={blog} />
                    ))}
                </div>
            )}

        </section>
    );
}
