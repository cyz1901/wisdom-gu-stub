import FilesTreeComponent from "@renderer/components/FilesTreeComponent";
import MarkdownPreviewExample from "@renderer/components/MarkdownEditor";

function DataPage(): JSX.Element {
  return (
    <div className="flex flex-row w-full h-full">
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
      <div className="w-[256px] bg-gray-200">
        <FilesTreeComponent></FilesTreeComponent>
      </div>
    </div>
  );
}

export default DataPage;
