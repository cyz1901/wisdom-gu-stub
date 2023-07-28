import Prism from "prismjs";
import "prismjs/components/prism-markdown";
import React, { useCallback, useMemo } from "react";
import { Slate, Editable, withReact } from "slate-react";
import { Text, createEditor, Descendant } from "slate";
import { withHistory } from "slate-history";

interface RangeStyle {
  [key: string]: boolean;
}

interface Range {
  [key: string]: boolean | RangeStyle | { path: number[]; offset: number };
  anchor: { path: number[]; offset: number };
  focus: { path: number[]; offset: number };
}

const MarkdownPreviewExample = () => {
  const renderLeaf = useCallback((props) => <Leaf {...props} />, []);
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);
  const decorate = useCallback(([node, path]) => {
    const ranges: Range[] = [];

    if (!Text.isText(node)) {
      return ranges;
    }

    const getLength = (token) => {
      if (typeof token === "string") {
        return token.length;
      } else if (typeof token.content === "string") {
        return token.content.length;
      } else {
        return token.content.reduce((l, t) => l + getLength(t), 0);
      }
    };

    const tokens = Prism.tokenize(node.text, Prism.languages.markdown);
    let start = 0;

    for (const token of tokens) {
      const length = getLength(token);
      const end = start + length;

      if (typeof token !== "string") {
        ranges.push({
          [token.type]: true,
          anchor: { path, offset: start },
          focus: { path, offset: end },
        });
      }

      start = end;
    }

    return ranges;
  }, []);

  return (
    <Slate editor={editor} initialValue={initialValue}>
      <Editable
        decorate={decorate}
        renderLeaf={renderLeaf}
        placeholder="Write some markdown..."
      />
    </Slate>
  );
};

const Leaf = ({ attributes, children, leaf }) => {
  const leafClassNames = [
    leaf.bold && "font-bold",
    leaf.italic && "italic",
    leaf.underlined && "underline",
    leaf.title && "block font-bold text-2xl my-5",
    leaf.list && "pl-4 text-lg leading-5",
    leaf.hr && "block mx-auto border-b-2 border-gray-300",
    leaf.blockquote &&
      "block border-l-2 border-gray-300 pl-2 italic text-gray-600",
    leaf.code && "font-mono bg-gray-200 p-1",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <span {...attributes} className={leafClassNames}>
      {children}
    </span>
  );
};

const initialValue: Descendant[] = [
  {
    type: "paragraph",
    children: [
      {
        text: "Slate is flexible enough to add **decorations** that can format text based on its content. For example, this editor has **Markdown** preview decorations on it, to make it _dead_ simple to make an editor with built-in Markdown previewing.",
      },
    ],
  },
  {
    type: "paragraph",
    children: [{ text: "## Try it out!" }],
  },
  {
    type: "paragraph",
    children: [{ text: "Try it out for yourself!" }],
  },
];

export default MarkdownPreviewExample;
