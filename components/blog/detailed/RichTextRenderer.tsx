type RichTextChild = {
  text?: string;
};

type RichTextBlock = {
  type: string;
  children?: RichTextChild[];
};
export default function RichTextRenderer({ content }: { content: RichTextBlock[] }) {
  if (!content) return null;

  return (
    <div className="prose max-w-none">
      {content.map((block, i) => {
        if (block.type === "paragraph") {
          return (
            
            <p key={i}>
              {block.children?.map((child, j) => (
                <span key={j}>{child.text}</span>
              ))}
            </p>
          );
        }

        return null;
      })}
    </div>
  );
}
