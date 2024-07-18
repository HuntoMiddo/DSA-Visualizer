import React, { useState, useEffect, useRef } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs';
import 'prismjs/components/prism-javascript';
import 'prismjs/themes/prism.css';

interface SortingVisualizerProps {
  algorithm: 'bubbleSort' | 'quickSort' | 'heapSort';
}

interface ArrayItem {
  value: number;
  state: 'default' | 'comparing' | 'swapping' | 'pivot' | 'heapify';
}

const generateRandomArray = (length: number): ArrayItem[] => {
  return Array.from({ length }, () => ({
    value: Math.floor(Math.random() * 100) + 1,
    state: 'default'
  }));
};

const SortingVisualizer: React.FC<SortingVisualizerProps> = ({ algorithm }) => {
  const [array, setArray] = useState<ArrayItem[]>([]);
  const [sorting, setSorting] = useState<boolean>(false);
  const [logOutput, setLogOutput] = useState<string[]>([]);
  const [speed, setSpeed] = useState<number>(50);
  const [arraySize, setArraySize] = useState<number>(15);
  const [comparisons, setComparisons] = useState<number>(0);
  const [swaps, setSwaps] = useState<number>(0);
  const [code, setCode] = useState<string>('');
  const stopSortingRef = useRef<boolean>(false);

  useEffect(() => {
    resetArray();
    setDefaultCode(algorithm);
  }, [algorithm, arraySize]);

  const resetArray = (): void => {
    const newArray = generateRandomArray(arraySize);
    setArray(newArray);
    setSorting(false);
    setLogOutput([`New array generated with ${arraySize} elements`]);
    stopSortingRef.current = false;
    setComparisons(0);
    setSwaps(0);
  };

  const setDefaultCode = (algo: string) => {
    let defaultCode = '';
    switch (algo) {
      case 'bubbleSort':
        defaultCode = `async function bubbleSort(arr) {
  const n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (arr[j].value > arr[j + 1].value) {
        await swap(arr, j, j + 1);
      }
    }
  }
}`;
        break;
      case 'quickSort':
        defaultCode = `async function quickSort(arr, low = 0, high = arr.length - 1) {
  if (low < high) {
    const pi = await partition(arr, low, high);
    await quickSort(arr, low, pi - 1);
    await quickSort(arr, pi + 1, high);
  }
}

async function partition(arr, low, high) {
  const pivot = arr[high].value;
  let i = low - 1;
  for (let j = low; j < high; j++) {
    if (arr[j].value < pivot) {
      i++;
      await swap(arr, i, j);
    }
  }
  await swap(arr, i + 1, high);
  return i + 1;
}`;
        break;
      case 'heapSort':
        defaultCode = `async function heapSort(arr) {
  const n = arr.length;
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    await heapify(arr, n, i);
  }
  for (let i = n - 1; i > 0; i--) {
    await swap(arr, 0, i);
    await heapify(arr, i, 0);
  }
}

async function heapify(arr, n, i) {
  let largest = i;
  const left = 2 * i + 1;
  const right = 2 * i + 2;
  if (left < n && arr[left].value > arr[largest].value) largest = left;
  if (right < n && arr[right].value > arr[largest].value) largest = right;
  if (largest !== i) {
    await swap(arr, i, largest);
    await heapify(arr, n, largest);
  }
}`;
        break;
    }
    setCode(defaultCode);
  };

  const setArrayItemState = (index: number, state: 'default' | 'comparing' | 'swapping' | 'pivot' | 'heapify') => {
    setArray(prev => prev.map((item, i) => i === index ? { ...item, state } : item));
  };

  const swap = async (arr: ArrayItem[], i: number, j: number) => {
    setArrayItemState(i, 'swapping');
    setArrayItemState(j, 'swapping');
    await delay(speed);
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
    setArray([...arr]);
    setSwaps(prev => prev + 1);
    setLogOutput(prev => [...prev, `Swap ${arr[i].value} and ${arr[j].value}`]);
    await delay(speed);
    setArrayItemState(i, 'default');
    setArrayItemState(j, 'default');
  };

  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  const runAlgorithm = async () => {
    setSorting(true);
    setComparisons(0);
    setSwaps(0);
    try {
      const sortFunction = new Function('arr', 'swap', 'setArrayItemState', 'delay', 'speed', `
        ${code}
        return ${algorithm};
      `);
      const sort = sortFunction(array, swap, setArrayItemState, delay, speed);
      await sort(array);
    } catch (error) {
      console.error('Error executing sorting algorithm:', error);
      setLogOutput(prev => [...prev, `Error: ${error.message}`]);
    }
    setSorting(false);
  };

  const stopSorting = () => {
    stopSortingRef.current = true;
  };

  const getBarColor = (state: 'default' | 'comparing' | 'swapping' | 'pivot' | 'heapify') => {
    switch (state) {
      case 'comparing': return '#ffd700';
      case 'swapping': return '#ff4500';
      case 'pivot': return '#32cd32';
      case 'heapify': return '#9932cc';
      default: return '#3498db';
    }
  };

  return (
    <div className="sorting-visualizer">
      <div className="visualizer-header">
        <h2>{algorithm.charAt(0).toUpperCase() + algorithm.slice(1)}</h2>
        <div className="controls">
          <div className="button-group">
            <button onClick={resetArray} disabled={sorting}>Reset Array</button>
            <button onClick={runAlgorithm} disabled={sorting}>Run {algorithm}</button>
            <button onClick={stopSorting} disabled={!sorting}>Stop</button>
          </div>
          <div className="slider-group">
            <div className="slider-control">
              <label htmlFor="speed">Speed: {speed} ms</label>
              <input
                id="speed"
                type="range"
                min="1"
                max="1000"
                value={speed}
                onChange={(e) => setSpeed(parseInt(e.target.value))}
                disabled={sorting}
              />
            </div>
            <div className="slider-control">
              <label htmlFor="size">Array Size: {arraySize}</label>
              <input
                id="size"
                type="range"
                min="5"
                max="100"
                value={arraySize}
                onChange={(e) => setArraySize(parseInt(e.target.value))}
                disabled={sorting}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="visualizer-content">
        <div className="chart-tracer">
          <h3>Visualization</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={array.map((item, index) => ({ ...item, index }))} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <XAxis dataKey="index" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value">
                {array.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={getBarColor(entry.state)} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="info-panel">
          <div className="stats">
            <h3>Statistics</h3>
            <p>Comparisons: {comparisons}</p>
            <p>Swaps: {swaps}</p>
          </div>
          <div className="log-tracer">
            <h3>Log</h3>
            <div className="log-content">
              {logOutput.map((log, index) => (
                <div key={index}>{log}</div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="code-editor">
        <h3>Algorithm Code</h3>
        <Editor
          value={code}
          onValueChange={code => setCode(code)}
          highlight={code => highlight(code, languages.javascript, 'javascript')}
          padding={10}
          style={{
            fontFamily: '"Fira code", "Fira Mono", monospace',
            fontSize: 12,
            backgroundColor: 'var(--nc-bg-2)',
            borderRadius: '4px',
            border: '1px solid var(--nc-lk-1)',
          }}
          disabled={sorting}
        />
      </div>
    </div>
  );
};

export default SortingVisualizer;