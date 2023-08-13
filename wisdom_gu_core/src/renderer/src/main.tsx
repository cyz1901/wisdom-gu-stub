import "./index.css";
import ReactDOM from "react-dom/client";
import { createHashRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage";
import { pdfjs } from "react-pdf";
import sqlite3InitModule from "@sqlite.org/sqlite-wasm";

//init react-pdf
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();

//init sqlite
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

const router = createHashRouter([
  {
    path: "/",
    element: <HomePage />,
  },
]);

ReactDOM.createRoot(document.getElementById("app") as HTMLElement).render(
  //development
  // <React.StrictMode>
  //   <RouterProvider router={router} />
  // </React.StrictMode>

  //production
  <RouterProvider router={router} />
);
