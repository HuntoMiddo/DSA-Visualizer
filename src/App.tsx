import React, { useState } from 'react';
import SortingVisualizer from './SortingVisualizer';
import BSTVisualizer from './BSTVisualizer';

const App: React.FC = () => {
  const [currentVisualizer, setCurrentVisualizer] = useState<'sorting' | 'bst'>('sorting');

  return (
    <div className="App">
      <header style={{ padding: '1rem', backgroundColor: '#f0f0f0' }}>
        <h1 style={{ marginBottom: '1rem' }}>Data Structure and Algorithm Visualizer</h1>
        <nav>
          <button 
            onClick={() => setCurrentVisualizer('sorting')}
            style={{ marginRight: '0.5rem', backgroundColor: currentVisualizer === 'sorting' ? '#007bff' : '#ffffff', color: currentVisualizer === 'sorting' ? '#ffffff' : '#000000' }}
          >
            Sorting Algorithms
          </button>
          <button 
            onClick={() => setCurrentVisualizer('bst')}
            style={{ backgroundColor: currentVisualizer === 'bst' ? '#007bff' : '#ffffff', color: currentVisualizer === 'bst' ? '#ffffff' : '#000000' }}
          >
            Binary Search Tree
          </button>
        </nav>
      </header>
      <main style={{ padding: '1rem' }}>
        {currentVisualizer === 'sorting' ? <SortingVisualizer /> : <BSTVisualizer />}
      </main>
    </div>
  );
}

export default App;