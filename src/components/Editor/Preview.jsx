import React, { useState, useEffect, useRef } from 'react';

const Preview = ({ code }) => {
    const [activeTab, setActiveTab] = useState('preview');
    const [logs, setLogs] = useState([]); // Store log history
    const iframeRef = useRef(null);

    useEffect(() => {
        // 1. Reset logs when user hits "Run" (new code execution)
        setLogs([]);

        // 2. Listen for messages from the Iframe
        const handleMessage = (event) => {
            if (event.data.type === 'log' || event.data.type === 'error') {
                setLogs((prev) => [...prev, {
                    type: event.data.type,
                    content: event.data.content,
                    id: Date.now() + Math.random()
                }]);
            }
        };

        window.addEventListener('message', handleMessage);

        // 3. Prepare the Iframe Content
        const documentContents = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: sans-serif; background: white; margin: 0; padding: 15px; }
          </style>
        </head>
        <body>
          <div id="root"></div>
          <script>
            const originalLog = console.log;
            console.log = (...args) => {
              // Send data to Parent React App
              window.parent.postMessage({ 
                type: 'log', 
                content: args.map(a => typeof a === 'object' ? JSON.stringify(a) : String(a)).join(' ') 
              }, '*');
              originalLog.apply(console, args);
            };

            window.onerror = (msg) => {
              window.parent.postMessage({ type: 'error', content: msg }, '*');
            };

            try {
              ${code}
            } catch (err) {
              window.parent.postMessage({ type: 'error', content: err.message }, '*');
            }
          </script>
        </body>
      </html>
    `;

        const blob = new Blob([documentContents], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        if (iframeRef.current) iframeRef.current.src = url;

        return () => {
            window.removeEventListener('message', handleMessage);
            URL.revokeObjectURL(url);
        };
    }, [code]);

    return (
        <div className="h-full w-full bg-[#1e1e1e] flex flex-col">
            {/* Tab Switcher */}
            <div className="flex bg-[#252526] border-b border-white/5 shrink-0">
                <button
                    onClick={() => setActiveTab('preview')}
                    className={`px-4 py-2 text-[10px] font-bold uppercase tracking-widest transition-colors ${activeTab === 'preview' ? 'bg-[#1e1e1e] text-blue-400 border-b border-blue-400' : 'text-gray-500 hover:text-gray-300'}`}
                >
                    Browser UI
                </button>
                <button
                    onClick={() => setActiveTab('console')}
                    className={`px-4 py-2 text-[10px] font-bold uppercase tracking-widest transition-colors ${activeTab === 'console' ? 'bg-[#1e1e1e] text-blue-400 border-b border-blue-400' : 'text-gray-500 hover:text-gray-300'}`}
                >
                    Console {logs.length > 0 && <span className="ml-1 bg-blue-500 text-white px-1.5 rounded-full text-[8px]">{logs.length}</span>}
                </button>
            </div>

            {/* Content Area */}
            <div className="flex-1 relative overflow-hidden">
                <iframe
                    ref={iframeRef}
                    title="preview"
                    className={`w-full h-full bg-white transition-opacity duration-300 ${activeTab === 'preview' ? 'opacity-100' : 'opacity-0 pointer-events-none absolute'}`}
                    sandbox="allow-scripts"
                />

                {activeTab === 'console' && (
                    <div className="absolute inset-0 bg-[#1e1e1e] p-2 font-mono text-sm overflow-y-auto">
                        <div className="text-gray-600 text-[10px] mb-2 uppercase tracking-tighter italic font-sans border-b border-white/5 pb-1 flex justify-between">
                            <span>-- Terminal Output --</span>
                            <button onClick={() => setLogs([])} className="hover:text-white transition-colors">Clear</button>
                        </div>

                        {logs.length === 0 && <p className="text-gray-700 italic mt-4 text-center">No logs to show</p>}

                        {logs.map((log) => (
                            <div key={log.id} className={`py-1 border-b border-white/5 break-all ${log.type === 'error' ? 'text-red-400' : 'text-gray-300'}`}>
                                <span className="text-blue-500 mr-2 font-bold shrink-0">{log.type === 'error' ? '✖' : '>'}</span>
                                {log.content}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Preview;