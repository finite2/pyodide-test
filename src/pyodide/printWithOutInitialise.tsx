import { loadPyodide } from "pyodide";
import { useCallback, useState } from "react";

export const ExamplePyodidePrintIntialise = () => {
  const [count, setCount] = useState<number>(0);
  const incrementCount = useCallback(() => setCount((c) => c + 1), [setCount]);

  const handleClick = useCallback(async () => {
    const pyodide = await loadPyodide({
      indexURL: "https://cdn.jsdelivr.net/pyodide/v0.22.1/full/",
    });

    // the following code is executed in the browser
    // it is blocking the ui
    // You can see this by the fact that the count is not incremented when clicked
    const output = await pyodide.runPythonAsync(`
    print('Hello, world from the browser!')
    `);
    // This trivial example executes in about 2 seconds though note it is initialising here too.

    // output is undefined because we are not returning anything from the python code
    console.log(output);
  }, []);

  return (
    <div>
      <button onClick={handleClick}>Click me</button>
      <button onClick={incrementCount}>Count is: {count}</button>
    </div>
  );
};
