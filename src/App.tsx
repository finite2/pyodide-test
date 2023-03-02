import { ExamplePyodideNumpy } from "./pyodide/examples/numpy";
import { ExamplePyodidePrint } from "./pyodide/examples/print";
import { ExamplePyodidePrintFromReady } from "./pyodide/examples/printFromReady";

function App() {
  return (
    <div className="flex flex-col justify-center items-center gap-4">
      <h1>Vite + React + Pyodide (python) + Tailwindcss</h1>

      <div className="flex gap-8 items-start">
        <ExamplePyodidePrint />

        <ExamplePyodidePrintFromReady />

        <ExamplePyodideNumpy />
      </div>
    </div>
  );
}

export default App;
