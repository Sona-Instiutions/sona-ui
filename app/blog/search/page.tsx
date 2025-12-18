import SearchBlogGrid from "@/components/blog/detailed/SearchBlogGrid";

async function searchBlogs(query: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/blogs?filters[title][$containsi]=${encodeURIComponent(
      query
    )}&populate=thumbnail`,
    { cache: "no-store" }
  );

  const json = await res.json();
  return Array.isArray(json?.data) ? json.data : [];
}

export default async function BlogSearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const query = q?.trim() ?? "";

  if (!query) {
    return (
      <section className="container mx-auto py-10">
        <h1 className="text-2xl font-bold mb-4">Search</h1>
        <p>Please enter a search term.</p>
      </section>
    );
  }

  const results = await searchBlogs(query);

  return (
    <section className="container mx-auto max-w-6xl py-10">
      <h1 className="text-2xl font-bold mb-8">
        Search results for “{query}”
      </h1>

      {/* ✅ SAME UI AS BLOG LIST PAGE */}
      <SearchBlogGrid posts={results} />
    </section>
  );
}
