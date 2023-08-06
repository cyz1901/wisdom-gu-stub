import {
  AiOutlineEye,
  AiOutlineFileAdd,
  AiOutlineFolderAdd,
} from "react-icons/ai";
import { OpenFileSystemType } from "../../../common/enums/openFileSystemType";
import { useEffect, useState } from "react";
import { FileNode } from "src/common/models/fileNode";

const FilesTreeComponent = () => {
  const [fileTree, setFileTree] = useState<FileNode | undefined>();

  useEffect(() => {
    window.electron.ipcRenderer.send("getAllCoreDataFolderFiles");

    window.electron.ipcRenderer.on(
      "getAllCoreDataFolderFiles-reply",
      (_, data) => {
        setFileTree(data);
      }
    );

    return () => {
      window.electron.ipcRenderer.removeAllListeners(
        "getAllCoreDataFolderFiles-reply"
      );
    };
  }, []);

  const CoreFolder = () => {
    // render core folder

    //Recursive fileTree
    function render(fileNode: FileNode | undefined): JSX.Element {
      if (fileNode === null || fileNode === undefined) {
        return <></>;
      } else if (fileNode.isDirectory === false) {
        return (
          <li>
            <a
              onClick={() => {
                console.log(fileNode.name);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                />
              </svg>
              {fileNode.name}
            </a>
          </li>
        );
      } else {
        return (
          <li>
            <details open>
              <summary>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z"
                  />
                </svg>
                {fileNode.name}
              </summary>
              <ul>
                {fileNode.children?.map((fileNode) => {
                  return render(fileNode);
                })}
              </ul>
            </details>
          </li>
        );
      }
    }

    return render(fileTree);
  };

  const FileTreeBar = () => {
    return (
      <div className="flex flex-row">
        <button
          className="btn btn-xs"
          onClick={() => {
            window.electron.ipcRenderer.send(
              "selectFileOrFolder",
              OpenFileSystemType.File
            );
          }}
        >
          <AiOutlineFileAdd></AiOutlineFileAdd>
        </button>
        <button
          className="btn btn-xs"
          onClick={() => {
            window.electron.ipcRenderer.send(
              "selectFileOrFolder",
              OpenFileSystemType.Folder
            );
          }}
        >
          <AiOutlineFolderAdd></AiOutlineFolderAdd>
        </button>
        <button className="btn btn-xs">
          <AiOutlineEye></AiOutlineEye>
        </button>
      </div>
    );
  };

  return (
    <div className="bg-[#1B1D22] flex flex-col h-full">
      <div className=" bg-[#23252b] flex flex-row h-8 justify-between items-center px-4">
        <div>explorer</div>
        <FileTreeBar></FileTreeBar>
      </div>
      <ul className="menu menu-xs bg-[#1B1D22] max-w-xs w-full h-full">
        <CoreFolder></CoreFolder>
        <li>
          <a>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
              />
            </svg>
            resume.pdf
          </a>
        </li>
        <li>
          <a>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
              />
            </svg>
            reports-final-2.pdf
          </a>
        </li>
      </ul>
    </div>
  );
};

export default FilesTreeComponent;
