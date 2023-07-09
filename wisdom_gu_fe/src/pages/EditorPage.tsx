import Dialog from "../components/Dialog";
import EditorJS from "@editorjs/editorjs";
import { JSX, Setter, createEffect } from "solid-js";
// interface EditorProps {
//   isEditor: boolean;
//   setIsEditor: Setter<boolean>;
// }

function EditorPage(): JSX.Element {
  const editor = new EditorJS();
  // const { isEditor, setIsEditor } = prpos;

  createEffect(() => {
    // console.log('Count changed:', setIsEditor());
  });

  return (
    <div class="w-full h-[calc(100%-32px)] bg-[#2A2C35]">
      <div id="editorjs"></div>
    </div>
  );
}

export default EditorPage;
