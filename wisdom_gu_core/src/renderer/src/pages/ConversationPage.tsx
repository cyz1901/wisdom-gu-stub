import Dialog from "../components/Dialog";
import { JSX } from "solid-js";

function ConversationPage(): JSX.Element {
  function handleKeyDown(event: KeyboardEvent) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault(); // 阻止回车键默认行为
      // 在这里执行您想要的操作
      console.log("回车键被按下");

      window.electron.ipcRenderer.send("msg2", "ping1");
    }
  }

  return (
    <div class="flex flex-col w-full h-[calc(100%-32px)]">
      <div class="bg-[#2A2C35] flex flex-col overflow-auto h-full space-y-4">
        <Dialog name="me" content="aaaa"></Dialog>
      </div>
      <div class="h-[80px] absolute bottom-3 left-[calc((100%-352px)/2-25%+96px)] w-1/2">
        <div class=" h-12">
          <textarea
            class="textarea w-full resize-none"
            placeholder="Send a message"
            onKeyDown={handleKeyDown}
          ></textarea>
        </div>
      </div>
    </div>
  );
}

export default ConversationPage;
