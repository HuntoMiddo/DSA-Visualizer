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
        <circle cx={x} cy={y} r={radius} fill="white" stroke="black" />
        <text x={x} y={y} textAnchor="middle" dominantBaseline="middle">{node.value}</text>
        {node.left && (
          <>
            <line x1={x} y1={y + radius} x2={x - horizontalSpacing} y2={y + 80} stroke="black" />
            {renderTree(node.left, x - horizontalSpacing, y + 80, level + 1)}
          </>
        )}
        {node.right && (
          <>
            <line x1={x} y1={y + radius} x2={x + horizontalSpacing} y2={y + 80} stroke="black" />
            {renderTree(node.right, x + horizontalSpacing, y + 80, level + 1)}
          </>
        )}
      </g>
    );
  };

  return (
    <div style={{ padding: '1rem' }}>
      <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>Binary Search Tree Visualizer</h2>
      <div style={{ marginBottom: '1rem' }}>
        <input 
          type="number" 
          value={inputValue} 
          onChange={(e) => setInputValue(e.target.value)}
          style={{ marginRight: '0.5rem' }}
        />
        <button onClick={handleInsert}>Insert</button>
      </div>
      <svg width="100%" height="400">
        {renderTree(root, 300, 40, 0)}
      </svg>
    </div>
  );
};

export default BSTVisualizer;