import React, { useState } from 'react';
import SortingVisualizer from './SortingVisualizer';
import BSTVisualizer from './BSTVisualizer';
import CodeEditor from './CodeEditor';

type Algorithm = 'bubbleSort' | 'quickSort' | 'bst';

const App: React.FC = () => {
  const [currentAlgorithm, setCurrentAlgorithm] = useState<Algorithm>('bubbleSort');
  const [code, setCode] = useState<string>('');

  const algorithms: Algorithm[] = ['bubbleSort', 'quickSort', 'bst'];

  const getInitialCode = (algo: Algorithm) => {
    switch (algo) {
      case 'bubbleSort':
        return `function bubbleSort(arr) {
  const n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
  return arr;
}`;
      case 'quickSort':
        return `function quickSort(arr, low = 0, high = arr.length - 1) {
  if (low < high) {
    const pi = partition(arr, low, high);
    quickSort(arr, low, pi - 1);
    quickSort(arr, pi + 1, high);
  }
  return arr;
}

function partition(arr, low, high) {
  const pivot = arr[high];
  let i = low - 1;
  for (let j = low; j < high; j++) {
    if (arr[j] < pivot) {
      i++;
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }
  [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
  return i + 1;
}`;
      case 'bst':
        return `class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

function insertNode(root, value) {
  if (root === null) {
    return new Node(value);
  }
  if (value < root.value) {
    root.left = insertNode(root.left, value);
  } else if (value > root.value) {
    root.right = insertNode(root.right, value);
  }
  return root;
}`;
    }
  };

  const handleAlgorithmChange = (algo: Algorithm) => {
    setCurrentAlgorithm(algo);
    setCode(getInitialCode(algo));
  };

  const styles = {
    app: {
      display: 'flex',
      height: '100vh',
      fontFamily: 'Arial, sans-serif',
    },
    sidebar: {
      width: '200px',
      backgroundColor: '#2c3e50',
      color: 'white',
      padding: '1rem',
    },
    main: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column' as const,
    },
    header: {
      backgroundColor: '#34495e',
      color: 'white',
      padding: '1rem',
      textAlign: 'center' as const,
    },
    content: {
      display: 'flex',
      flex: 1,
    },
    visualizer: {
      flex: 1,
      padding: '1rem',
    },
    codePanel: {
      width: '400px',
      backgroundColor: '#f0f0f0',
      padding: '1rem',
    },
    button: {
      display: 'block',
      width: '100%',
      padding: '0.5rem',
      margin: '0.5rem 0',
      backgroundColor: '#3498db',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
    },
  };

  return (
    <div style={styles.app}>
      <div style={styles.sidebar}>
        <h2>Algorithms</h2>
        {algorithms.map((algo) => (
          <button
            key={algo}
            style={styles.button}
            onClick={() => handleAlgorithmChange(algo)}
          >
            {algo}
          </button>
        ))}
      </div>
      <div style={styles.main}>
        <header style={styles.header}>
          <h1>Algorithm Visualizer</h1>
        </header>
        <div style={styles.content}>
          <div style={styles.visualizer}>
            {currentAlgorithm === 'bst' ? (
              <BSTVisualizer />
            ) : (
              <SortingVisualizer algorithm={currentAlgorithm} />
            )}
          </div>
          <div style={styles.codePanel}>
            <CodeEditor code={code} setCode={setCode} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;