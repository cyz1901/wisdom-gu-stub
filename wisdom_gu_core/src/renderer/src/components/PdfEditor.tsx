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
  const [file, setFile] = useState<PDFFile>("");
  const [numPages, setNumPages] = useState<number>();

  useEffect(() => {
    // fetch("file:///C:/Users/cyz/wisdomGu/coreData/pdf-test.pdf")
    //   .then((res) => res.blob())
    //   .then((blob) => {
    //     const file = new File([blob], props.name);
    //     setFile(file);
    //   });
    // console.log(1);

    window.electron.ipcRenderer.send("fileSystemGetFileObj", {
      name: props.name,
      path: props.path,
    });

    window.electron.ipcRenderer.on("fileSystemGetFileObj-reply", (_, data) => {
      setFile(new File([data], props.name));
    });
  }, [props.path]);

  function onFileChange(event: React.ChangeEvent<HTMLInputElement>): void {
    const { files } = event.target;
    console.log(`new path is ${files[0].path}`);

    if (files && files[0]) {
      setFile(files[0] || null);
    }
  }

  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    setNumPages(numPages);
  }

  return (
    <div className="Example">
      <header>
        <h1>react-pdf sample page</h1>
      </header>
      <div className="Example__container">
        <div className="Example__container__load">
          <label htmlFor="file">Load from file:</label>{" "}
          <input onChange={onFileChange} type="file" />
        </div>
        <div className="Example__container__document">
          <Document
            file={file}
            onLoadSuccess={onDocumentLoadSuccess}
            options={options}
          >
            {Array.from(new Array(numPages), (_, index) => (
              <Page key={`page_${index + 1}`} pageNumber={index + 1} />
            ))}
          </Document>
        </div>
      </div>
    </div>
  );
}
