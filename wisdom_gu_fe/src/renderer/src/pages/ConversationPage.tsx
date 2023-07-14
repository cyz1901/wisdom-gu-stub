import Dialog from "../components/Dialog";
import { JSX } from "solid-js";

function ConversationPage(): JSX.Element {
  return (
    <div class="flex flex-col w-full h-[calc(100%-32px)]">
      <div class="bg-[#2A2C35] flex flex-col overflow-auto h-full space-y-4">
        <Dialog name="me" content="aaaa"></Dialog>
        <Dialog name="hh" content="aaaa"></Dialog>
        <Dialog name="hh" content="aaaa"></Dialog>
        <Dialog name="hh" content="aaaa"></Dialog>
        <Dialog name="hh" content="aaaa"></Dialog>
        <Dialog name="hh" content="aaaa"></Dialog>
        <Dialog name="hh" content="aaaa"></Dialog>
        <Dialog name="hh" content="aaaa"></Dialog>
        <Dialog name="hh" content="aaaa"></Dialog>
        <Dialog name="hh" content="aaaa"></Dialog>
        <Dialog name="hh" content="aaaa"></Dialog>
        <Dialog name="hh" content="aaaa"></Dialog>
        <Dialog name="me" content="aaaa"></Dialog>
        <Dialog name="hh" content="aaaa"></Dialog>
        <Dialog name="hh" content="aaaa"></Dialog>
        <Dialog name="hh" content="aaaa"></Dialog>
        <Dialog name="hh" content="aaaa"></Dialog>
        <Dialog name="hh" content="aaaa"></Dialog>
        <Dialog name="hh" content="aaaa"></Dialog>
        <Dialog name="hh" content="aaaa"></Dialog>
        <Dialog name="hh" content="aaaa"></Dialog>
        <Dialog name="hh" content="aaaa"></Dialog>
        <Dialog name="hh" content="aaaa"></Dialog>
        <Dialog name="hh" content="aaaa"></Dialog>
        <Dialog name="me" content="aaaa"></Dialog>
        <Dialog name="hh" content="aaaa"></Dialog>
        <Dialog name="hh" content="aaaa"></Dialog>
        <Dialog name="hh" content="aaaa"></Dialog>
        <Dialog name="hh" content="aaaa"></Dialog>
        <Dialog name="hh" content="aaaa"></Dialog>
        <Dialog name="hh" content="aaaa"></Dialog>
        <Dialog name="hh" content="aaaa"></Dialog>
        <Dialog name="hh" content="aaaa"></Dialog>
        <Dialog name="hh" content="aaaa"></Dialog>
        <Dialog name="hh" content="aaaa"></Dialog>
        <Dialog name="hh" content="aaaa"></Dialog>
      </div>
      <div class="h-[80px] absolute bottom-3 left-[calc((100%-352px)/2-25%+96px)] w-1/2">
        <div class=" h-12">
          <textarea
            class="textarea w-full resize-none"
            placeholder="Send a message"
          ></textarea>
        </div>
      </div>
    </div>
  );
}

export default ConversationPage;
