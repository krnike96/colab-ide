import React, { useState } from 'react';
import Navbar from './components/Layout/Navbar';
import CodeEditor from './components/Editor/CodeEditor';
import Preview from './components/Editor/Preview';

function App() {
  const [code, setCode] = useState('document.getElementById("root").innerHTML = "<h1>Hello!</h1>";');
  const [compiledCode, setCompiledCode] = useState('');

  const handleRun = () => {
    setCompiledCode(code); // This triggers the Preview update
  };

  return (
    <div className="flex flex-col h-screen w-full bg-[#121212] overflow-hidden text-white font-sans">
      <Navbar onRun={handleRun} />

      <main className="flex flex-1 overflow-hidden">
        <div className="flex-1 relative">
          <CodeEditor code={code} onChange={setCode} />
        </div>

        <div className="w-[40%] bg-white border-l border-white/10 hidden md:block">
          {compiledCode ? (
            <Preview code={compiledCode} />
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-gray-400 bg-[#121212]">
              <p className="italic text-sm">Write some JS to manipulate the DOM</p>
              <p className="text-[10px] mt-2 opacity-50 uppercase">Press Run to execute</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;