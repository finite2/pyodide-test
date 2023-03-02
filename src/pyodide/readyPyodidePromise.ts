import { loadPyodide } from "pyodide";

// interestingly this also blocks the UI thread
// we can avoid blocking until required by use dynamic imports for first time use
// Alternatively move to a web worker (https://github.com/pyodide/pyodide/issues/1504)
const pyodide = (async () => {
  let py = await loadPyodide({
    indexURL: "https://cdn.jsdelivr.net/pyodide/v0.22.1/full/",
  });

  await py.loadPackage("numpy");

  return py;
})();

export default pyodide;
