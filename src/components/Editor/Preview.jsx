import React, { useEffect, useRef } from 'react';

const Preview = ({ code }) => {
    const iframeRef = useRef(null);

    useEffect(() => {
        // This creates a full HTML document structure from your editor code
        const documentContents = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <style>
          body { background: white; color: black; font-family: sans-serif; padding: 15px; }
        </style>
      </head>
      <body>
        <div id="root"></div>
        <script>
          try {
            ${code}
          } catch (err) {
            document.body.innerHTML = '<pre style="color: red;">' + err.message + '</pre>';
          }
        </script>
      </body>
      </html>
    `;

        const blob = new Blob([documentContents], { type: 'text/html' });
        const url = URL.createObjectURL(blob);

        if (iframeRef.current) {
            iframeRef.current.src = url;
        }

        // Cleanup the URL to prevent memory leaks
        return () => URL.revokeObjectURL(url);
    }, [code]);

    return (
        <div className="h-full w-full bg-white flex flex-col">
            <div className="h-8 bg-gray-100 border-b border-gray-300 flex items-center px-4 shrink-0">
                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-tighter">Result Window</span>
            </div>
            <iframe
                ref={iframeRef}
                title="preview"
                className="w-full h-full border-none"
                sandbox="allow-scripts"
            />
        </div>
    );
};

export default Preview;