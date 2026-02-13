import React from 'react';
import Editor from '@monaco-editor/react';

const CodeEditor = ({ code, onChange }) => {

    const handleEditorChange = (value) => {
        onChange(value);
    };

    return (
        <div className="h-full w-full bg-[#1e1e1e] overflow-hidden border-r border-white/5">
            <Editor
                height="100%"
                defaultLanguage="javascript"
                defaultValue={code}
                theme="vs-dark"
                onChange={handleEditorChange}
                options={{
                    fontSize: 14,
                    fontFamily: "'Fira Code', 'Courier New', monospace",
                    minimap: { enabled: false },
                    automaticLayout: true,
                    scrollBeyondLastLine: false,
                    lineNumbers: 'on',
                    roundedSelection: true,
                    cursorStyle: 'line',
                    padding: { top: 16, bottom: 16 },
                    wordWrap: 'on'
                }}
            />
        </div>
    );
};

export default CodeEditor;