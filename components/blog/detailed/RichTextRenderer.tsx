export default function RichTextRenderer({ content }: { content: any[] }) {
  return (
    <div className="prose prose-lg max-w-none">
      {content.map((block, i) => {
        if (block.type === "paragraph") {
          return <p key={i}>{block.children.map((c: any) => c.text).join("")}</p>;
        }
        return null;
      })}
    </div>
  );
}
