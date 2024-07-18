import React, { useState } from 'react';

interface TreeNode {
  value: number;
  left: TreeNode | null;
  right: TreeNode | null;
}

const BSTVisualizer: React.FC = () => {
  const [root, setRoot] = useState<TreeNode | null>(null);
  const [inputValue, setInputValue] = useState<string>('');

  const insertNode = (value: number, node: TreeNode | null): TreeNode => {
    if (node === null) {
      return { value, left: null, right: null };
    }

    if (value < node.value) {
      node.left = insertNode(value, node.left);
    } else if (value > node.value) {
      node.right = insertNode(value, node.right);
    }

    return node;
  };

  const handleInsert = () => {
    const value = parseInt(inputValue);
    if (!isNaN(value)) {
      setRoot(prevRoot => insertNode(value, prevRoot));
      setInputValue('');
    }
  };

  const renderTree = (node: TreeNode | null, x: number, y: number, level: number): JSX.Element | null => {
    if (!node) return null;

    const radius = 20;
    const horizontalSpacing = 80 / (level + 1);

    return (
      <g key={`${node.value}-${x}-${y}`}>
        <circle cx={x} cy={y} r={radius} fill="#3498db" stroke="#2980b9" />
        <text x={x} y={y} textAnchor="middle" dominantBaseline="middle" fill="white">{node.value}</text>
        {node.left && (
          <>
            <line x1={x} y1={y + radius} x2={x - horizontalSpacing} y2={y + 80} stroke="#2980b9" />
            {renderTree(node.left, x - horizontalSpacing, y + 80, level + 1)}
          </>
        )}
        {node.right && (
          <>
            <line x1={x} y1={y + radius} x2={x + horizontalSpacing} y2={y + 80} stroke="#2980b9" />
            {renderTree(node.right, x + horizontalSpacing, y + 80, level + 1)}
          </>
        )}
      </g>
    );
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
    inputContainer: {
      marginBottom: '1rem',
    },
    input: {
      padding: '0.5rem',
      marginRight: '0.5rem',
      borderRadius: '4px',
      border: '1px solid #bdc3c7',
    },
    button: {
      backgroundColor: '#3498db',
      color: 'white',
      border: 'none',
      padding: '0.5rem 1rem',
      borderRadius: '4px',
      cursor: 'pointer',
      transition: 'background-color 0.3s',
    },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Binary Search Tree Visualizer</h2>
      <div style={styles.inputContainer}>
        <input 
          type="number" 
          value={inputValue} 
          onChange={(e) => setInputValue(e.target.value)}
          style={styles.input}
          placeholder="Enter a number"
        />
        <button onClick={handleInsert} style={styles.button}>Insert</button>
      </div>
      <svg width="100%" height="400">
        {renderTree(root, 300, 40, 0)}
      </svg>
    </div>
  );
};

export default BSTVisualizer;