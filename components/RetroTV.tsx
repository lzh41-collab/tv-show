import React from 'react';
import { Screen } from './Screen';
import { Channel } from '../types';
import { Volume2, Power } from 'lucide-react';

interface RetroTVProps {
  isOn: boolean;
  currentChannel: Channel;
  volume: number;
  isStatic: boolean;
  onTogglePower: () => void;
  onNextChannel: () => void;
  onPrevChannel: () => void;
  onChangeVolume: (val: number) => void;
}

export const RetroTV: React.FC<RetroTVProps> = ({
  isOn,
  currentChannel,
  volume,
  isStatic,
  onTogglePower,
  onNextChannel,
  onPrevChannel,
  onChangeVolume,
}) => {
  
  // Knob rotation calculation based on channel
  const channelRotation = (currentChannel.number - 1) * 45;

  return (
    <div className="relative w-full max-w-4xl mx-auto aspect-[4/3] md:aspect-video select-none">
      
      {/* 
        TV CHASSIS (SVG Container) 
        Using a combination of SVG for shape and CSS for texture 
      */}
      <div className="w-full h-full relative filter drop-shadow-2xl">
        
        {/* Main Body Shape */}
        <svg viewBox="0 0 800 600" className="w-full h-full" preserveAspectRatio="none">
          <defs>
            <linearGradient id="woodGradient" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#5d4037" />
              <stop offset="50%" stopColor="#4e342e" />
              <stop offset="100%" stopColor="#3e2723" />
            </linearGradient>
             <linearGradient id="metalGradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#9ca3af" />
              <stop offset="50%" stopColor="#e5e7eb" />
              <stop offset="100%" stopColor="#9ca3af" />
            </linearGradient>
            <pattern id="grillPattern" x="0" y="0" width="10" height="4" patternUnits="userSpaceOnUse">
              <rect width="10" height="2" fill="#291e1a" />
            </pattern>
          </defs>
          
          {/* Wooden Case */}
          <rect x="10" y="10" width="780" height="580" rx="30" fill="url(#woodGradient)" stroke="#271c19" strokeWidth="4" />
          {/* Bezel */}
          <rect x="40" y="40" width="540" height="520" rx="20" fill="#1f1f1f" stroke="#4b5563" strokeWidth="6" />
          
          {/* Control Panel Area Background */}
          <rect x="600" y="40" width="160" height="520" rx="10" fill="#3e2723" stroke="#271c19" strokeWidth="2" opacity="0.5" />
          
          {/* Speaker Grille */}
          <rect x="620" y="380" width="120" height="150" fill="url(#grillPattern)" opacity="0.8" />
        </svg>

        {/* 
          OVERLAY ELEMENTS (Interactive HTML/React on top of SVG) 
          Positioning using % to stay responsive relative to container
        */}

        {/* Screen Area */}
        <div className="absolute top-[8%] left-[6%] w-[66%] h-[84%] bg-black rounded-[3rem] p-1 shadow-[inset_0_0_20px_black]">
           <Screen 
             channel={currentChannel}
             isOn={isOn}
             volume={volume}
             isStatic={isStatic}
           />
        </div>

        {/* Control Panel Area */}
        <div className="absolute top-[8%] right-[4%] w-[18%] h-[84%] flex flex-col items-center pt-8 space-y-12">
          
          {/* Channel Knob */}
          <div className="relative group">
            <div className="text-[#a88d75] text-xs font-bold mb-1 text-center tracking-widest uppercase">Channel</div>
            <div 
              className="w-24 h-24 rounded-full bg-gradient-to-br from-gray-700 to-black shadow-[0_4px_6px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.2)] flex items-center justify-center cursor-pointer active:scale-95 transition-transform"
              onClick={onNextChannel}
              onContextMenu={(e) => { e.preventDefault(); onPrevChannel(); }}
              style={{ transform: `rotate(${channelRotation}deg)` }}
            >
               {/* Knob Ridge */}
               <div className="w-20 h-20 rounded-full border-4 border-gray-600 bg-[#2a2a2a] relative">
                  <div className="absolute top-1 left-1/2 -translate-x-1/2 w-2 h-6 bg-white rounded-sm shadow-[0_0_5px_white]"></div>
               </div>
            </div>
            <div className="absolute -bottom-6 left-0 right-0 text-center text-[10px] text-[#8d7560] font-mono">
              CLICK / R-CLICK
            </div>
          </div>

          {/* Volume Slider (Vertical) */}
          <div className="flex flex-col items-center w-full px-4">
             <div className="text-[#a88d75] text-xs font-bold mb-2 tracking-widest uppercase flex items-center gap-1">
               <Volume2 size={12} /> Vol
             </div>
             <input 
              type="range" 
              min="0" 
              max="100" 
              value={volume}
              onChange={(e) => onChangeVolume(Number(e.target.value))}
              className="appearance-none h-32 w-4 bg-[#1a1a1a] rounded-full outline-none shadow-[inset_0_2px_4px_rgba(0,0,0,0.8)] border border-gray-700"
              style={{
                WebkitAppearance: 'slider-vertical', // Standard vertical slider
              }}
             />
          </div>

          {/* Power Button */}
          <div className="mt-auto pb-8 flex flex-col items-center">
            <button 
              onClick={onTogglePower}
              className={`
                w-16 h-16 rounded-full border-4 transition-all duration-200 shadow-[0_4px_0_#1a1a1a] active:shadow-none active:translate-y-1 flex items-center justify-center
                ${isOn ? 'bg-red-900 border-red-950' : 'bg-[#2a2a2a] border-gray-800'}
              `}
            >
              <Power className={`${isOn ? 'text-red-500 drop-shadow-[0_0_8px_rgba(239,68,68,0.8)]' : 'text-gray-500'}`} />
            </button>
            <div className="mt-2 flex items-center gap-2">
               <div className={`w-3 h-3 rounded-full transition-colors duration-300 ${isOn ? 'bg-red-500 shadow-[0_0_10px_red]' : 'bg-red-900'}`}></div>
               <span className="text-[10px] font-bold text-[#8d7560] tracking-widest">POWER</span>
            </div>
          </div>

        </div>

        {/* Brand Logo */}
        <div className="absolute bottom-[8%] left-1/2 -translate-x-1/2 text-gray-400 font-serif italic text-xl opacity-60 pointer-events-none">
          Zenith
        </div>

      </div>
    </div>
  );
};