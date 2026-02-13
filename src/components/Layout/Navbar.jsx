import React from 'react';

const Navbar = ({ onRun, roomName = "New Project" }) => {
    return (
        <nav className="h-14 bg-[#181818] border-b border-white/10 flex items-center justify-between px-6 shrink-0">
            <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center font-bold text-white">
                        C
                    </div>
                    <span className="text-white font-semibold tracking-tight uppercase text-sm">
                        CoLab <span className="text-blue-500 underline decoration-2 underline-offset-4">IDE</span>
                    </span>
                </div>
                <div className="h-4 w-[1px] bg-white/20 mx-2" />
                <span className="text-gray-400 text-xs font-medium">{roomName}</span>
            </div>

            <div className="flex items-center gap-3">
                <button
                    onClick={onRun}
                    className="bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-1.5 rounded-md text-xs font-bold flex items-center gap-2 transition-all active:scale-95 shadow-lg shadow-emerald-900/20"
                >
                    <div className="w-0 h-0 border-y-4 border-y-transparent border-l-6 border-l-white ml-0.5" />
                    RUN
                </button>
            </div>
        </nav>
    );
};

export default Navbar;