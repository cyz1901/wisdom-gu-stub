import { useDataFileTabsStore } from "@renderer/stores/fileSystemStore";
import React, { useEffect, useState } from "react";
import { Document, Page } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";
import { path } from "slate";

const options = {
  cMapUrl: "/cmaps/",
  standardFontDataUrl: "/standard_fonts/",
};

type PDFFile = string | File | null;

interface PdfEditorProps {
  name: string;
  path: string;
}

export default function PdfEditor(props: PdfEditorProps) {
  const fileContents = useDataFileTabsStore((state) => state.content);
  const addFileContent = useDataFileTabsStore((state) => state.addContent);

  const [file, setFile] = useState<PDFFile>("");
  const [numPages, setNumPages] = useState<number>();

  useEffect(() => {
    if (fileContents[props.path]) {
      setFile(fileContents[props.path]);
      return;
    } else {
      window.electron.ipcRenderer.send("fileSystemGetFileObj", {
        name: props.name,
        path: props.path,
      });

      window.electron.ipcRenderer.on(
        "fileSystemGetFileObj-reply",
        (_, data) => {
          const file = new File([data], props.name);
          setFile(file);
          addFileContent(props.path, file);
        }
      );
    }
  }, [props.path]);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    setNumPages(numPages);
  }

  //创建一个可以缓存文件的Document组件 不必每次都需要重新loading
  const memoizedDocument = React.useMemo(() => {
    console.log("memoizedDocument");
    return (
      <Document
        file={file}
        onLoadSuccess={onDocumentLoadSuccess}
        options={options}
      >
        {Array.from(new Array(numPages), (el, index) => (
          <Page key={`page_${index + 1}`} pageNumber={index + 1} />
        ))}
      </Document>
    );
  }, [file, numPages]);

  return <div className="flex flex-col h-full">{memoizedDocument}</div>;
}
