import FilesTreeComponent from "@renderer/components/FilesTreeComponent";
import MarkdownPreviewExample from "@renderer/components/MarkdownEditor";
import { Tab, useDataFileTabsStore } from "@renderer/stores/fileSystemStore";
import { getFileTypeByPath } from "../../../common/utils/fileSystemUtil";
import PdfEditor from "@renderer/components/PdfEditor";
import { AiOutlineClose } from "react-icons/ai";

function DataPage(): JSX.Element {
  const tabs = useDataFileTabsStore((state) => state.tabs);
  const selectedTab = useDataFileTabsStore((state) => state.selectedTabPath);
  const removeTab = useDataFileTabsStore((state) => state.removeTab);
  const selectTab = useDataFileTabsStore((state) => state.selectTab);

  const getRenderFileView = () => {
    const fileType = getFileTypeByPath(selectedTab.path);

    switch (fileType) {
      case "markdown":
        return <MarkdownPreviewExample></MarkdownPreviewExample>;
      case "pdf":
        console.log(`pdf alll path os ${selectedTab.path}`);
        return (
          <PdfEditor
            path={selectedTab.path}
            name={selectedTab.title}
          ></PdfEditor>
        );
      default:
        return <></>;
    }
  };

  return (
    <div className="flex flex-row w-full h-full">
      <div className="w-full h-full bg-[#2A2C35]">
        <div className="w-full h-8 bg-[#1B1D22] flex flex-row items-center justify-between">
          <div className="w-1/2 whitespace-nowrap overflow-x-hidden">
            {tabs.map((tab: Tab) => {
              return (
                <button
                  className="btn btn-xs bg-[#272a31] rounded-none"
                  style={{ textTransform: "none" }}
                  onClick={() => {
                    selectTab(tab.title, tab.path);
                  }}
                >
                  {tab.title}
                  <AiOutlineClose
                    onClick={(event) => {
                      event.stopPropagation();

                      const index = tabs.findIndex(
                        (tab) => tab.path === selectedTab.path
                      );
                      if (index === 0) {
                        if (tabs.length >= 2) {
                          selectTab(tabs[1].title, tabs[1].path);
                        } else {
                          selectTab("", "");
                        }
                        removeTab(tabs[0].path);
                      } else {
                        selectTab(tabs[index - 1].title, tabs[index - 1].path);
                        removeTab(tabs[index].path);
                      }
                    }}
                  ></AiOutlineClose>
                </button>
              );
            })}
          </div>
        </div>
        {getRenderFileView()}
      </div>
      <div className="w-[256px] bg-gray-200">
        <FilesTreeComponent></FilesTreeComponent>
      </div>
    </div>
  );
}

export default DataPage;
