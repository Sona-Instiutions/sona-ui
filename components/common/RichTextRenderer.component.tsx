import ReactMarkdown from "react-markdown";

interface RichTextRendererProps {
  content?: string | null; // Currently supporting Markdown string. Future: IStrapiBlock[]
}

/**
 * Renders Strapi markdown content safely.
 */
export function RichTextRenderer({ content }: RichTextRendererProps) {
  if (!content) return null;

  return (
    <div className='prose max-w-none'>
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  );
}
