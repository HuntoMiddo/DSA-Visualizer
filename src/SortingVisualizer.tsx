import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const generateRandomArray = (length: number): number[] => {
  return Array.from({ length }, () => Math.floor(Math.random() * 100) + 1);
};

const SortingVisualizer: React.FC = () => {
  const [array, setArray] = useState<number[]>([]);
  const [sorting, setSorting] = useState<boolean>(false);

  useEffect(() => {
    resetArray();
  }, []);

  const resetArray = (): void => {
    setArray(generateRandomArray(20));
    setSorting(false);
  };

  const bubbleSort = async (): Promise<void> => {
    setSorting(true);
    let arr = [...array];
    let n = arr.length;
    
    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        if (arr[j] > arr[j + 1]) {
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          setArray([...arr]);
          await new Promise(resolve => setTimeout(resolve, 50));
        }
      }
    }
    
    setSorting(false);
  };

  const quickSort = async (): Promise<void> => {
    setSorting(true);
    let arr = [...array];
    
    const partition = async (low: number, high: number): Promise<number> => {
      let pivot = arr[high];
      let i = low - 1;
      
      for (let j = low; j < high; j++) {
        if (arr[j] < pivot) {
          i++;
          [arr[i], arr[j]] = [arr[j], arr[i]];
          setArray([...arr]);
          await new Promise(resolve => setTimeout(resolve, 50));
        }
      }
      
      [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
      setArray([...arr]);
      await new Promise(resolve => setTimeout(resolve, 50));
      
      return i + 1;
    };
    
    const quickSortHelper = async (low: number, high: number): Promise<void> => {
      if (low < high) {
        let pi = await partition(low, high);
        await quickSortHelper(low, pi - 1);
        await quickSortHelper(pi + 1, high);
      }
    };
    
    await quickSortHelper(0, arr.length - 1);
    setSorting(false);
  };

  return (
    <div style={{ padding: '1rem' }}>
      <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>Sorting Visualizer</h2>
      <div style={{ marginBottom: '1rem' }}>
        <button onClick={resetArray} disabled={sorting} style={{ marginRight: '0.5rem' }}>
          Reset Array
        </button>
        <button onClick={bubbleSort} disabled={sorting} style={{ marginRight: '0.5rem' }}>
          Bubble Sort
        </button>
        <button onClick={quickSort} disabled={sorting}>
          Quick Sort
        </button>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={array.map((value, index) => ({ index, value }))} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <XAxis dataKey="index" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SortingVisualizer;