import React, { useState, useEffect } from 'react';
import SortingVisualizer from './SortingVisualizer';
import CodeEditor from './CodeEditor';

const App: React.FC = () => {
  const [algorithm, setAlgorithm] = useState<'bubbleSort' | 'quickSort' | 'heapSort'>('bubbleSort');
  const [code, setCode] = useState<string>(`// ${algorithm} implementation
function sort(array) {
  // Your sorting algorithm here
}`);

  useEffect(() => {
    setCode(`// ${algorithm} implementation
function sort(array) {
  // Your sorting algorithm here
}`);
  }, [algorithm]);

  return (
    <div className="app">
      <div className="sidebar">
        <div className="algorithm-selector">
          <h3>Sorting Algorithms</h3>
          <button 
            className={algorithm === 'bubbleSort' ? 'active' : ''} 
            onClick={() => setAlgorithm('bubbleSort')}
          >
            Bubble Sort
          </button>
          <button 
            className={algorithm === 'quickSort' ? 'active' : ''} 
            onClick={() => setAlgorithm('quickSort')}
          >
            Quick Sort
          </button>
          <button 
            className={algorithm === 'heapSort' ? 'active' : ''} 
            onClick={() => setAlgorithm('heapSort')}
          >
            Heap Sort
          </button>
        </div>
      </div>
      <div className="main-content">
        <SortingVisualizer algorithm={algorithm} />
        <div className="code-editor">
          <h3>Code</h3>
          <CodeEditor code={code} setCode={setCode} />
        </div>
      </div>
    </div>
  );
};

export default App;