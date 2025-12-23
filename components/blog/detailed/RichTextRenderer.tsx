import ReactMarkdown from "react-markdown";

interface RichTextRendererProps {
  content?: string | null;
}

/**
 * Renders Strapi markdown content safely.
 */
export default function RichTextRenderer({
  content,
}: RichTextRendererProps) {
  if (!content) return null;

  return (
    <div className="prose max-w-none">
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  );
}
