import { useCallback, useState } from "react";
import { Button } from "../../primitives";
import pyodidePromise from "../readyPyodidePromise";

export const ExamplePyodidePrintFromReady = () => {
  const [count, setCount] = useState<number>(0);

  const [timeLoadMs, seTimeLoadMs] = useState<number>(0);
  const [timeRunMs, seTimeRunMs] = useState<number>(0);
  const incrementCount = useCallback(() => setCount((c) => c + 1), [setCount]);

  const handleClick = useCallback(async () => {
    // We should probably block clicking repeatedly
    const start_load = performance.now();
    const pyodide = await pyodidePromise;
    console.log(`Time taken to load: ${performance.now() - start_load}ms`);
    seTimeLoadMs(performance.now() - start_load);

    const start = performance.now();
    // the following code is executed in the browser
    // it is blocking the ui
    // You can see this by the fact that the count is not incremented when clicked
    const output = await pyodide.runPythonAsync(`
    print('Hello, world from the browser!')
    `);
    // This trivial example executes in about 2 seconds though note it is initialising here too.
    console.log(`Time taken to run: ${performance.now() - start}ms`);
    seTimeRunMs(performance.now() - start);

    // output is undefined because we are not returning anything from the python code
    console.log(output);
  }, [seTimeLoadMs, seTimeRunMs]);

  return (
    <div className="flex flex-col gap-4 w-[300px] text-center">
      <h2 className="text-2xl">Print from global initialise</h2>
      <Button onClick={handleClick}>Click me</Button>
      <Button onClick={incrementCount}>Count is: {count}</Button>

      <div>Load time: {timeLoadMs}ms</div>
      <div>Run time: {timeRunMs}ms</div>
    </div>
  );
};
