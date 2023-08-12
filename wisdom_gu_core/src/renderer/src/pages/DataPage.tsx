import FilesTreeComponent from "@renderer/components/FilesTreeComponent";
import MarkdownPreviewExample from "@renderer/components/MarkdownEditor";
import { Tab, useDataFileTabsStore } from "@renderer/stores/fileSystemStore";
import { useEffect } from "react";
import sqlite3InitModule from "@sqlite.org/sqlite-wasm";
import { getFileTypeByPath } from "../../../common/utils/fileSystemUtil";
import PdfEditor from "@renderer/components/PdfEditor";

function DataPage(): JSX.Element {
  const tabs = useDataFileTabsStore((state) => state.tabs);
  const selectedTab = useDataFileTabsStore((state) => state.selectedTabPath);

  useEffect(() => {
    const log = (...args) => console.log(...args);
    const error = (...args) => console.error(...args);

    const start = function (sqlite3) {
      log("Running SQLite3 version", sqlite3.version.libVersion);
      const db = new sqlite3.oo1.DB("/mydb.sqlite3", "ct");
      // Your SQLite code here.
    };

    log("Loading and initializing SQLite3 module...");
    sqlite3InitModule({
      print: log,
      printErr: error,
    }).then((sqlite3) => {
      try {
        log("Done initializing. Running demo...");
        start(sqlite3);
      } catch (err) {
        error(err.name, err.message);
      }
    });
  });

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
                <button className="btn btn-xs" onClick={() => {}}>
                  {tab.title}
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
