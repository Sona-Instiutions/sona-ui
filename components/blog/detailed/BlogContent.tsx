import Image from "next/image";
import RichTextRenderer from "./RichTextRenderer";

export default function BlogContent({ blog }: { blog: any }) {
  return (
    <article className="lg:col-span-8">
      <div className="rounded-xl overflow-hidden mb-6">
        <Image
          src={blog.bannerImage}
          width={1200}
          height={600}
          alt={blog.title}
          className="w-full h-auto"
        />
      </div>

      <p className="text-gray-500 mb-3">{blog.date}</p>

      <h1 className="text-3xl font-bold mb-6">{blog.title}</h1>

      <RichTextRenderer content={blog.content} />
    </article>
  );
}
