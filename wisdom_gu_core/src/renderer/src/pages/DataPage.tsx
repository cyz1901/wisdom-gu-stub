import Dialog from "../components/Dialog";
import { JSX, Setter, createEffect, createMemo } from "solid-js";
import { createEditor, Descendant } from "slate";
// import { Slate } from "slate-solid";

function DataPage(): JSX.Element {
  const editor = createMemo(() => withHistory(createEditor()), []);

  return (
    <div class="w-full h-[calc(100%-32px)] bg-[#2A2C35]">
      <div class="w-full h-8 bg-[#1B1D22] flex flex-row items-center justify-between">
        <div class="w-1/2 whitespace-nowrap overflow-x-hidden">
          <button class="btn btn-xs" onclick={() => {}}>
            Data1
          </button>
        </div>
      </div>
      {/* <Slate editor={editor} initialValue={initialValue}>
        <Editable placeholder="Enter some plain text..." />
      </Slate> */}
    </div>
  );
}

export default DataPage;
function withHistory(arg0: any): any {
  throw new Error("Function not implemented.");
}
