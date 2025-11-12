"use client";

import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";

export interface MarkdownContentProps {
  /** Markdown string to render */
  content?: string | null;
  /** Optional className applied to wrapper */
  className?: string;
  /** Custom markdown component overrides */
  components?: Components;
}

/**
 * Client-side markdown renderer compatible with React Server Components.
 */
export function MarkdownContent({ content, className, components }: MarkdownContentProps) {
  if (!content || content.trim().length === 0) {
    return null;
  }

  return (
    <div className={className}>
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {content}
      </ReactMarkdown>
    </div>
  );
}

