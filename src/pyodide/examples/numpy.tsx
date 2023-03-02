import { useCallback, useState } from "react";
import { Button } from "../../primitives";
import pyodidePromise from "../readyPyodidePromise";

export const ExamplePyodideNumpy = () => {
  const [value, setValue] = useState<number>(0);
  const [timeLoadMs, seTimeLoadMs] = useState<number>(0);
  const [timeRunMs, seTimeRunMs] = useState<number>(0);

  const handleClick = useCallback(async () => {
    // We should probably block clicking repeatedly
    const start_load = performance.now();
    const pyodide = await pyodidePromise;
    console.log(`Time taken to load: ${performance.now() - start_load}ms`);
    seTimeLoadMs(performance.now() - start_load);

    console.log(pyodide);

    const start = performance.now();
    // the following code is executed in the browser
    // it is blocking the ui
    // You can see this by the fact that the count is not incremented when clicked
    await pyodide.runPythonAsync(`
    import numpy
    y = numpy.zeros(11)
    for i in range(11):
        y[i] = i
    y
    `);

    // NOTE: not typesafe at runtime
    const output: number[] = pyodide.globals.get("y").toJs();

    // This trivial example executes in about 2 seconds though note it is initialising here too.
    console.log(`Time taken to run: ${performance.now() - start}ms`);
    seTimeRunMs(performance.now() - start);

    // output is now an incrementing array
    console.log(output);
    setValue(output.reduce((a, b) => a + b, 0));
  }, [seTimeLoadMs, seTimeRunMs, setValue]);

  return (
    <div className="flex flex-col gap-4 w-[300px] text-center">
      <h2 className="text-2xl">Use numpy</h2>
      <p>Sum numbers 1-10</p>
      <Button onClick={handleClick}>Click me</Button>

      <div>Load time: {timeLoadMs}ms</div>
      <div>Run time: {timeRunMs}ms</div>
      <div>Value: {value}</div>
    </div>
  );
};
