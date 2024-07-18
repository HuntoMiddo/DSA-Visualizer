import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

interface SortingVisualizerProps {
  algorithm: 'bubbleSort' | 'quickSort';
}

const generateRandomArray = (length: number): number[] => {
  return Array.from({ length }, () => Math.floor(Math.random() * 100) + 1);
};

const SortingVisualizer: React.FC<SortingVisualizerProps> = ({ algorithm }) => {
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
      const pivot = arr[high];
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
        const pi = await partition(low, high);
        await quickSortHelper(low, pi - 1);
        await quickSortHelper(pi + 1, high);
      }
    };

    await quickSortHelper(0, arr.length - 1);
    setSorting(false);
  };

  const runAlgorithm = () => {
    if (algorithm === 'bubbleSort') {
      bubbleSort();
    } else if (algorithm === 'quickSort') {
      quickSort();
    }
  };

  const styles = {
    container: {
      backgroundColor: 'white',
      borderRadius: '8px',
      padding: '1rem',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    },
    title: {
      fontSize: '1.2rem',
      marginBottom: '1rem',
    },
    buttonContainer: {
      marginBottom: '1rem',
    },
    button: {
      backgroundColor: '#3498db',
      color: 'white',
      border: 'none',
      padding: '0.5rem 1rem',
      marginRight: '0.5rem',
      borderRadius: '4px',
      cursor: 'pointer',
      transition: 'background-color 0.3s',
    },
    disabledButton: {
      backgroundColor: '#bdc3c7',
      cursor: 'not-allowed',
    },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>{algorithm} Visualizer</h2>
      <div style={styles.buttonContainer}>
        <button 
          onClick={resetArray} 
          disabled={sorting}
          style={{
            ...styles.button,
            ...(sorting ? styles.disabledButton : {})
          }}
        >
          Reset Array
        </button>
        <button 
          onClick={runAlgorithm} 
          disabled={sorting}
          style={{
            ...styles.button,
            ...(sorting ? styles.disabledButton : {})
          }}
        >
          Run {algorithm}
        </button>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={array.map((value, index) => ({ index, value }))} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <XAxis dataKey="index" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" fill="#3498db" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SortingVisualizer;