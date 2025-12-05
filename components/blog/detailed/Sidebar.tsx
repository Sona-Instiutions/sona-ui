import Link from "next/link";

export default function Sidebar({ related, category }: any) {
  return (
    <aside className="lg:col-span-4 space-y-8 bg-gray-50 p-6 rounded-xl">
      <h3 className="font-bold text-xl mb-4">Related Posts</h3>

      {related.map((item: any) => (
        <Link
          key={item.slug}
          href={`/blog/${item.slug}`}
          className="block mb-4 hover:text-blue-700"
        >
          <p className="font-semibold">{item.title}</p>
          <p className="text-sm text-gray-500">{item.date}</p>
        </Link>
      ))}

      <div className="border-t pt-4">
        <h4 className="text-gray-800 font-semibold">Category</h4>
        <p className="text-gray-600">{category}</p>
      </div>
    </aside>
  );
}
