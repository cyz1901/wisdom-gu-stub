import Dialog from "../components/Dialog";

function ConversationPage(): JSX.Element {
  return (
    <div className="flex flex-col w-full h-full">
      <div className="w-full h-8 bg-[#1B1D22] flex flex-row items-center justify-between">
        <div className="w-1/2 whitespace-nowrap overflow-x-hidden">
          <button className="btn btn-xs" onClick={() => {}}>
            claude conversation
          </button>
        </div>
      </div>
      <div className="flex flex-col w-full h-[calc(100%-32px)]">
        <div className="bg-[#2A2C35] flex flex-col overflow-auto h-full space-y-4">
          <Dialog name="me" content="aaaa"></Dialog>
        </div>
        <div className="h-[80px] absolute bottom-3 left-[calc((100%-352px)/2-25%+96px)] w-1/2">
          <div className=" h-12">
            <textarea
              className="textarea w-full resize-none"
              placeholder="Send a message"
              // onKeyDown={handleKeyDown}
            ></textarea>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConversationPage;
