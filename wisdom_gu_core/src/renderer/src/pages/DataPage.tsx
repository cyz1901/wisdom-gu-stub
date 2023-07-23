import { useMemo, useState } from "react";
import { BaseEditor, createEditor } from "slate";
import { withHistory } from "slate-history";
import { Editable, ReactEditor, Slate, withReact } from "slate-react";

type CustomElement = { type: "paragraph"; children: CustomText[] };
type CustomText = { text: string };

declare module "slate" {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor;
    Element: CustomElement;
    Text: CustomText;
  }
}

const initialValue = [
  {
    type: "paragraph",
    children: [{ text: "A line of text in a paragraph." }],
  },
];

function DataPage(): JSX.Element {
  const [editor] = useState(() => withReact(createEditor()));

  return (
    <div className="w-full h-full bg-[#2A2C35]">
      <div className="w-full h-8 bg-[#1B1D22] flex flex-row items-center justify-between">
        <div className="w-1/2 whitespace-nowrap overflow-x-hidden">
          <button className="btn btn-xs" onClick={() => {}}>
            Data1
          </button>
        </div>
      </div>
      {/* @ts-ignore */}
      <Slate editor={editor} initialValue={initialValue}>
        <Editable />
      </Slate>
    </div>
  );
}

export default DataPage;
