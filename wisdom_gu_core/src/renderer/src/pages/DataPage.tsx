import MarkdownPreviewExample from "@renderer/components/MarkdownEditor";
import { useMemo, useState } from "react";
import { BaseEditor, createEditor } from "slate";
import { withHistory } from "slate-history";
import { Editable, ReactEditor, Slate, withReact } from "slate-react";

function DataPage(): JSX.Element {
  return (
    <div className="w-full h-full bg-[#2A2C35]">
      <div className="w-full h-8 bg-[#1B1D22] flex flex-row items-center justify-between">
        <div className="w-1/2 whitespace-nowrap overflow-x-hidden">
          <button className="btn btn-xs" onClick={() => {}}>
            Data1
          </button>
        </div>
      </div>
      <MarkdownPreviewExample></MarkdownPreviewExample>
    </div>
  );
}

export default DataPage;
