import React from 'react';

interface CodeEditorProps {
  code: string;
  setCode: (code: string) => void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ code, setCode }) => {
  const styles = {
    editor: {
      width: '100%',
      height: '100%',
      fontFamily: 'monospace',
      fontSize: '14px',
      padding: '0.5rem',
      border: '1px solid #ccc',
      borderRadius: '4px',
      resize: 'none' as const,
    },
  };

  return (
    <textarea
      style={styles.editor}
      value={code}
      onChange={(e) => setCode(e.target.value)}
      spellCheck={false}
    />
  );
};

export default CodeEditor;