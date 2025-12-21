/**
 * Rich Text Renderer
 *
 * Renders Strapi Blocks JSON content.
 * Manually implemented to avoid dependency issues with @strapi/blocks-react-renderer.
 */

"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { buildMediaUrl } from "@/utils/common.utils";

// Define local types since we can't import from the library
type BlockNode = {
  type: string;
  children?: BlockNode[];
  text?: string;
  url?: string;
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  format?: "ordered" | "unordered";
  image?: {
    id?: number;
    url: string;
    width: number;
    height: number;
    alternativeText?: string;
    caption?: string;
    mime?: string;
  };
  [key: string]: unknown;
};

interface RichTextRendererProps {
  content: BlockNode[] | string | null;
  className?: string;
}

const renderChildren = (children?: BlockNode[]) => {
  if (!children) return null;
  return children.map((child, index) => <Block key={index} block={child} />);
};

const Block = ({ block }: { block: BlockNode }) => {
  // Text node
  if (block.type === "text") {
    let textNode: React.ReactNode = block.text;
    if (block.bold) textNode = <strong>{textNode}</strong>;
    if (block.italic) textNode = <em>{textNode}</em>;
    if (block.underline) textNode = <u>{textNode}</u>;
    if (block.strikethrough) textNode = <s>{textNode}</s>;
    if (block.code) textNode = <code className="bg-gray-100 rounded px-1">{textNode}</code>;
    return <>{textNode}</>;
  }

  // Element nodes
  switch (block.type) {
    case "paragraph":
      return (
        <p className="mb-4 leading-relaxed text-gray-700">
          {renderChildren(block.children)}
        </p>
      );

    case "heading":
      const Tag = `h${block.level || 2}` as React.ElementType;
      const styles = {
        1: "text-3xl md:text-4xl mt-10 mb-4 font-bold",
        2: "text-2xl md:text-3xl mt-8 mb-4 font-bold",
        3: "text-xl md:text-2xl mt-6 mb-3 font-bold",
        4: "text-lg md:text-xl mt-6 mb-3 font-bold",
        5: "text-base md:text-lg mt-4 mb-2 font-bold",
        6: "text-base font-bold mt-4 mb-2",
      };
      return (
        <Tag className={styles[block.level || 2]}>
          {renderChildren(block.children)}
        </Tag>
      );

    case "list":
      const ListTag = block.format === "ordered" ? "ol" : "ul";
      const listStyles = block.format === "ordered" 
        ? "list-decimal pl-6 mb-4 space-y-2" 
        : "list-disc pl-6 mb-4 space-y-2";
      return (
        <ListTag className={listStyles}>
          {renderChildren(block.children)}
        </ListTag>
      );

    case "list-item":
      return <li>{renderChildren(block.children)}</li>;

    case "link":
      return (
        <Link href={block.url || "#"} className="text-blue-600 hover:underline">
          {renderChildren(block.children)}
        </Link>
      );

    case "quote":
      return (
        <blockquote className="border-l-4 border-yellow-500 pl-4 py-2 my-6 italic text-gray-700 bg-gray-50 rounded-r-lg">
          {renderChildren(block.children)}
        </blockquote>
      );

    case "image":
      if (!block.image) return null;
      const imageUrl = buildMediaUrl(block.image);
      if (!imageUrl) return null;

      return (
        <div className="relative w-full h-auto my-8 overflow-hidden rounded-xl">
          <Image
            src={imageUrl}
            alt={block.image.alternativeText || ""}
            width={block.image.width || 800}
            height={block.image.height || 600}
            className="object-cover w-full h-auto"
            unoptimized
          />
          {block.image.caption && (
            <p className="mt-2 text-sm text-center text-gray-500 italic">
              {block.image.caption}
            </p>
          )}
        </div>
      );

    default:
      console.warn("Unknown block type:", block.type);
      return null;
  }
};

export function RichTextRenderer({ content, className = "" }: RichTextRendererProps) {
  if (!content) return null;

  // Handle Markdown string
  if (typeof content === "string") {
    return (
      <div className={`prose prose-lg max-w-none ${className}`}>
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
      </div>
    );
  }

  // Handle Strapi Blocks array
  if (Array.isArray(content)) {
    return (
      <div className={`prose prose-lg max-w-none ${className}`}>
        {content.map((block, index) => (
          <Block key={index} block={block} />
        ))}
      </div>
    );
  }

  return null;
}

